'use client';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import {
  type GlobalSearchActionId,
  type GlobalSearchGroup,
  type GlobalSearchItem,
  fallbackRecentItemIds,
  globalSearchGroups,
  globalSearchItemsById,
  portfolioEmailAddress,
  portfolioGithubUrl,
  portfolioSpotifyUrl,
} from '@/config/GlobalSearch';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    onekoController?: {
      nextAvatar: () => void;
      toggleSleep: () => void;
    };
  }
}

const recentStorageKey = 'portfolio-global-search-recents';
type PaletteGroup = {
  id: 'recent' | GlobalSearchGroup['id'];
  title: string;
  items: GlobalSearchItem[];
};

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  );
}

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [shortcutHint, setShortcutHint] = useState('Ctrl+K');
  const [recentItemIds, setRecentItemIds] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const setPaletteOpen = useCallback((nextOpen: boolean) => {
    setIsOpen(nextOpen);

    if (!nextOpen) {
      setSearchValue('');
    }
  }, []);

  useEffect(() => {
    const isMacPlatform =
      typeof navigator !== 'undefined' &&
      /Mac|iPhone|iPad|iPod/i.test(navigator.platform);

    setShortcutHint(isMacPlatform ? 'Cmd+K' : 'Ctrl+K');

    try {
      const storedRecentItemIds = window.localStorage.getItem(recentStorageKey);

      if (!storedRecentItemIds) {
        return;
      }

      const parsedRecentItemIds = JSON.parse(storedRecentItemIds);

      if (Array.isArray(parsedRecentItemIds)) {
        setRecentItemIds(
          parsedRecentItemIds.filter(
            (itemId): itemId is string => typeof itemId === 'string',
          ),
        );
      }
    } catch {
      // Ignore malformed local storage entries.
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isOpen]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const lenis = (
      window as Window & {
        lenis?: {
          start?: () => void;
          stop?: () => void;
        };
      }
    ).lenis;

    if (isOpen) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      lenis?.stop?.();
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      lenis?.start?.();
    };
  }, [isOpen]);

  const recordRecentItem = useCallback((itemId: string) => {
    setRecentItemIds((previousRecentItemIds) => {
      const nextRecentItemIds = [
        itemId,
        ...previousRecentItemIds.filter(
          (recentItemId) => recentItemId !== itemId,
        ),
      ].slice(0, 4);

      try {
        window.localStorage.setItem(
          recentStorageKey,
          JSON.stringify(nextRecentItemIds),
        );
      } catch {
        // Persisting recents is best-effort only.
      }

      return nextRecentItemIds;
    });
  }, []);

  const runAction = useCallback(
    (actionId: GlobalSearchActionId) => {
      switch (actionId) {
        case 'toggle-theme': {
          setTheme((resolvedTheme ?? 'light') === 'dark' ? 'light' : 'dark');
          return;
        }
        case 'focus-palette': {
          setPaletteOpen(true);
          window.requestAnimationFrame(() => inputRef.current?.focus());
          return;
        }
        case 'scroll-top': {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        case 'copy-email': {
          if (!portfolioEmailAddress) {
            return;
          }

          void navigator.clipboard.writeText(portfolioEmailAddress);
          return;
        }
        case 'share-page': {
          const currentUrl = window.location.href;

          if (navigator.share) {
            void navigator.share({ title: document.title, url: currentUrl });
            return;
          }

          void navigator.clipboard.writeText(currentUrl);
          return;
        }
        case 'open-github': {
          if (!portfolioGithubUrl) {
            return;
          }

          window.open(portfolioGithubUrl, '_blank', 'noopener,noreferrer');
          return;
        }
        case 'open-spotify': {
          if (!portfolioSpotifyUrl) {
            return;
          }

          window.open(portfolioSpotifyUrl, '_blank', 'noopener,noreferrer');
          return;
        }
        case 'toggle-oneko-sleep': {
          window.onekoController?.toggleSleep();
          return;
        }
        case 'change-oneko-avatar': {
          window.onekoController?.nextAvatar();
          return;
        }
      }
    },
    [resolvedTheme, setPaletteOpen, setTheme],
  );

  const handleSelect = useCallback(
    (item: GlobalSearchItem) => {
      recordRecentItem(item.id);

      if (item.actionId === 'focus-palette') {
        runAction(item.actionId);
        return;
      }

      setPaletteOpen(false);

      if (item.actionId) {
        runAction(item.actionId);
        return;
      }

      if (!item.href) {
        return;
      }

      if (item.href === pathname) {
        if (item.href === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        return;
      }

      router.push(item.href);
    },
    [pathname, recordRecentItem, router, runAction, setPaletteOpen],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const editableTarget = isEditableTarget(event.target);
      const hasSelection = Boolean(window.getSelection?.()?.toString());
      const key = event.key.toLowerCase();
      const useMeta = event.metaKey || event.ctrlKey;

      if (useMeta && key === 'k') {
        event.preventDefault();
        setPaletteOpen(!isOpen);
        return;
      }

      if (editableTarget || hasSelection) {
        return;
      }

      if (
        !event.shiftKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {
        const navigationItemIdByKey: Record<string, string> = {
          b: 'route-blog',
          g: 'route-gears',
          h: 'route-home',
          k: 'route-books',
          m: 'route-movies',
          r: 'route-resume',
          s: 'route-setup',
          t: 'feature-theme',
          w: 'route-work',
        };

        const itemId = navigationItemIdByKey[key];

        if (itemId) {
          const item = globalSearchItemsById.get(itemId);

          if (item) {
            event.preventDefault();
            handleSelect(item);
          }
        }
      }

      if (event.shiftKey && key === 'e') {
        event.preventDefault();
        runAction('copy-email');
        return;
      }

      if (event.shiftKey && key === 's') {
        event.preventDefault();
        runAction('share-page');
        return;
      }

      if (event.shiftKey && key === 'g') {
        event.preventDefault();
        runAction('open-github');
        return;
      }

      if (event.shiftKey && key === 'm') {
        event.preventDefault();
        runAction('open-spotify');
        return;
      }

      if (event.shiftKey && event.key === 'ArrowUp') {
        event.preventDefault();
        runAction('scroll-top');
        return;
      }

      if (event.ctrlKey && key === 'z') {
        event.preventDefault();
        runAction('toggle-oneko-sleep');
        return;
      }

      if (event.ctrlKey && key === 'x') {
        event.preventDefault();
        runAction('change-oneko-avatar');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelect, isOpen, runAction, setPaletteOpen]);

  const recentItems = (
    recentItemIds.length > 0 ? recentItemIds : fallbackRecentItemIds
  )
    .map((itemId) => globalSearchItemsById.get(itemId))
    .filter((item): item is GlobalSearchItem => Boolean(item));

  const paletteGroups: PaletteGroup[] =
    recentItems.length > 0
      ? [
          {
            id: 'recent',
            title: 'Recent',
            items: recentItems,
          },
          ...globalSearchGroups,
        ]
      : [...globalSearchGroups];

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setPaletteOpen(true);
        }}
        className={cn(
          'border-border/70 bg-background/80 text-muted-foreground hover:bg-accent/40 hover:text-foreground h-10 rounded-full px-3 shadow-none backdrop-blur-sm transition-all duration-300',
          'focus-visible:ring-ring/30',
        )}
        aria-label="Open search and command palette"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <Search className="size-4" />
        <span className="hidden sm:inline">Search</span>
        <span className="border-border/60 bg-muted/40 hidden rounded-full border px-1.5 py-0.5 text-[10px] font-medium tracking-wide sm:inline">
          {shortcutHint}
        </span>
      </Button>

      <CommandDialog
        open={isOpen}
        onOpenChange={setPaletteOpen}
        showCloseButton={false}
        overlayClassName="bg-black/40"
        className={cn(
          'max-w-[calc(100vw-1rem)] overflow-hidden rounded-[16px] border border-white/8 bg-[#171717] p-0 shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:max-w-[482px]',
        )}
      >
        <div className="border-b border-white/8 px-3 pt-3">
          <CommandInput
            ref={inputRef}
            value={searchValue}
            onValueChange={setSearchValue}
            placeholder="Type a command or search..."
          />
          <div className="flex items-center gap-2 px-1 pt-2 pb-3 text-[11px] text-zinc-500">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.45)]" />
            <span>Typing mode active</span>
          </div>
        </div>

        <CommandList
          className="scrollbar-hidden max-h-[52vh] overscroll-contain px-1.5 pt-1.5 pb-1.5"
          onWheelCapture={(event) => event.stopPropagation()}
        >
          <CommandEmpty>No matches found.</CommandEmpty>

          {paletteGroups.map((group, groupIndex) => (
            <React.Fragment key={group.id}>
              <CommandGroup heading={group.title} className="px-0 py-0">
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.label}
                    keywords={item.keywords}
                    onSelect={() => handleSelect(item)}
                    className="mb-0.5 rounded-[12px]"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg text-zinc-300">
                      <item.icon className="size-4" />
                    </span>

                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="truncate text-[13px] leading-tight font-semibold text-zinc-100">
                        {item.label}
                      </span>
                      <span className="line-clamp-1 text-[11px] leading-tight text-zinc-400">
                        {item.description}
                      </span>
                    </span>

                    {item.shortcut ? (
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>

              {groupIndex < paletteGroups.length - 1 ? (
                <CommandSeparator />
              ) : null}
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
