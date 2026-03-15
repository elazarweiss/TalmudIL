'use client';

import { useState } from 'react';
import type { Seder } from '@/types/daf';
import type { ViewState } from '@/types/admin';
import type { Lang } from '@/lib/admin-i18n';
import { getT } from '@/lib/admin-i18n';

interface SidebarTreeProps {
  sedarim: Seder[];
  view: ViewState;
  onViewChange: (v: ViewState) => void;
  lang: Lang;
}

export default function SidebarTree({ sedarim, view, onViewChange, lang }: SidebarTreeProps) {
  const t = getT(lang);
  const [expandedSedarim, setExpandedSedarim] = useState<Set<string>>(new Set());
  const [expandedTractates, setExpandedTractates] = useState<Set<string>>(new Set());

  function toggleSeder(id: string) {
    setExpandedSedarim((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleTractate(key: string) {
    setExpandedTractates((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function isActiveDaf(seder: string, tractate: string, daf: string) {
    return (
      view.type === 'daf' &&
      view.seder === seder &&
      view.tractate === tractate &&
      view.daf === daf
    );
  }

  const displayName = (he: string, en: string) => (lang === 'he' ? he : en);

  return (
    <nav className="h-full flex flex-col py-2">
      <div className="flex-1 overflow-y-auto">
        {sedarim.length === 0 && (
          <p className="px-3 py-2 text-xs text-parchment-300/60 font-sans">{t.noSedarim}</p>
        )}
        {sedarim.map((seder) => {
          const isExpanded = expandedSedarim.has(seder.id);
          return (
            <div key={seder.id}>
              {/* Seder row */}
              <div className="flex items-center gap-1 px-2 py-1 group">
                <button
                  type="button"
                  onClick={() => toggleSeder(seder.id)}
                  className="flex-1 flex items-center gap-1.5 text-right font-serif font-bold text-sm text-parchment-200 hover:text-parchment-100 min-w-0"
                >
                  <span
                    className="text-parchment-300/50 text-xs shrink-0 transition-transform duration-150"
                    style={{ display: 'inline-block', transform: isExpanded ? 'rotate(90deg)' : 'none' }}
                  >
                    ▶
                  </span>
                  <span className="truncate">{displayName(seder.hebrewName, seder.englishName)}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onViewChange({ type: 'edit-seder', sederId: seder.id })}
                  className="text-xs text-parchment-300/40 hover:text-parchment-200 w-5 h-5 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 hover:bg-parchment-300/10 transition-all"
                  title={t.editSederTip}
                >
                  ✎
                </button>
                <button
                  type="button"
                  onClick={() => onViewChange({ type: 'new-tractate', sederId: seder.id })}
                  className="font-sans text-xs text-parchment-300/40 hover:text-parchment-200 w-5 h-5 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 hover:bg-parchment-300/10 transition-all"
                  title={t.newTractateTip}
                >
                  +
                </button>
              </div>

              {/* Tractates */}
              {isExpanded && (
                <div className="mr-4 border-r border-parchment-300/20 pr-2">
                  {seder.tractates.map((tractate) => {
                    const tractateKey = `${seder.id}/${tractate.id}`;
                    const isTractateExpanded = expandedTractates.has(tractateKey);
                    return (
                      <div key={tractate.id}>
                        {/* Tractate row */}
                        <div className="flex items-center gap-1 py-0.5 group">
                          <button
                            type="button"
                            onClick={() => toggleTractate(tractateKey)}
                            className="flex-1 flex items-center gap-1.5 text-right font-serif text-xs text-parchment-300 hover:text-parchment-100 min-w-0"
                          >
                            <span
                              className="text-parchment-300/40 shrink-0 transition-transform duration-150"
                              style={{ display: 'inline-block', transform: isTractateExpanded ? 'rotate(90deg)' : 'none' }}
                            >
                              ▶
                            </span>
                            <span className="truncate">{displayName(tractate.hebrewName, tractate.englishName)}</span>
                            <span className="font-sans text-parchment-300/40 text-xs shrink-0">({tractate.dafs.length})</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onViewChange({ type: 'new-daf', sederId: seder.id, tractateId: tractate.id })
                            }
                            className="font-sans text-xs text-parchment-300/40 hover:text-parchment-200 w-5 h-5 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 hover:bg-parchment-300/10 transition-all"
                            title={t.newDafTip}
                          >
                            +
                          </button>
                        </div>

                        {/* Dafs */}
                        {isTractateExpanded && (
                          <div className="mr-4 flex flex-col gap-0.5 py-1">
                            {tractate.dafs.map((daf) => {
                              const active = isActiveDaf(seder.id, tractate.id, daf);
                              return (
                                <button
                                  key={daf}
                                  type="button"
                                  onClick={() =>
                                    onViewChange({
                                      type: 'daf',
                                      seder: seder.id,
                                      tractate: tractate.id,
                                      daf,
                                    })
                                  }
                                  className={`font-sans text-right text-xs px-2 py-0.5 rounded transition-colors ${
                                    active
                                      ? 'bg-mishnah text-parchment-100'
                                      : 'text-parchment-300/70 hover:text-parchment-100 hover:bg-parchment-300/10'
                                  }`}
                                >
                                  {daf}
                                </button>
                              );
                            })}
                            {tractate.dafs.length === 0 && (
                              <span className="font-sans text-xs text-parchment-300/40 px-2">{t.noDafs}</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {seder.tractates.length === 0 && (
                    <span className="font-sans text-xs text-parchment-300/40 block px-2 py-0.5">{t.noTractates}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="px-2 pt-3 border-t border-parchment-300/20 space-y-1 shrink-0">
        <button
          type="button"
          onClick={() => onViewChange({ type: 'new-seder' })}
          className="font-sans w-full text-right text-xs text-parchment-300/70 hover:text-parchment-100 px-2 py-1 rounded hover:bg-parchment-300/10 transition-colors"
        >
          {t.newSeder}
        </button>
        <a
          href="/admin/sources"
          className="font-sans block text-xs text-parchment-300/70 hover:text-parchment-100 px-2 py-1 rounded hover:bg-parchment-300/10 transition-colors"
        >
          {t.sources}
        </a>
      </div>
    </nav>
  );
}
