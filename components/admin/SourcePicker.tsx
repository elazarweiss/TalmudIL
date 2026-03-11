'use client';

import { useState, useRef, useEffect } from 'react';
import type { Source } from '@/types/daf';

interface SourcePickerProps {
  sourceId?: string;
  onChange: (sourceId: string | undefined) => void;
}

export default function SourcePicker({ sourceId, onChange }: SourcePickerProps) {
  const [open, setOpen] = useState(false);
  const [sources, setSources] = useState<Source[] | null>(null);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy-fetch sources on first open
  useEffect(() => {
    if (open && sources === null) {
      setLoading(true);
      fetch('/api/admin/sources')
        .then((r) => r.json())
        .then((data: Source[]) => {
          setSources(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [open, sources]);

  // Click-outside handler
  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const filtered = sources
    ? sources.filter((s) =>
        filter === '' ||
        s.title.toLowerCase().includes(filter.toLowerCase()) ||
        s.author.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  const linked = sources?.find((s) => s.id === sourceId);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Source</span>
        {linked ? (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-0.5">
            {linked.title}
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="ml-1 text-blue-400 hover:text-blue-700 leading-none"
              aria-label="Unlink source"
            >
              ×
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-xs text-blue-600 hover:underline"
          >
            + Link source
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 w-72 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2 border-b border-gray-100">
            <input
              autoFocus
              className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Filter sources…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <ul className="max-h-48 overflow-y-auto">
            {loading && (
              <li className="px-3 py-2 text-xs text-gray-400">Loading…</li>
            )}
            {!loading && filtered.length === 0 && (
              <li className="px-3 py-2 text-xs text-gray-400">No sources found</li>
            )}
            {filtered.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(s.id);
                    setOpen(false);
                    setFilter('');
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50"
                >
                  <span className="font-medium">{s.title}</span>
                  <span className="text-gray-400 ml-1">— {s.author}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
