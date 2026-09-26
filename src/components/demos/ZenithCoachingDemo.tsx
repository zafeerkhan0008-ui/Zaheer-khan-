import React, { useState } from 'react';
import { BookOpen, Users, Award, Calendar, CheckCircle2, Phone, ArrowRight, X, Clock, MapPin } from 'lucide-react';

export const ZenithCoachingDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'batches' | 'faculty'>('courses');
  const [selectedCourse, setSelectedCourse] = useState<string>('neet-jee');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('Class 11');

  const courses = [
    {
      id: 'foundation',
      title: 'Foundation Program',
      grades: 'Classes 9 & 10',
      duration: '1 Year Academic Session',
      desc: 'Build strong analytical problem-solving fundamentals in Mathematics, Physics, Chemistry, and Biology to prepare for future competitive exams.',
      highlights: ['Weekly Olympiad practice tests', 'Small batches of max 25 students', 'Personal doubt-clearing sessions', 'Printed study material & notes']
    },
    {
      id: 'neet-jee',
      title: 'Target NEET & JEE (Main + Adv)',
      grades: 'Classes 11 & 12',
      duration: '2 Year Comprehensive Course',
      desc: 'Rigorous topic-wise conceptual coverage aligned with NTA pattern. Regular test series, rank analysis, and time-management workshops.',
      highlights: ['Over 10,000+ curated practice questions', 'All-India benchmarking test series', 'Recorded lecture backup library', 'Senior faculty with 12+ yrs experience']
    },
    {
      id: 'crash',
      title: 'Sprint Revision & Test Series',
      grades: 'Class 12 & Droppers',
      duration: '90-Day Intensive Crash Course',
      desc: 'Fast-paced revision of high-weightage formulas, previous 15-year question papers, and mock exams under actual exam timing.',
      highlights: ['Daily formula masterclasses', '20 Full-length CBT mock tests', 'Detailed error analysis reports', 'Quick revision flashcards']
    }
  ];

  const batches = [
    { name: 'Morning Batch (NEET Focused)', time: '07:30 AM – 11:30 AM', days: 'Mon, Wed, Fri', seats: '5 seats left', status: 'Enrolling Now' },
    { name: 'Evening Batch (JEE Focused)', time: '04:30 PM – 08:30 PM', days: 'Tue, Thu, Sat', seats: '3 seats left', status: 'Filling Fast' },
    { name: 'Foundation Weekend (Class 9-10)', time: '09:00 AM – 02:00 PM', days: 'Saturday & Sunday', seats: '8 seats left', status: 'Open' }
  ];

  const faculty = [
    { name: 'Er. Rajesh Varma', role: 'Head of Physics', exp: '14+ Years Exp', alma: 'B.Tech IIT Roorkee', students: '350+ IIT Selections' },
    { name: 'Dr. Ananya Sen', role: 'Senior Faculty Biology', exp: '11+ Years Exp', alma: 'MBBS, AIIMS Gold Medalist', students: '420+ NEET Top Ranks' },
    { name: 'Prof. Sandeep Joshi', role: 'Head of Chemistry', exp: '16+ Years Exp', alma: 'M.Sc Delhi University', students: 'Author of Organic Practice Vol 1' }
  ];

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !phone.trim()) return;
    setBookingSubmitted(true);
  };

  return (
    <div className="bg-slate-900 text-slate-100 font-sans min-h-full">
      {/* Demo Header Notice */}
      <div className="bg-indigo-950/80 border-b border-indigo-500/20 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-indigo-300">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">Zenith Academy</span>
          <span className="text-slate-400">·</span>
          <span>Sample Coaching Demo Website by ZK Web Studio</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-indigo-400" />
          <span>Direct Admissions Desk: +91 98765 00000 (Demo)</span>
        </div>
      </div>

      {/* Demo Navbar */}
      <header className="bg-slate-950/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-base">
            ZA
          </div>
          <div>
            <div className="text-base font-bold text-white tracking-tight">ZENITH ACADEMY</div>
            <div className="text-[11px] text-slate-400">Pre-Medical & Engineering Institute</div>
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-300">
          <button 
            onClick={() => setActiveTab('courses')}
            className={`px-3 py-1.5 rounded transition ${activeTab === 'courses' ? 'bg-indigo-600 text-white' : 'hover:text-white'}`}
          >
            Courses
          </button>
          <button 
            onClick={() => setActiveTab('batches')}
            className={`px-3 py-1.5 rounded transition ${activeTab === 'batches' ? 'bg-indigo-600 text-white' : 'hover:text-white'}`}
          >
            Batches & Timings
          </button>
          <button 
            onClick={() => setActiveTab('faculty')}
            className={`px-3 py-1.5 rounded transition ${activeTab === 'faculty' ? 'bg-indigo-600 text-white' : 'hover:text-white'}`}
          >
            Faculty Team
          </button>
        </nav>

        <button 
          onClick={() => { setShowDemoModal(true); setBookingSubmitted(false); }}
          className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-xs font-semibold rounded-md shadow-sm transition flex items-center gap-1.5"
        >
          Book Free Demo Class
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Demo Hero Banner */}
      <section className="px-6 py-10 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 text-center sm:text-left">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
              Admissions Open for Academic Session 2026–27
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Build Conceptual Mastery in Science & Math for NEET & JEE
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Personalized mentorship, rigorous weekly test series, and top faculty guidance. Attend a complimentary 2-day live demo classroom before enrolling.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-indigo-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Max 25 Students per Batch</span>
              <span className="flex items-center gap-1.5 text-indigo-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Daily Doubt Clearing Clinic</span>
              <span className="flex items-center gap-1.5 text-indigo-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Comprehensive Study Modules</span>
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 w-full sm:w-72 shadow-lg space-y-3">
            <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Next Upcoming Batch</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">Starts Monday</span>
            </div>
            <div className="text-sm font-bold text-white">Target JEE 2027 Evening Cohort</div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> 04:30 PM – 08:30 PM (Tue/Thu/Sat)
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Zenith Main Campus, 2nd Floor
            </div>
            <button 
              onClick={() => { setShowDemoModal(true); setBookingSubmitted(false); }}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded transition"
            >
              Reserve Seat for Demo
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Navigation Tabs on mobile */}
        <div className="flex sm:hidden border-b border-slate-800 mb-6 pb-2 gap-2 text-xs font-medium">
          <button 
            onClick={() => setActiveTab('courses')}
            className={`px-3 py-1 rounded ${activeTab === 'courses' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Courses
          </button>
          <button 
            onClick={() => setActiveTab('batches')}
            className={`px-3 py-1 rounded ${activeTab === 'batches' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Batches
          </button>
          <button 
            onClick={() => setActiveTab('faculty')}
            className={`px-3 py-1 rounded ${activeTab === 'faculty' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Faculty
          </button>
        </div>

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" /> Offered Programs & Curricula
              </h2>
              <span className="text-xs text-slate-400">Curriculum aligned with latest 2026 syllabus</span>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    selectedCourse === course.id 
                      ? 'bg-slate-800/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/50' 
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">{course.grades}</div>
                    <div className="text-base font-bold text-white">{course.title}</div>
                    <div className="text-xs text-slate-400 leading-relaxed">{course.desc}</div>
                    <div className="pt-2 space-y-1.5">
                      {course.highlights.map((h, i) => (
                        <div key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">{course.duration}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDemoModal(true);
                        setBookingSubmitted(false);
                      }}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      Enquire <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'batches' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" /> Upcoming Batches & Schedule
            </h2>
            <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800 bg-slate-900/60">
              {batches.map((b, i) => (
                <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-white">{b.name}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                      <span>Schedule: {b.days}</span>
                      <span>·</span>
                      <span>Timing: {b.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-amber-400 font-medium">{b.seats}</span>
                    <button 
                      onClick={() => { setShowDemoModal(true); setBookingSubmitted(false); }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded transition"
                    >
                      Enroll in Batch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faculty' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" /> Mentor & Faculty Directory
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {faculty.map((f, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-900/80 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 text-sm">
                    {f.name.split(' ')[1]?.[0] || 'T'}
                  </div>
                  <div className="text-sm font-bold text-white">{f.name}</div>
                  <div className="text-xs text-indigo-400 font-medium">{f.role}</div>
                  <div className="text-[11px] text-slate-400">{f.alma} · {f.exp}</div>
                  <div className="text-[11px] text-emerald-400 pt-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> {f.students}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Demo Booking Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {!bookingSubmitted ? (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Book Free 2-Day Demo Class</h3>
                  <p className="text-xs text-slate-400">
                    Experience our teaching methodology before committing. No charges or obligations.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Student Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Aryan Sharma" 
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Parent / Student Mobile Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 98765 43210" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Select Current Class</label>
                    <select 
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Class 9">Class 9 (CBSE / ICSE)</option>
                      <option value="Class 10">Class 10 Board Target</option>
                      <option value="Class 11">Class 11 (NEET / JEE)</option>
                      <option value="Class 12">Class 12 (Board + Competitive)</option>
                      <option value="Dropper">Dropper / Repeater Batch</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded transition"
                >
                  Confirm Free Demo Slot
                </button>
                <p className="text-[11px] text-slate-500 text-center">
                  In a real website, this submits directly to your WhatsApp or Google Sheet.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">Demo Slot Reserved!</h3>
                  <p className="text-xs text-slate-300">
                    Thank you {studentName}. A seat has been reserved for {grade}. Our admissions counsellor would call {phone} to confirm the classroom timing.
                  </p>
                </div>
                <button 
                  onClick={() => setShowDemoModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded text-slate-200 transition"
                >
                  Back to Demo Website
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
