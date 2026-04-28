/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, CheckCircle2, Info } from 'lucide-react';
import { AssessmentType, Question } from '../types';
import { cn } from '../lib/utils';

interface AssessmentFlowProps {
  type: AssessmentType;
  questions: Question[];
  onComplete: (answers: Record<string, number>) => void;
  onCancel: () => void;
}

export default function AssessmentFlow({ type, questions, onComplete, onCancel }: AssessmentFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete({ ...answers, [currentQuestion.id]: value });
    }
  };

  const options = [
    { label: 'Sangat Tidak Sesuai', value: 1, color: 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100' },
    { label: 'Tidak Sesuai', value: 2, color: 'bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100' },
    { label: 'Ragu-ragu', value: 3, color: 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100' },
    { label: 'Sesuai', value: 4, color: 'bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-100' },
    { label: 'Sangat Sesuai', value: 5, color: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={onCancel}
          className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ChevronLeft size={18} /> Kembali ke Menu
        </button>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
          <p className="text-lg font-bold text-blue-600 font-mono">{currentIndex + 1} / {questions.length}</p>
        </div>
      </div>

      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]"
        />
      </div>

      <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600 opacity-10" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-100">
                  {currentQuestion.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight text-slate-900">
                "{currentQuestion.text}"
              </h2>
            </div>

            <div className="space-y-3">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 transition-all group",
                    answers[currentQuestion.id] === opt.value
                      ? "border-blue-600 bg-blue-50/50 ring-4 ring-blue-50"
                      : "border-slate-100 bg-slate-50/30 hover:border-blue-200 hover:bg-white"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm transition-transform group-hover:scale-110",
                      opt.color
                    )}>
                      {opt.value}
                    </div>
                    <span className="font-semibold text-slate-700">{opt.label}</span>
                  </div>
                  {answers[currentQuestion.id] === opt.value && (
                    <CheckCircle2 className="text-blue-600 w-6 h-6" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <Info className="text-blue-500 shrink-0" size={20} />
        <p className="text-xs text-slate-500 leading-relaxed">
          Pilih jawaban yang paling menggambarkan diri kamu saat ini. Tidak ada jawaban benar atau salah dalam asesmen ini.
        </p>
      </div>
    </div>
  );
}
