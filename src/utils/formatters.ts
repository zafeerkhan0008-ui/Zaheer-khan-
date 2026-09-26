/**
 * Formatting utilities for India Standard Time (IST) and Indian Rupee (INR)
 */

export function formatISTDateTime(dateInput: string | number | Date | null | undefined): string {
  if (!dateInput) return '—';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date) + ' IST';
}

export function formatISTDate(dateInput: string | number | Date | null | undefined): string {
  if (!dateInput) return '—';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

export function formatINR(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || amount === '') return '₹0';
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) : amount;
  if (isNaN(num)) return '₹0';
  return '₹' + num.toLocaleString('en-IN');
}
