/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Save, School, User, MapPin, Calendar } from 'lucide-react';
import { SchoolProfile as ProfileType } from '../types';

export default function SchoolProfile() {
  const [profile, setProfile] = useState<ProfileType>({
    id: 's1',
    name: 'SMA Negeri 1 Jakarta',
    parentOrganization: 'Kementerian Pendidikan dan Kebudayaan',
    supervisingAgency: 'Dinas Pendidikan Provinsi DKI Jakarta',
    address: 'Jl. Budi Utomo No. 7',
    kelurahan: 'Pasar Baru',
    kecamatan: 'Sawah Besar',
    kota: 'Jakarta Pusat',
    provinsi: 'DKI Jakarta',
    principalName: 'Dr. H. Ahmad Dahlan, M.Pd.',
    bkTeacherName: 'Dra. Siti Fatimah',
    bkTeacherNip: '197005121995032001',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Profil Sekolah</h2>
          <p className="text-slate-500 mt-1">Konfigurasi identitas sekolah untuk laporan resmi.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-bold shadow-md shadow-emerald-100">
          <Save size={18} /> Simpan Perubahan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
            <School size={20} /> Informasi Lembaga
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Nama Sekolah</label>
              <input name="name" value={profile.name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Instansi Induk</label>
              <input name="parentOrganization" value={profile.parentOrganization} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Lembaga Naungan</label>
              <input name="supervisingAgency" value={profile.supervisingAgency} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Personnel */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
            <User size={20} /> Personalia
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Kepala Sekolah</label>
              <input name="principalName" value={profile.principalName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Guru BK</label>
              <input name="bkTeacherName" value={profile.bkTeacherName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">NIP Guru BK</label>
               <input name="bkTeacherNip" value={profile.bkTeacherNip} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 md:col-span-2">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
            <MapPin size={20} /> Alamat & Lokasi
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Alamat Lengkap</label>
              <input name="address" value={profile.address} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Kelurahan</label>
              <input name="kelurahan" value={profile.kelurahan} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Kecamatan</label>
              <input name="kecamatan" value={profile.kecamatan} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Kota/Kabupaten</label>
              <input name="kota" value={profile.kota} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
