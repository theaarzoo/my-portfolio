'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { catConfig } from '@/config/Cat';
import {
  type OnekoCtrl,
  onekoPreviewFrame,
  onekoVariants,
} from '@/config/Oneko';
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
  const [active, setActive] = useState(onekoVariants[0]?.id ?? 'mishubu');
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
          className="w-auto max-w-[calc(100vw-1rem)] overflow-hidden rounded-[12px] border border-white/8 bg-[#171717] p-0 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:max-w-[250px]"
        >
          <div className="px-4 pt-5 pb-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Choose Neko
                </h2>
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

          <div className="grid grid-cols-4 gap-x-3 gap-y-4 px-4 pt-2 pb-5">
            {items.map((item) => {
              const frame = {
                ...onekoPreviewFrame,
                ...item.preview,
              };

              return (
                <Tooltip key={item.id} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => {
                        window.onekoController?.setVariant(item.id);
                        setOpen(false);
                      }}
                      className={cn(
                        'group flex size-11 items-center justify-center rounded-[8px] bg-transparent transition hover:bg-white/[0.06]',
                        active === item.id && 'bg-white/[0.08]',
                      )}
                      aria-label={`Choose ${item.label} neko`}
                    >
                      <span
                        className="flex size-8 items-center justify-center overflow-hidden"
                        aria-hidden="true"
                      >
                        <span
                          className="block size-full bg-no-repeat transition duration-200 [image-rendering:pixelated] group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${item.src})`,
                            backgroundPosition: `${frame.x * frame.scale}px ${frame.y * frame.scale}px`,
                            backgroundSize: `${frame.sheetWidth * frame.scale}px ${frame.sheetHeight * frame.scale}px`,
                          }}
                        />
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={8}
                    className="bg-white px-3 py-1.5 text-sm font-medium text-zinc-950 shadow-lg [&_svg]:fill-white"
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
