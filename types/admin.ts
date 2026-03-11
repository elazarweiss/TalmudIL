export type ViewState =
  | { type: 'welcome' }
  | { type: 'daf'; seder: string; tractate: string; daf: string }
  | { type: 'new-daf'; sederId?: string; tractateId?: string }
  | { type: 'new-seder' }
  | { type: 'new-tractate'; sederId: string }
  | { type: 'edit-seder'; sederId: string };
