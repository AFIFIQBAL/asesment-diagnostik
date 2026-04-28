/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AssessmentType, Question } from './types';

export const LEARNING_STYLE_QUESTIONS: Question[] = [
  { id: 'v1', text: 'Saya lebih mudah mengingat sesuatu dengan melihat gambar atau diagram.', category: 'Visual' },
  { id: 'v2', text: 'Saya suka mencatat penjelasan guru dengan warna-warna yang menarik.', category: 'Visual' },
  { id: 'v3', text: 'Saya sering membayangkan apa yang saya baca.', category: 'Visual' },
  { id: 'a1', text: 'Saya lebih suka mendengarkan penjelasan guru daripada membaca buku sendiri.', category: 'Auditori' },
  { id: 'a2', text: 'Saya sering membaca dengan suara keras agar lebih paham.', category: 'Auditori' },
  { id: 'a3', text: 'Saya senang berdiskusi tentang apa yang telah saya pelajari.', category: 'Auditori' },
  { id: 'k1', text: 'Saya sulit duduk diam dalam waktu lama saat belajar.', category: 'Kinestetik' },
  { id: 'k2', text: 'Saya lebih mudah memahami materi jika langsung mempraktikkannya.', category: 'Kinestetik' },
  { id: 'k3', text: 'Saya suka menggunakan jari saya untuk menunjuk kalimat saat membaca.', category: 'Kinestetik' },
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
