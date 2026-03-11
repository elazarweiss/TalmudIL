export type Lang = 'he' | 'en';

const translations = {
  en: {
    // Header
    adminTitle: 'TalmudIL Admin',
    logout: 'Logout',
    switchLang: 'עברית',

    // Sidebar
    newSeder: '+ New Seder',
    sources: 'Sources →',
    noSedarim: 'No sedarim yet.',
    noTractates: 'No tractates yet',
    noDafs: 'No dafs yet',
    editSederTip: 'Edit seder',
    newTractateTip: 'New tractate',
    newDafTip: 'New daf',

    // DafEditor
    mishnah: 'Mishnah',
    gemara: 'Gemara',
    tosafot: 'Tosafot',
    rashi: 'Rashi',
    entries: 'entries',
    addEntry: '+ Add entry',
    saveDaf: 'Save Daf',
    saving: 'Saving…',
    saved: 'Saved!',
    saveFailed: 'Save failed',
    loadFailed: 'Failed to load daf',

    // EntryForm
    verified: 'Verified',
    delete: 'Delete',
    hebrewText: 'Hebrew text',
    englishTranslation: 'English translation',
    speakerHebrew: 'Speaker (Hebrew)',
    source: 'Source',
    hebrewQuote: 'Hebrew quote',
    titleHebrew: 'Title (Hebrew)',
    caseRef: 'Case Reference',
    author: 'Author',

    // SourcePicker
    linkSource: '+ Link source',
    filterSources: 'Filter sources…',
    noSourcesFound: 'No sources found',
    loading: 'Loading…',

    // Forms — common
    cancel: 'Cancel',
    idSlug: 'ID (slug)',
    hebrewName: 'Hebrew Name',
    englishName: 'English Name',

    // New Seder
    newSederTitle: 'New Seder',
    idHintSeder: 'e.g. religion-and-state',
    createSeder: 'Create Seder',
    errorSeder: 'Error creating seder',

    // New Tractate
    newTractateTitle: 'New Tractate',
    idHintTractate: 'e.g. shabbat',
    createTractate: 'Create Tractate',
    errorTractate: 'Error creating tractate',
    sederLabel: 'Seder',

    // New Daf
    newDafTitle: 'New Daf',
    dafId: 'Daf ID',
    idHintDaf: 'e.g. 1a, 2b',
    createDaf: 'Create Daf',
    errorDaf: 'Error creating daf',
    selectSeder: 'Select a seder…',
    selectTractate: 'Select a tractate…',
    tractateLabel: 'Tractate',

    // Edit Seder
    editSederTitle: 'Edit Seder',
    save: 'Save',
    deleteSeder: 'Delete Seder',
    deleting: 'Deleting…',
    errorSave: 'Error saving',
    errorDelete: 'Error deleting',
    confirmDelete: 'Delete this seder and all its tractates?',
    sederNotFound: 'Seder not found.',

    // MainPanel
    welcomeTitle: 'TalmudIL Admin',
    welcomeSubtitle: 'Select a daf from the sidebar to begin editing.',
  },

  he: {
    // Header
    adminTitle: 'ניהול תלמוד ישראל',
    logout: 'יציאה',
    switchLang: 'English',

    // Sidebar
    newSeder: '+ סדר חדש',
    sources: 'מקורות →',
    noSedarim: 'אין סדרים עדיין.',
    noTractates: 'אין מסכות עדיין',
    noDafs: 'אין דפים עדיין',
    editSederTip: 'ערוך סדר',
    newTractateTip: 'מסכת חדשה',
    newDafTip: 'דף חדש',

    // DafEditor
    mishnah: 'משנה',
    gemara: 'גמרא',
    tosafot: 'תוספות',
    rashi: 'רש״י',
    entries: 'ערכים',
    addEntry: '+ הוסף ערך',
    saveDaf: 'שמור דף',
    saving: 'שומר…',
    saved: 'נשמר!',
    saveFailed: 'שמירה נכשלה',
    loadFailed: 'טעינת הדף נכשלה',

    // EntryForm
    verified: 'מאומת',
    delete: 'מחק',
    hebrewText: 'טקסט עברי',
    englishTranslation: 'תרגום לאנגלית',
    speakerHebrew: 'דובר (עברית)',
    source: 'מקור',
    hebrewQuote: 'ציטוט עברי',
    titleHebrew: 'כותרת (עברית)',
    caseRef: 'הפניה לתיק',
    author: 'מחבר',

    // SourcePicker
    linkSource: '+ קשר מקור',
    filterSources: 'סנן מקורות…',
    noSourcesFound: 'לא נמצאו מקורות',
    loading: 'טוען…',

    // Forms — common
    cancel: 'ביטול',
    idSlug: 'מזהה',
    hebrewName: 'שם בעברית',
    englishName: 'שם באנגלית',

    // New Seder
    newSederTitle: 'סדר חדש',
    idHintSeder: 'למשל: religion-and-state',
    createSeder: 'צור סדר',
    errorSeder: 'שגיאה ביצירת הסדר',

    // New Tractate
    newTractateTitle: 'מסכת חדשה',
    idHintTractate: 'למשל: shabbat',
    createTractate: 'צור מסכת',
    errorTractate: 'שגיאה ביצירת המסכת',
    sederLabel: 'סדר',

    // New Daf
    newDafTitle: 'דף חדש',
    dafId: 'מזהה דף',
    idHintDaf: 'למשל: 1a, 2b',
    createDaf: 'צור דף',
    errorDaf: 'שגיאה ביצירת הדף',
    selectSeder: 'בחר סדר…',
    selectTractate: 'בחר מסכת…',
    tractateLabel: 'מסכת',

    // Edit Seder
    editSederTitle: 'עריכת סדר',
    save: 'שמור',
    deleteSeder: 'מחק סדר',
    deleting: 'מוחק…',
    errorSave: 'שגיאה בשמירה',
    errorDelete: 'שגיאה במחיקה',
    confirmDelete: 'למחוק את הסדר ואת כל המסכות שבו?',
    sederNotFound: 'הסדר לא נמצא.',

    // MainPanel
    welcomeTitle: 'ניהול תלמוד ישראל',
    welcomeSubtitle: 'בחר דף מהסרגל הצדדי כדי להתחיל לערוך.',
  },
} as const;

export type T = Record<keyof typeof translations.en, string>;

export function getT(lang: Lang): T {
  return translations[lang] as T;
}
