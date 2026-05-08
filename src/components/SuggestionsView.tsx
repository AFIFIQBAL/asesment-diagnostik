/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { Sparkles, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { AssessmentResult } from '../types';
import { getTeacherSuggestions } from '../services/geminiService';

interface SuggestionsViewProps {
  result: AssessmentResult | null;
  studentName: string;
}

export default function SuggestionsView({ result, studentName }: SuggestionsViewProps) {
  const [suggestion, setSuggestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestion = async () => {
    if (!result) return;
    setLoading(true);
    setError(null);
    try {
      const text = await getTeacherSuggestions(result, studentName);
      setSuggestion(text);
    } catch (err) {
      setError('Terjadi kesalahan saat memuat saran.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && !suggestion) {
      fetchSuggestion();
    }
  }, [result]);

  if (!result) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-300">
          <Sparkles size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Belum Ada Data</h3>
        <p className="text-slate-500 max-w-sm">Silakan selesaikan asesmen siswa terlebih dahulu untuk mendapatkan saran bimbingan AI.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-teal-900 to-emerald-900 text-white p-10 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Sparkles size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-teal-500/30 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-teal-400/30">
              AI Powered
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-4 italic">"Saran Pedagogis Senostik"</h2>
          <p className="text-teal-100 max-w-2xl leading-relaxed">
            Analisis kecerdasan buatan terhadap hasil asesmen <span className="font-bold text-white underline decoration-teal-400">{studentName}</span> untuk membantu Guru BK dalam memberikan bimbingan yang tepat sasaran.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="text-emerald-600 animate-spin" size={40} />
            <p className="text-slate-500 font-medium animate-pulse">Menghitung saran terbaik untuk Anda...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 text-rose-600">
            <AlertCircle size={40} />
            <p className="font-bold">{error}</p>
            <button 
              onClick={fetchSuggestion}
              className="px-6 py-2 bg-rose-50 text-rose-600 font-bold rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-2"
            >
              <RefreshCw size={18} /> Coba Lagi
            </button>
          </div>
        ) : (
          <div className="prose prose-slate max-w-none prose-h1:text-2xl prose-h2:text-xl prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900">
            <Markdown>{suggestion}</Markdown>
            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
               <p className="text-xs text-slate-400 italic">Disarankan secara otomatis oleh Senostik AI. Tetap gunakan pertimbangan profesional Anda.</p>
               <button 
                 onClick={fetchSuggestion}
                 className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
               >
                 <RefreshCw size={16} /> Regenerasi Saran
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
