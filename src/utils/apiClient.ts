/**
 * Safe API client for ZK Web Studio
 * Prevents "Unexpected token '<', '<html' is not valid JSON" errors by inspecting
 * response headers, validating JSON content-type, and providing meaningful fallback messages.
 */

export interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('zk_auth_token');

  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const res = await fetch(endpoint, {
      ...options,
      headers
    });

    const contentType = res.headers.get('content-type') || '';

    // Check if the response is JSON
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (!res.ok) {
        return {
          ok: false,
          status: res.status,
          error: data?.error || data?.message || `Request failed with status ${res.status}`
        };
      }
      return {
        ok: true,
        status: res.status,
        data
      };
    }

    // Server returned HTML or plain text (e.g., 404/500 Vite HTML fallback or gateway page)
    const text = await res.text();
    console.warn(`[apiClient] Non-JSON response received from ${endpoint} (Status ${res.status}):`, text.slice(0, 150));

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: `Server error (${res.status}): Endpoint not responding with JSON. Please ensure the backend server is running.`
      };
    }

    return {
      ok: false,
      status: res.status,
      error: 'Unexpected server response format (HTML received instead of JSON).'
    };
  } catch (err: any) {
    console.error(`[apiClient] Network error for ${endpoint}:`, err);
    return {
      ok: false,
      status: 0,
      error: err?.message || 'Unable to connect to the backend server. Please check your connection.'
    };
  }
}
