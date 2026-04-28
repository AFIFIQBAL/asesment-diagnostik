/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import { Download, FileText, Share2, Lightbulb, ChevronRight } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AssessmentResult } from '../types';

interface AnalysisViewProps {
  result: AssessmentResult;
  studentName: string;
}

export default function AnalysisView({ result, studentName }: AnalysisViewProps) {
  // Convert scores to recharts format
  const data = Object.entries(result.scores).map(([name, value]) => ({
    name,
    value,
    fullMark: 100
  }));

  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316', '#64748B'];

  const handleDownloadPDF = async () => {
    const element = document.getElementById('analysis-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Laporan_Senostik_${studentName}_${result.type}.pdf`);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Gagal membuat PDF. Silakan coba lagi.');
    }
  };

  return (
    <div id="analysis-content" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#F8FAFC] p-4 rounded-3xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Hasil Analisis</h2>
          <p className="text-slate-500 mt-1">Laporan asesmen untuk <span className="font-bold text-blue-600">{studentName}</span></p>
        </div>
        <div className="flex items-center gap-3 no-print">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-sm font-semibold shadow-sm bg-white">
            <Share2 size={18} /> Bagikan
          </button>
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-bold shadow-md shadow-blue-100"
          >
            <Download size={18} /> Unduh PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center">
          <h3 className="font-bold text-lg mb-6 self-start">Visualisasi Skor</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Skor"
                  dataKey="value"
                  stroke="#2563EB"
                  fill="#2563EB"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Distribusi Komponen</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" width={100} axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 500 }} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                <Bar dataKey="value" radius={[0, 12, 12, 0]} barSize={20}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <FileText size={100} />
             </div>
             <h3 className="font-bold text-lg mb-4">Ringkasan Kesimpulan</h3>
             <div className="prose prose-slate max-w-none">
               <p className="text-slate-600 leading-relaxed text-lg italic">
                 "{result.summary}"
               </p>
             </div>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-3xl shadow-xl shadow-blue-200 relative overflow-hidden">
             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-800 rounded-full blur-3xl opacity-50" />
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center">
                 <Lightbulb className="text-blue-300" size={24} />
               </div>
               <h3 className="font-bold text-xl">Potensi Dominan</h3>
             </div>
             <p className="text-blue-100 mb-6 leading-relaxed">
               Berdasarkan hasil analisis di atas, siswa ini menunjukkan potensi dominan pada bidang {Object.keys(result.scores).reduce((a, b) => result.scores[a] > result.scores[b] ? a : b)}. Hal ini sangat baik untuk pengembangan karir di masa depan.
             </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm content-start">
          <h3 className="font-bold text-lg mb-6">Detail Skor</h3>
          <div className="space-y-4">
             {data.map((item, idx) => (
               <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                   <span className="text-sm font-medium text-slate-700">{item.name}</span>
                 </div>
                 <span className="font-bold text-slate-900 font-mono">{item.value}%</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
