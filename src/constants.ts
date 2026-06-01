/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AssessmentType, Question } from './types';

export const LEARNING_STYLE_QUESTIONS: Question[] = [
  { id: 'v1', text: 'Saya lebih mudah memahami materi jika disertai gambar, bagan, atau diagram.', category: 'Visual' },
  { id: 'a1', text: 'Saya lebih paham jika guru menjelaskan materi secara lisan.', category: 'Auditori' },
  { id: 'k1', text: 'Saya lebih suka belajar dengan praktik langsung daripada hanya membaca teori.', category: 'Kinestetik' },
  { id: 'v2', text: 'Saya senang membuat catatan berwarna, mind map, atau ringkasan visual.', category: 'Visual' },
  { id: 'a2', text: 'Saya mudah mengingat materi yang saya dengar dari guru, teman, atau rekaman suara.', category: 'Auditori' },
  { id: 'k2', text: 'Saya lebih cepat paham jika diberi kesempatan mencoba sendiri.', category: 'Kinestetik' },
  { id: 'v3', text: 'Saya suka melihat video pembelajaran ketika mempelajari materi baru.', category: 'Visual' },
  { id: 'a3', text: 'Saya lebih mudah memahami materi melalui diskusi atau tanya jawab.', category: 'Auditori' },
  { id: 'k3', text: 'Saya merasa lebih fokus jika belajar sambil bergerak atau melakukan aktivitas.', category: 'Kinestetik' },
  { id: 'v4', text: 'Saya suka membaca materi dan menandai bagian penting dengan stabilo atau garis bawah.', category: 'Visual' },
  { id: 'a4', text: 'Saya lebih mudah mengingat penjelasan yang diucapkan secara langsung.', category: 'Auditori' },
  { id: 'k4', text: 'Saya senang belajar melalui simulasi, praktik, eksperimen, atau proyek.', category: 'Kinestetik' },
  { id: 'v5', text: 'Saya lebih nyaman jika materi disajikan dalam bentuk tabel, grafik, atau gambar.', category: 'Visual' },
  { id: 'a5', text: 'Saya biasanya belajar dengan mendengarkan penjelasan sambil mencatat poin penting.', category: 'Auditori' },
  { id: 'k5', text: 'Saya kurang nyaman jika harus duduk diam terlalu lama saat belajar.', category: 'Kinestetik' },
];

export const PERSONALITY_QUESTIONS: Question[] = [
  { id: 'p1', text: 'Saya merasa bertenaga setelah menghabiskan waktu bersama banyak orang.', category: 'Ekstrovert' },
  { id: 'p2', text: 'Saya lebih suka bekerja sendiri daripada dalam kelompok besar.', category: 'Introvert' },
  { id: 'p3', text: 'Saya cenderung berpikir matang sebelum berbicara.', category: 'Introvert' },
  { id: 'p4', text: 'Saya mudah bergaul dengan orang yang baru saya kenal.', category: 'Ekstrovert' },
  { id: 'p5', text: 'Saya lebih menyukai perencanaan daripada hal yang spontan.', category: 'Judging' },
  { id: 'p6', text: 'Saya lebih suka mengikuti arus dan fleksibel.', category: 'Perceiving' },
];

export const MULTIPLE_INTELLIGENCE_QUESTIONS: Question[] = [
  { id: 'mi1', text: 'Saya suka menulis cerita, puisi, atau artikel.', category: 'Linguistik' },
  { id: 'mi2', text: 'Saya senang memecahkan teka-teki logika atau matematika.', category: 'Logis-Matematis' },
  { id: 'mi3', text: 'Saya peka terhadap nada, irama, dan melodi musik.', category: 'Musikal' },
  { id: 'mi4', text: 'Saya suka menggambar, melukis, atau membuat sketsa.', category: 'Spasial' },
  { id: 'mi5', text: 'Saya senang melakukan aktivitas fisik seperti olahraga atau menari.', category: 'Kinestetik' },
  { id: 'mi6', text: 'Saya mudah memahami perasaan orang lain.', category: 'Interpersonal' },
  { id: 'mi7', text: 'Saya sering merenungkan tujuan hidup saya.', category: 'Intrapersonal' },
  { id: 'mi8', text: 'Saya sangat menyukai alam dan aktivitas luar ruangan.', category: 'Naturalis' },
];

export const CAREER_INTEREST_QUESTIONS: Question[] = [
  { id: 'c1', text: 'Saya suka memperbaiki mesin atau alat elektronik.', category: 'Realistik' },
  { id: 'c2', text: 'Saya suka melakukan eksperimen ilmiah.', category: 'Investigatif' },
  { id: 'c3', text: 'Saya senang menciptakan karya seni yang unik.', category: 'Artistik' },
  { id: 'c4', text: 'Saya suka membantu orang lain memecahkan masalah mereka.', category: 'Sosial' },
  { id: 'c5', text: 'Saya suka memimpin tim dan merencanakan strategi.', category: 'Enterprising' },
  { id: 'c6', text: 'Saya suka bekerja dengan data dan angka secara teliti.', category: 'Konvensional' },
];
