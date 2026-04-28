/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BrainCircuit, 
  FileText, 
  Settings, 
  ChevronRight,
  GraduationCap,
  ClipboardCheck,
  TrendingUp,
  Lightbulb
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
  const [activeView, setActiveView] = useState(VIEWS.DASHBOARD);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<AssessmentType | null>(null);
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null);

  const menuItems = [
    { id: VIEWS.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: VIEWS.STUDENTS, label: 'Data Murid', icon: Users },
    { id: VIEWS.ASSESSMENTS, label: 'Asesmen', icon: BrainCircuit },
    { id: VIEWS.ANALYSIS, label: 'Analisis Individu', icon: TrendingUp },
    { id: VIEWS.SUGGESTIONS, label: 'Saran Guru', icon: Lightbulb },
    { id: VIEWS.REPORTS, label: 'Laporan', icon: FileText },
    { id: VIEWS.PROFILE, label: 'Profil Sekolah', icon: Settings },
  ];

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
    setActiveView(VIEWS.ANALYSIS);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] overflow-hidden font-sans">
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className={cn(
          "bg-white border-r border-[#E2E8F0] flex flex-col transition-all duration-300 relative z-20",
          !isSidebarOpen && "items-center"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl tracking-tight text-blue-950"
            >
              Senostik
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                if (item.id !== VIEWS.ASSESSMENTS) {
                   setSelectedAssessmentType(null);
                }
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group text-left",
                activeView === item.id 
                  ? "bg-blue-50 text-blue-600 font-medium shadow-sm" 
                  : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0",
                activeView === item.id ? "text-blue-600" : "group-hover:text-[#1E293B]"
              )} />
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#E2E8F0]">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#64748B] hover:bg-[#F1F5F9] rounded-xl transition-all"
          >
            <ChevronRight className={cn("w-5 h-5 transition-transform", isSidebarOpen ? "rotate-180" : "")} />
            {isSidebarOpen && <span>Sembunyikan</span>}
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
          <h1 className="text-xl font-bold text-[#0F172A]">
            {menuItems.find(i => i.id === activeView)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-sm font-semibold text-[#0F172A]">Guru BK</span>
              <span className="text-xs text-[#64748B]">Admin Sekolah</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
              BK
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView + (selectedAssessmentType || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              {activeView === VIEWS.DASHBOARD && <DashboardView onStartAssessment={handleStartAssessment} />}
              {activeView === VIEWS.STUDENTS && <StudentManager />}
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
              {activeView === VIEWS.REPORTS && <ContentView title="Laporan & Cetak" />}
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
    { label: 'Total Siswa', value: '124', icon: Users, color: 'blue' },
    { label: 'Asesmen Selesai', value: '88', icon: ClipboardCheck, color: 'emerald' },
    { label: 'Belum Asesmen', value: '36', icon: BrainCircuit, color: 'amber' },
    { label: 'Rata-rata Skor', value: '82%', icon: GraduationCap, color: 'purple' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-4 border",
              stat.color === 'blue' && "bg-blue-50 text-blue-600 border-blue-100",
              stat.color === 'emerald' && "bg-emerald-50 text-emerald-600 border-emerald-100",
              stat.color === 'amber' && "bg-amber-50 text-amber-600 border-amber-100",
              stat.color === 'purple' && "bg-purple-50 text-purple-600 border-purple-100",
            )}>
              <stat.icon size={24} />
            </div>
            <p className="text-[#64748B] text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-[#0F172A] mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-10 rounded-3xl text-white shadow-xl shadow-blue-200 relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
           <h2 className="text-3xl font-bold mb-4">Selamat Datang di Senostik V3 Online</h2>
           <p className="text-blue-100 mb-8 leading-relaxed">
             Mulai asesmen baru untuk mendapatkan insight mendaalam tentang perkembangan belajar dan kepribadian siswa Anda hari ini.
           </p>
           <button 
             onClick={() => onStartAssessment(AssessmentType.LEARNING_STYLE)}
             className="px-8 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
           >
             Mulai Asesmen Kilat
           </button>
        </div>
        <GraduationCap className="absolute -right-10 -bottom-10 w-64 h-64 text-blue-500 opacity-20 rotate-12" />
      </div>
    </div>
  );
}

function AssessmentListView({ onStart }: { onStart: (t: AssessmentType) => void }) {
  const assessments = [
    { id: AssessmentType.LEARNING_STYLE, title: 'Gaya Belajar', desc: 'Visual, Auditori, atau Kinestetik?', icon: BrainCircuit, color: 'blue' },
    { id: AssessmentType.PERSONALITY, title: 'Kepribadian', desc: 'Analisis tipe karakter siswa.', icon: Users, color: 'purple' },
    { id: AssessmentType.MULTIPLE_INTELLIGENCES, title: 'Bakat Ganda', desc: 'Identifikasi potensi kecerdasan majemuk.', icon: GraduationCap, color: 'emerald' },
    { id: AssessmentType.CAREER_INTEREST, title: 'Minat Karir', desc: 'Rekomendasi bidang masa depan.', icon: ClipboardCheck, color: 'amber' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {assessments.map((a) => (
        <div 
          key={a.id} 
          onClick={() => onStart(a.id)}
          className="bg-white group p-8 rounded-3xl border border-[#E2E8F0] shadow-sm hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer"
        >
          <div className={cn(
             "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border",
             a.color === 'blue' && "bg-blue-50 text-blue-600 border-blue-100",
             a.color === 'emerald' && "bg-emerald-50 text-emerald-600 border-emerald-100",
             a.color === 'amber' && "bg-amber-50 text-amber-600 border-amber-100",
             a.color === 'purple' && "bg-purple-50 text-purple-600 border-purple-100",
          )}>
            <a.icon size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{a.title}</h3>
          <p className="text-[#64748B] mb-8 leading-relaxed">{a.desc}</p>
          <div className="flex items-center gap-2 font-bold text-blue-600 group-hover:gap-3 transition-all">
            Mulai Sekarang <ChevronRight size={18} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ContentView({ title }: { title: string }) {
  return (
    <div className="bg-white p-12 rounded-3xl border border-[#E2E8F0] shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
        <FileText size={40} />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-[#64748B] max-w-md">Modul ini sedang dalam pengembangan untuk menghubungkan logika Excel ke sistem web otomatis.</p>
    </div>
  );
}
