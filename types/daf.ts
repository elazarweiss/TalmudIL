export interface MishnahEntry {
  id: string;
  text: string; // Hebrew primary text
  he: string;   // English translation
}

export interface GemaraEntry {
  id: string;
  speaker: string;
  text: string; // Hebrew quote
  he: string;   // English translation
  source: string;
}

export interface TosafotEntry {
  id: string;
  title: string;
  caseRef: string;
  text: string; // Hebrew
  he: string;   // English
}

export interface RashiEntry {
  id: string;
  author: string;
  source: string;
  text: string; // Hebrew
  he: string;   // English
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
