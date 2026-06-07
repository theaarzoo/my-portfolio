'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { catConfig } from '@/config/Cat';
import { type OnekoCtrl, onekoVariants } from '@/config/Oneko';
import { useDialogLock } from '@/hooks/use-dialog-lock';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Script from 'next/script';
import React, { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    onekoController?: OnekoCtrl;
  }
}

export default function OnekoCat() {
  if (!catConfig.enabled) {
    return null;
  }

  return <OnekoCatInner />;
}

function OnekoCatInner() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(onekoVariants[0]?.id ?? 'classic');
  const [items, setItems] = useState(onekoVariants);

  useDialogLock(open);

  const sync = useCallback(() => {
    const state = window.onekoController?.getState();

    if (!state) {
      return;
    }

    setActive(state.variant);
    setItems(state.variants.length > 0 ? state.variants : onekoVariants);
  }, []);

  useEffect(() => {
    const onState = (event: Event) => {
      const detail = (
        event as CustomEvent<{
          sleeping: boolean;
          variant: string;
          variants: typeof onekoVariants;
        }>
      ).detail;

      if (!detail) {
        sync();
        return;
      }

      setActive(detail.variant as (typeof onekoVariants)[number]['id']);
      setItems(detail.variants?.length ? detail.variants : onekoVariants);
    };

    const onOpen = () => {
      sync();
      setOpen(true);
    };

    window.addEventListener('oneko:state', onState as EventListener);
    window.addEventListener('oneko:open-picker', onOpen);
    sync();

    return () => {
      window.removeEventListener('oneko:state', onState as EventListener);
      window.removeEventListener('oneko:open-picker', onOpen);
    };
  }, [sync]);

  return (
    <>
      <Script
        id="oneko-script"
        src="/oneko/oneko.js"
        strategy="afterInteractive"
        data-variants={JSON.stringify(onekoVariants)}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader className="sr-only">
          <DialogTitle>Choose Neko</DialogTitle>
        </DialogHeader>

        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/40"
          className="max-w-[calc(100vw-1rem)] overflow-hidden rounded-[16px] border border-white/8 bg-[#171717] p-0 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:max-w-[360px]"
        >
          <div className="border-b border-white/8 px-4 pt-4 pb-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-[13px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                  Choose Neko
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Pick the cat variant to follow your cursor.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-9 items-center justify-center rounded-full border border-white/8 bg-white/[0.04] text-zinc-400 transition hover:bg-white/[0.08] hover:text-zinc-100"
                aria-label="Close neko picker"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                title={item.label}
                onClick={() => {
                  window.onekoController?.setVariant(item.id);
                  setOpen(false);
                }}
                className={cn(
                  'group rounded-[14px] border border-white/8 bg-[#202020] p-3 text-left transition hover:border-white/14 hover:bg-white/[0.05]',
                  active === item.id &&
                    'border-white/18 bg-white/[0.07] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]',
                )}
                aria-label={`Choose ${item.label} neko`}
              >
                <span
                  className="mx-auto block size-16 bg-contain bg-center bg-no-repeat transition duration-200 [image-rendering:pixelated] group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.src})` }}
                  aria-hidden="true"
                />
                <span className="mt-3 block truncate text-center text-xs font-medium text-zinc-300">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
