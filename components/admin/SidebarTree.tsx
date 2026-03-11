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

  return (
    <nav className="h-full flex flex-col py-2">
      <div className="flex-1 overflow-y-auto">
        {sedarim.length === 0 && (
          <p className="px-3 py-2 text-xs text-gray-500">{t.noSedarim}</p>
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
                  className="flex-1 flex items-center gap-1.5 text-left text-sm font-semibold text-gray-200 hover:text-white min-w-0"
                >
                  <span
                    className="text-gray-500 text-xs shrink-0 transition-transform duration-150"
                    style={{ display: 'inline-block', transform: isExpanded ? 'rotate(90deg)' : 'none' }}
                  >
                    ▶
                  </span>
                  <span className="truncate">{seder.englishName}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onViewChange({ type: 'edit-seder', sederId: seder.id })}
                  className="text-xs text-gray-600 hover:text-gray-300 px-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title={t.editSederTip}
                >
                  ✎
                </button>
                <button
                  type="button"
                  onClick={() => onViewChange({ type: 'new-tractate', sederId: seder.id })}
                  className="text-xs text-gray-600 hover:text-gray-300 px-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title={t.newTractateTip}
                >
                  +T
                </button>
              </div>

              {/* Tractates */}
              {isExpanded && (
                <div className="ml-4 border-l border-gray-700 pl-2">
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
                            className="flex-1 flex items-center gap-1.5 text-left text-xs text-gray-300 hover:text-white min-w-0"
                          >
                            <span
                              className="text-gray-600 shrink-0 transition-transform duration-150"
                              style={{ display: 'inline-block', transform: isTractateExpanded ? 'rotate(90deg)' : 'none' }}
                            >
                              ▶
                            </span>
                            <span className="truncate">{tractate.englishName}</span>
                            <span className="text-gray-600 text-xs shrink-0">({tractate.dafs.length})</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onViewChange({ type: 'new-daf', sederId: seder.id, tractateId: tractate.id })
                            }
                            className="text-xs text-gray-600 hover:text-gray-300 px-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            title={t.newDafTip}
                          >
                            +D
                          </button>
                        </div>

                        {/* Dafs */}
                        {isTractateExpanded && (
                          <div className="ml-4 flex flex-col gap-0.5 py-1">
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
                                  className={`text-left text-xs px-2 py-0.5 rounded ${
                                    active
                                      ? 'bg-blue-600 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                  }`}
                                >
                                  {daf}
                                  {active && ' ●'}
                                </button>
                              );
                            })}
                            {tractate.dafs.length === 0 && (
                              <span className="text-xs text-gray-600 px-2">{t.noDafs}</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {seder.tractates.length === 0 && (
                    <span className="text-xs text-gray-600 block px-2 py-0.5">{t.noTractates}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="px-2 pt-3 border-t border-gray-700 space-y-1 shrink-0">
        <button
          type="button"
          onClick={() => onViewChange({ type: 'new-seder' })}
          className="w-full text-left text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700"
        >
          {t.newSeder}
        </button>
        <a
          href="/admin/sources"
          className="block text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700"
        >
          {t.sources}
        </a>
      </div>
    </nav>
  );
}
