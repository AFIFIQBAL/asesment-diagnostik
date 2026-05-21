/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BrainCircuit, 
  FileText, 
  Settings, 
  ChevronRight,
  LogOut,
  GraduationCap,
  ClipboardCheck,
  TrendingUp,
  Lightbulb,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { AssessmentType, Student, AssessmentResult } from './types';
import { LEARNING_STYLE_QUESTIONS, PERSONALITY_QUESTIONS, MULTIPLE_INTELLIGENCE_QUESTIONS, CAREER_INTEREST_QUESTIONS } from './constants';
import StudentManager from './components/StudentManager';
import AssessmentFlow from './components/AssessmentFlow';
import AnalysisView from './components/AnalysisView';
import SchoolProfile from './components/SchoolProfile';
import SuggestionsView from './components/SuggestionsView';
import LoginPage from './components/LoginPage';
import ReportsView from './components/ReportsView';

const VIEWS = {
  DASHBOARD: 'dashboard',
  STUDENTS: 'students',
  ASSESSMENTS: 'assessments',
  REPORTS: 'reports',
  PROFILE: 'profile',
  ANALYSIS: 'analysis',
  SUGGESTIONS: 'suggestions'
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'guru' | null>(null);
  const [activeView, setActiveView] = useState(VIEWS.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<AssessmentType | null>(null);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Ahmad Fauzi', nis: '12345', class: 'X-A', gender: 'L', schoolId: 's1', createdAt: Date.now() },
    { id: '2', name: 'Siti Aminah', nis: '12346', class: 'X-A', gender: 'P', schoolId: 's1', createdAt: Date.now() },
  ]);
  const [completedResults, setCompletedResults] = useState<AssessmentResult[]>([
    {
      id: 'res-1',
      studentId: '1',
      type: AssessmentType.LEARNING_STYLE,
      answers: { 'v1': 5, 'v2': 5, 'v3': 4, 'a1': 2, 'a2': 3, 'a3': 2, 'k1': 3, 'k2': 4, 'k3': 3 },
      scores: { 'Visual': 93, 'Auditori': 47, 'Kinestetik': 67 },
      summary: 'Siswa menunjukkan kecenderungan yang sangat kuat pada gaya belajar Visual. Pembelajaran sebaiknya menggunakan gambar, warna, bagan alir, atau diagram terstruktur.',
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000
    },
    {
      id: 'res-2',
      studentId: '2',
      type: AssessmentType.PERSONALITY,
      answers: { 'p1': 5, 'p2': 2, 'p3': 2, 'p4': 4, 'p5': 4, 'p6': 3 },
      scores: { 'Ekstrovert': 90, 'Introvert': 40, 'Judging': 80, 'Perceiving': 60 },
      summary: 'Siswa menunjukkan kecenderungan kepribadian Ekstrovert dan Teratur (Judging) yang tinggi. Sangat baik dalam kerja tim, koordinasi kegiatan kelompok, dan pengerjaan proyek terjadwal.',
      timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000
    }
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
        setIsMobileMenuOpen(false);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (role: 'admin' | 'guru') => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setActiveView(VIEWS.DASHBOARD);
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { id: VIEWS.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: VIEWS.STUDENTS, label: 'Data Murid', icon: Users },
    { id: VIEWS.ASSESSMENTS, label: 'Asesmen', icon: BrainCircuit },
    { id: VIEWS.ANALYSIS, label: 'Analisis Individu', icon: TrendingUp },
    { id: VIEWS.SUGGESTIONS, label: 'Saran Guru', icon: Lightbulb },
    { id: VIEWS.REPORTS, label: 'Laporan', icon: FileText },
    { id: VIEWS.PROFILE, label: 'Profil Sekolah', icon: Settings },
  ];

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const handleMenuItemClick = (id: string) => {
    setActiveView(id);
    if (id !== VIEWS.ASSESSMENTS) {
      setSelectedAssessmentType(null);
    }
    if (window.innerWidth <= 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleStartAssessment = (type: AssessmentType) => {
    const mockStudent: Student = { id: '1', name: 'Ahmad Fauzi', nis: '12345', class: 'X-A', gender: 'L', schoolId: 's1', createdAt: Date.now() };
    setSelectedStudent(mockStudent);
    setSelectedAssessmentType(type);
    setActiveView(VIEWS.ASSESSMENTS);
  };

  const handleAssessmentComplete = (answers: Record<string, number>) => {
    if (!selectedAssessmentType || !selectedStudent) return;

    const scores: Record<string, number> = {};
    const categories = new Set<string>();
    
    let questions = LEARNING_STYLE_QUESTIONS;
    if (selectedAssessmentType === AssessmentType.PERSONALITY) questions = PERSONALITY_QUESTIONS;
    if (selectedAssessmentType === AssessmentType.MULTIPLE_INTELLIGENCES) questions = MULTIPLE_INTELLIGENCE_QUESTIONS;
    if (selectedAssessmentType === AssessmentType.CAREER_INTEREST) questions = CAREER_INTEREST_QUESTIONS;

    questions.forEach(q => categories.add(q.category));
    
    categories.forEach(cat => {
      const catQuestions = questions.filter(q => q.category === cat);
      const sum = catQuestions.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
      scores[cat] = Math.round((sum / (catQuestions.length * 5)) * 100);
    });

    const result: AssessmentResult = {
      id: Math.random().toString(36).substr(2, 9),
      studentId: selectedStudent.id,
      type: selectedAssessmentType,
      answers,
      scores,
      summary: `Siswa menunjukkan kecenderungan yang kuat pada indikator ${Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b)}. Hal ini menandakan potensi besar dalam pengembangan diri dan belajar di masa depan.`,
      timestamp: Date.now()
    };

    setCurrentResult(result);
    setCompletedResults(prev => [result, ...prev]);
    setActiveView(VIEWS.ANALYSIS);
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-200">
          <GraduationCap className="text-white w-6 h-6" />
        </div>
        {(isSidebarOpen || isMobileMenuOpen) && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-xl tracking-tight text-emerald-950"
          >
            Senostik
          </motion.span>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuItemClick(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group text-left",
              activeView === item.id 
                ? "bg-emerald-50 text-emerald-600 font-medium shadow-sm" 
                : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 flex-shrink-0",
              activeView === item.id ? "text-emerald-600" : "group-hover:text-[#1E293B]"
            )} />
            {(isSidebarOpen || isMobileMenuOpen) && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#E2E8F0]">
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="hidden lg:flex w-full items-center gap-3 px-4 py-3 text-[#64748B] hover:bg-[#F1F5F9] rounded-xl transition-all"
        >
          <ChevronRight className={cn("w-5 h-5 transition-transform", isSidebarOpen ? "rotate-180" : "")} />
          {isSidebarOpen && <span>Sembunyikan</span>}
        </button>
        <button 
          onClick={handleLogout}
          className="lg:hidden w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-medium"
        >
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className={cn(
          "bg-white border-r border-[#E2E8F0] hidden lg:flex flex-col transition-all duration-300 relative z-40",
          !isSidebarOpen && "items-center"
        )}
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-16 lg:h-20 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              <LayoutDashboard size={24} />
            </button>
            <h1 className="text-lg lg:text-xl font-bold text-[#0F172A] truncate max-w-[150px] sm:max-w-none">
              {menuItems.find(i => i.id === activeView)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3 lg:gap-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-sm font-semibold text-[#0F172A]">{userRole === 'admin' ? 'Administrator' : 'Guru BK'}</span>
                <span className="text-xs text-[#64748B] truncate max-w-[100px]">afifjunaaa...</span>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border-2 border-white shadow-sm shrink-0">
                {userRole === 'admin' ? 'AD' : 'BK'}
              </div>
            </div>
            <div className="hidden sm:block h-8 w-[1px] bg-[#E2E8F0]" />
            <button 
              onClick={handleLogout}
              className="hidden sm:block p-2 text-slate-400 hover:text-rose-600 transition-colors"
              title="Keluar"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView + (selectedAssessmentType || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto w-full"
            >
              {activeView === VIEWS.DASHBOARD && <DashboardView onStartAssessment={handleStartAssessment} />}
              {activeView === VIEWS.STUDENTS && <StudentManager students={students} setStudents={setStudents} />}
              {activeView === VIEWS.ASSESSMENTS && !selectedAssessmentType && (
                <AssessmentListView onStart={handleStartAssessment} />
              )}
              {activeView === VIEWS.ASSESSMENTS && selectedAssessmentType && (
                <AssessmentFlow 
                  type={selectedAssessmentType}
                  questions={
                    selectedAssessmentType === AssessmentType.LEARNING_STYLE ? LEARNING_STYLE_QUESTIONS :
                    selectedAssessmentType === AssessmentType.PERSONALITY ? PERSONALITY_QUESTIONS :
                    selectedAssessmentType === AssessmentType.MULTIPLE_INTELLIGENCES ? MULTIPLE_INTELLIGENCE_QUESTIONS :
                    CAREER_INTEREST_QUESTIONS
                  }
                  onComplete={handleAssessmentComplete}
                  onCancel={() => setSelectedAssessmentType(null)}
                />
              )}
              {activeView === VIEWS.ANALYSIS && currentResult && selectedStudent && (
                 <AnalysisView result={currentResult} studentName={selectedStudent.name} />
              )}
              {activeView === VIEWS.SUGGESTIONS && (
                <SuggestionsView result={currentResult} studentName={selectedStudent?.name || 'Siswa'} />
              )}
              {activeView === VIEWS.REPORTS && (
                <ReportsView 
                  results={completedResults} 
                  students={students} 
                  onViewResult={(result, student) => {
                    setCurrentResult(result);
                    setSelectedStudent(student);
                    setActiveView(VIEWS.ANALYSIS);
                  }} 
                />
              )}
              {activeView === VIEWS.PROFILE && <SchoolProfile />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function DashboardView({ onStartAssessment }: { onStartAssessment: (t: AssessmentType) => void }) {
  const stats = [
    { label: 'Total Siswa', value: '124', icon: Users, color: 'emerald' },
    { label: 'Asesmen Selesai', value: '88', icon: ClipboardCheck, color: 'emerald' },
    { label: 'Belum Asesmen', value: '36', icon: BrainCircuit, color: 'amber' },
    { label: 'Rata-rata Skor', value: '82%', icon: GraduationCap, color: 'purple' },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 lg:p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            <div className={cn(
              "w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-3 lg:mb-4 border",
              stat.color === 'blue' && "bg-emerald-50 text-emerald-600 border-emerald-100",
              stat.color === 'emerald' && "bg-emerald-50 text-emerald-600 border-emerald-100",
              stat.color === 'amber' && "bg-amber-50 text-amber-600 border-amber-100",
              stat.color === 'purple' && "bg-purple-50 text-purple-600 border-purple-100",
            )}>
              <stat.icon className="w-5 h-5 lg:w-6 lg:h-6" />
            </div>
            <p className="text-[#64748B] text-[10px] lg:text-sm font-medium uppercase lg:normal-case tracking-wider lg:tracking-normal">{stat.label}</p>
            <h3 className="text-xl lg:text-2xl font-bold text-[#0F172A] mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 lg:p-10 rounded-3xl text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
           <h2 className="text-2xl lg:text-3xl font-bold mb-3">Selamat Datang di Senostik V3 Online</h2>
           <p className="text-emerald-100 mb-6 lg:mb-8 text-sm lg:text-base leading-relaxed">
             Mulai asesmen baru untuk mendapatkan insight mendalam tentang perkembangan belajar dan kepribadian siswa Anda hari ini.
           </p>
           <button 
             onClick={() => onStartAssessment(AssessmentType.LEARNING_STYLE)}
             className="w-full sm:w-auto px-8 py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
           >
             Mulai Asesmen Kilat
           </button>
        </div>
        <GraduationCap className="absolute -right-10 -bottom-10 w-48 h-48 lg:w-64 lg:h-64 text-emerald-500 opacity-20 rotate-12" />
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-6 lg:p-8 rounded-3xl relative overflow-hidden">
        <div className="flex gap-4 lg:gap-6 items-start">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-100">
            <Info className="text-emerald-600" size={24} />
          </div>
          <div>
            <h3 className="text-base lg:text-lg font-bold text-emerald-950 mb-2">Apa itu Asesmen Diagnostik Non-Kognitif?</h3>
            <p className="text-emerald-800/80 text-xs lg:text-base leading-relaxed italic">
              "Bloom menjelaskan bahwa asesmen diagnostik merupakan proses pengumpulan informasi untuk mengetahui kondisi awal peserta didik sebelum pembelajaran dilakukan. Dalam konteks non-kognitif, asesmen digunakan untuk memahami aspek afektif, minat, motivasi, dan karakteristik belajar siswa."
            </p>
          </div>
          <div className="pt-4 border-t border-emerald-200/50">
            <h3 className="text-sm lg:text-base font-bold text-emerald-950 mb-2">Tujuan Utama</h3>
            <p className="text-emerald-800/80 text-xs lg:text-base leading-relaxed italic">
              "Menurut para ahli, tujuan asesmen diagnostik non-kognitif adalah untuk mengetahui kondisi psikologis, sosial emosional, minat, motivasi, gaya belajar, dan karakteristik peserta didik sebagai dasar dalam merancang strategi pembelajaran yang sesuai, efektif, dan berpusat pada kebutuhan siswa."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssessmentListView({ onStart }: { onStart: (t: AssessmentType) => void }) {
  const assessments = [
    { id: AssessmentType.LEARNING_STYLE, title: 'Gaya Belajar', desc: 'Visual, Auditori, atau Kinestetik?', icon: BrainCircuit, color: 'emerald' },
    { id: AssessmentType.PERSONALITY, title: 'Kepribadian', desc: 'Analisis tipe karakter siswa.', icon: Users, color: 'purple' },
    { id: AssessmentType.MULTIPLE_INTELLIGENCES, title: 'Bakat Ganda', desc: 'Identifikasi potensi kecerdasan majemuk.', icon: GraduationCap, color: 'emerald' },
    { id: AssessmentType.CAREER_INTEREST, title: 'Minat Karir', desc: 'Rekomendasi bidang masa depan.', icon: ClipboardCheck, color: 'amber' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
      {assessments.map((a) => (
        <div 
          key={a.id} 
          onClick={() => onStart(a.id)}
          className="bg-white group p-6 lg:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5 transition-all cursor-pointer"
        >
          <div className={cn(
             "w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform border",
             a.color === 'blue' && "bg-emerald-50 text-emerald-600 border-emerald-100",
             a.color === 'emerald' && "bg-emerald-50 text-emerald-600 border-emerald-100",
             a.color === 'amber' && "bg-amber-50 text-amber-600 border-amber-100",
             a.color === 'purple' && "bg-purple-50 text-purple-600 border-purple-100",
          )}>
            <a.icon className="w-6 h-6 lg:w-7 lg:h-7" />
          </div>
          <h3 className="text-lg lg:text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">{a.title}</h3>
          <p className="text-[#64748B] text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed">{a.desc}</p>
          <div className="flex items-center gap-2 font-bold text-sm lg:text-base text-emerald-600 group-hover:gap-3 transition-all">
            Mulai Sekarang <ChevronRight size={18} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ContentView({ title }: { title: string }) {
  return (
    <div className="bg-white p-8 lg:p-12 rounded-3xl border border-[#E2E8F0] shadow-sm min-h-[300px] lg:min-h-[400px] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 lg:mb-6 text-slate-300">
        <FileText className="w-10 h-10 lg:w-12 lg:h-12" />
      </div>
      <h2 className="text-xl lg:text-2xl font-bold mb-2">{title}</h2>
      <p className="text-[#64748B] text-sm lg:text-base max-w-md">Modul ini sedang dalam pengembangan untuk menghubungkan logika Excel ke sistem web otomatis.</p>
    </div>
  );
}
