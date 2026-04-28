/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AssessmentType {
  LEARNING_STYLE = 'learning_style',
  PERSONALITY = 'personality',
  MULTIPLE_INTELLIGENCES = 'multiple_intelligences',
  CAREER_INTEREST = 'career_interest'
}

export interface Student {
  id: string;
  name: string;
  nis: string;
  class: string;
  gender: 'L' | 'P';
  schoolId: string;
  createdAt: number;
}

export interface AssessmentResult {
  id: string;
  studentId: string;
  type: AssessmentType;
  answers: Record<string, number | string>;
  scores: Record<string, number>;
  summary: string;
  timestamp: number;
}

export interface SchoolProfile {
  id: string;
  name: string;
  parentOrganization: string;
  supervisingAgency: string;
  address: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  principalName: string;
  bkTeacherName: string;
  bkTeacherNip: string;
  date: string;
}

export interface Question {
  id: string;
  text: string;
  category: string;
}
