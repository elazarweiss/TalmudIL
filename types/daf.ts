export interface MishnahEntry {
  id: string;
  text: string; // Hebrew primary text
  he: string;   // English translation
  verified?: boolean;
  sourceId?: string;
}

export interface GemaraEntry {
  id: string;
  speaker: string;
  text: string; // Hebrew quote
  he: string;   // English translation
  source: string;
  verified?: boolean;
  sourceId?: string;
}

export interface TosafotEntry {
  id: string;
  title: string;
  caseRef: string;
  text: string; // Hebrew
  he: string;   // English
  verified?: boolean;
  sourceId?: string;
}

export interface RashiEntry {
  id: string;
  author: string;
  source: string;
  text: string; // Hebrew
  he: string;   // English
  verified?: boolean;
  sourceId?: string;
}

export interface DafData {
  seder: string;
  tractate: string;
  daf: string;
  mishnah: MishnahEntry[];
  gemara: GemaraEntry[];
  tosafot: TosafotEntry[];
  rashi: RashiEntry[];
}

export type SourceType = 'book' | 'article' | 'ruling' | 'law' | 'speech' | 'letter';

export interface Source {
  id: string;
  author: string;
  title: string;
  year: number;
  type: SourceType;
  originalText: string;
  englishTranslation: string;
  verified: boolean;
  notes: string;
}

export interface SourceLibrary {
  sources: Source[];
}

export interface Tractate {
  id: string;
  hebrewName: string;
  englishName: string;
  dafs: string[];
}

export interface Seder {
  id: string;
  hebrewName: string;
  englishName: string;
  tractates: Tractate[];
}

export interface Metadata {
  sedarim: Seder[];
}

export interface DafRef {
  seder: string;
  tractate: string;
  daf: string;
}
