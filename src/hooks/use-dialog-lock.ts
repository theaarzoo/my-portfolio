'use client';

import { useEffect } from 'react';

export function useDialogLock(open: boolean) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    const lenis = (
      window as Window & {
        lenis?: {
          start?: () => void;
          stop?: () => void;
        };
      }
    ).lenis;

    if (open) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      lenis?.stop?.();
    }

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      lenis?.start?.();
    };
  }, [open]);
}
