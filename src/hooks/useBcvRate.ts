import { useState, useEffect, useCallback } from 'react';

interface BcvState {
  rate: number | null;
  updatedAt: string | null;
  isLoading: boolean;
}

const STORAGE_KEY = 'crunch_bcv_rate_cache_v1';

export function useBcvRate() {
  const [state, setState] = useState<BcvState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { rate?: number; updatedAt?: string | null };
        if (typeof parsed.rate === 'number' && parsed.rate > 0) {
          return {
            rate: parsed.rate,
            updatedAt: parsed.updatedAt ?? null,
            isLoading: false,
          };
        }
      }
    } catch {
      // Ignore storage errors
    }
    return { rate: null, updatedAt: null, isLoading: true };
  });

  const fetchRate = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('HTTP error');
      const data = (await res.json()) as {
        promedio?: number;
        fechaActualizacion?: string;
      };

      if (typeof data.promedio === 'number' && data.promedio > 0) {
        const next = {
          rate: data.promedio,
          updatedAt: data.fechaActualizacion ?? null,
          isLoading: false,
        };
        setState(next);
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ rate: next.rate, updatedAt: next.updatedAt })
          );
        } catch {
          // Ignore storage quota errors
        }
        return;
      }
      throw new Error('Invalid payload');
    } catch {
      // Secondary endpoint on the same official feed
      try {
        const res2 = await fetch('https://ve.dolarapi.com/v1/dolares', {
          cache: 'no-store',
        });
        if (res2.ok) {
          const list = (await res2.json()) as Array<{
            fuente?: string;
            promedio?: number;
            fechaActualizacion?: string;
          }>;
          const oficial = list.find((item) => item.fuente === 'oficial');
          if (oficial && typeof oficial.promedio === 'number' && oficial.promedio > 0) {
            const next = {
              rate: oficial.promedio,
              updatedAt: oficial.fechaActualizacion ?? null,
              isLoading: false,
            };
            setState(next);
            try {
              localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ rate: next.rate, updatedAt: next.updatedAt })
              );
            } catch {
              // Ignore storage errors
            }
            return;
          }
        }
      } catch {
        // Keep cached rate if network fails
      }
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    fetchRate();
    const intervalId = window.setInterval(fetchRate, 15 * 60 * 1000);
    return () => window.clearInterval(intervalId);
  }, [fetchRate]);

  return {
    rate: state.rate,
    updatedAt: state.updatedAt,
    isLoading: state.isLoading,
    refreshRate: fetchRate,
  };
}

export function formatBs(usdAmount: number, rate: number | null): string {
  if (!rate || !Number.isFinite(rate)) {
    return 'Bs. —';
  }
  const bs = usdAmount * rate;
  return `Bs. ${bs.toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatBcvRate(rate: number | null): string {
  if (!rate || !Number.isFinite(rate)) {
    return '—';
  }
  return rate.toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
