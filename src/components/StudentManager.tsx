/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Download, Upload } from 'lucide-react';
import { Student } from '../types';
import { cn } from '../lib/utils';

export default function StudentManager() {
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Ahmad Fauzi', nis: '12345', class: 'X-A', gender: 'L', schoolId: 's1', createdAt: Date.now() },
    { id: '2', name: 'Siti Aminah', nis: '12346', class: 'X-A', gender: 'P', schoolId: 's1', createdAt: Date.now() },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.nis.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama atau NIS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <Upload size={18} /> Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium shadow-sm">
            <Download size={18} /> Export
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-bold shadow-md shadow-blue-100"
          >
            <Plus size={18} /> Tambah Siswa
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">NIS</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kelas</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">L/P</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {student.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-900">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm font-mono">{student.nis}</td>
                <td className="px-6 py-4 text-slate-600 text-sm">{student.class}</td>
                <td className="px-6 py-4">
                   <span className={cn(
                     "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                     student.gender === 'L' ? "bg-sky-50 text-sky-600" : "bg-rose-50 text-rose-600"
                   )}>
                     {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                  Tidak ada data siswa ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
