/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { AssessmentResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getTeacherSuggestions(result: AssessmentResult, studentName: string) {
  if (!process.env.GEMINI_API_KEY) {
    return "Saran bimbingan sedang tidak tersedia (API Key missing). Silakan hubungi admin.";
  }

  const prompt = `
    Anda adalah seorang Pakar Psikologi Pendidikan dan Guru BK Berpengalaman.
    Seorang siswa bernama ${studentName} telah menyelesaikan asesmen ${result.type}.
    
    Berikut adalah hasil skornya:
    ${JSON.stringify(result.scores)}
    
    Berdasarkan data ini, berikan saran bimbingan yang konkret, empatik, dan praktis untuk Guru di kelas:
    1. Cara berkomunikasi dengan siswa ini.
    2. Strategi belajar yang paling efektif untuk dia.
    3. Potensi masalah yang mungkin dihadapi dan cara pencegahannya.
    
    Tuliskan dalam bahasa Indonesia yang profesional namun mudah dipahami.
    Gunakan format markdown dengan poin-poin.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Gagal menghasilkan saran.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Gagal mendapatkan saran otomatis. Silakan coba lagi nanti.";
  }
}
