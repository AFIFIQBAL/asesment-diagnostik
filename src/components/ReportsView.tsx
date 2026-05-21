/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, FileText, Calendar, Check, Loader2, Award } from 'lucide-react';
import { AssessmentResult, Student, AssessmentType } from '../types';
import { cn } from '../lib/utils';
import AnalysisView from './AnalysisView';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ReportsViewProps {
  results: AssessmentResult[];
  students: Student[];
  onViewResult: (result: AssessmentResult, student: Student) => void;
}

export default function ReportsView({ results, students, onViewResult }: ReportsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [pdfTarget, setPdfTarget] = useState<{ result: AssessmentResult; studentName: string } | null>(null);

  // Get list of unique classes for filtering
  const classes = Array.from(new Set(students.map(s => s.class)));

  // Helper to get student info
  const getStudentInfo = (studentId: string) => {
    return students.find(s => s.id === studentId);
  };

  // Helper to format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Helper to get highest score of an assessment
  const getDominantPotential = (scores: Record<string, number>) => {
    if (!scores || Object.keys(scores).length === 0) return '-';
    return Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
  };

  const getDominantPotentialScore = (scores: Record<string, number>) => {
    if (!scores || Object.keys(scores).length === 0) return 0;
    return Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[1];
  };

  const getAssessmentTypeDetails = (type: AssessmentType) => {
    switch (type) {
      case AssessmentType.LEARNING_STYLE:
        return { title: 'Gaya Belajar', color: 'emerald', bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
      case AssessmentType.PERSONALITY:
        return { title: 'Kepribadian', color: 'purple', bg: 'bg-purple-50 text-purple-700 border-purple-100' };
      case AssessmentType.MULTIPLE_INTELLIGENCES:
        return { title: 'Bakat Ganda', color: 'indigo', bg: 'bg-indigo-50 text-indigo-700 border-indigo-100' };
      case AssessmentType.CAREER_INTEREST:
        return { title: 'Minat Karir', color: 'amber', bg: 'bg-amber-50 text-amber-700 border-amber-100' };
      default:
        return { title: type, color: 'slate', bg: 'bg-slate-50 text-slate-700 border-slate-100' };
    }
  };

  // Filter completed results
  const filteredResults = results.filter(res => {
    const student = getStudentInfo(res.studentId);
    if (!student) return false;

    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.nis.includes(searchTerm);
    const matchesType = filterType === 'all' || res.type === filterType;
    const matchesClass = filterClass === 'all' || student.class === filterClass;

    return matchesSearch && matchesType && matchesClass;
  });

  // Background PDF generation effect
  useEffect(() => {
    if (pdfTarget) {
      const generatePDF = async () => {
        const element = document.getElementById('hidden-pdf-content');
        if (!element) return;

        try {
          // Temporarily ensure high visibility for capture
          element.style.opacity = '1';
          element.style.pointerEvents = 'auto';

          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#F8FAFC'
          });

          // Restore styles
          element.style.opacity = '0';
          element.style.pointerEvents = 'none';

          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`Laporan_Senostik_${pdfTarget.studentName}_${pdfTarget.result.type}.pdf`);
        } catch (error) {
          console.error('Direct PDF Generation Error:', error);
          alert('Gagal membuat PDF. Silakan coba lagi.');
        } finally {
          setDownloadingId(null);
          setPdfTarget(null);
        }
      };

      // Ensure component is painted to DOM first
      const timer = setTimeout(generatePDF, 250);
      return () => clearTimeout(timer);
    }
  }, [pdfTarget]);

  const handleAsyncDownload = (result: AssessmentResult, studentName: string) => {
    setDownloadingId(result.id);
    setPdfTarget({ result, studentName });
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-2 text-emerald-600 font-semibold text-xs lg:text-sm uppercase tracking-wider">
          <FileText size={18} /> Laporan & Hasil Cetak
        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-slate-900">Arsip Hasil Asesmen</h2>
        <p className="text-slate-500 text-xs lg:text-base mt-1">Daftar lengkap seluruh asesmen diagnostik non-kognitif yang telah diselesaikan beserta opsi ekspor laporan.</p>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-stretch xl:items-center">
        <div className="relative flex-1 max-w-none lg:max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama siswa atau NIS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Class filter */}
          <select 
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <option value="all">Semua Kelas</option>
            {classes.map(cl => (
              <option key={cl} value={cl}>Kelas {cl}</option>
            ))}
          </select>

          {/* Assessment Type filter */}
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <option value="all">Semua Jenis Asesmen</option>
            <option value={AssessmentType.LEARNING_STYLE}>Gaya Belajar</option>
            <option value={AssessmentType.PERSONALITY}>Kepribadian</option>
            <option value={AssessmentType.MULTIPLE_INTELLIGENCES}>Bakat Ganda</option>
            <option value={AssessmentType.CAREER_INTEREST}>Minat Karir</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Siswa / NIS</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kelas</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Jenis Asesmen</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal Selesai</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Potensi Dominan</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResults.map((res) => {
                const student = getStudentInfo(res.studentId);
                if (!student) return null;

                const details = getAssessmentTypeDetails(res.type);
                const dominant = getDominantPotential(res.scores);
                const scoreVal = getDominantPotentialScore(res.scores);

                return (
                  <tr key={res.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{student.name}</p>
                          <p className="text-slate-400 text-xs font-mono">{student.nis}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm whitespace-nowrap">{student.class}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[11px] font-bold border whitespace-nowrap",
                        details.bg
                      )}>
                        {details.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-400" />
                        {formatDate(res.timestamp)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Award size={16} className="text-emerald-500" />
                        <span className="font-semibold text-slate-700 text-sm">{dominant}</span>
                        <span className="text-slate-400 font-mono text-xs">({scoreVal}%)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => onViewResult(res, student)}
                          className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg hover:border-emerald-300 text-slate-600 hover:text-emerald-600 transition-all text-xs font-semibold bg-white shadow-sm"
                        >
                          <Eye size={14} /> Lihat
                        </button>
                        <button 
                          disabled={downloadingId !== null}
                          onClick={() => handleAsyncDownload(res, student.name)}
                          className={cn(
                            "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm",
                            downloadingId === res.id 
                              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                              : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100"
                          )}
                        >
                          {downloadingId === res.id ? (
                            <>
                              <Loader2 size={14} className="animate-spin" /> Proses
                            </>
                          ) : (
                            <>
                              <Download size={14} /> PDF
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredResults.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400 italic">
                    Belum ada riwayat hasil asesmen. Silakan lakukan asesmen siswa terlebih dahulu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invisible PDF container for pixel-perfect background capture */}
      {pdfTarget && (
        <div 
          id="hidden-pdf-content"
          className="bg-[#F8FAFC] p-8 rounded-3xl"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            width: '1024px', // Stable desktop width for standard PDF scale
            height: 'auto',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -100
          }}
        >
          <div className="bg-white p-8 rounded-3xl border border-slate-200 mb-6 flex justify-between items-center shadow-sm">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-emerald-950">LAPORAN HASILI ASESMEN DIAGNOSTIK</h1>
              <p className="text-slate-500 mt-1">Aplikasi Senostik V3 Online • Laporan Resmi Kemenristekdikti</p>
            </div>
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Award className="text-white" size={28} />
            </div>
          </div>
          <AnalysisView result={pdfTarget.result} studentName={pdfTarget.studentName} />
        </div>
      )}
    </div>
  );
}
