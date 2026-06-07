export type OnekoVariantId = 'mishubu' | 'dog' | 'tora' | 'maia';

export type OnekoVariant = {
  id: OnekoVariantId;
  label: string;
  preview?: Partial<OnekoPreviewFrame>;
  src: string;
};

export type OnekoPreviewFrame = {
  scale: number;
  sheetHeight: number;
  sheetWidth: number;
  x: number;
  y: number;
};

export type OnekoState = {
  sleeping: boolean;
  variant: OnekoVariantId;
  variants: OnekoVariant[];
};

export type OnekoCtrl = {
  getState: () => OnekoState;
  nextAvatar: () => void;
  openPicker: () => void;
  setVariant: (id: OnekoVariantId) => void;
  toggleSleep: () => void;
};

export const getOnekoSrc = (id: OnekoVariantId) =>
  id === 'mishubu' ? '/oneko/oneko.gif' : `/oneko/oneko-${id}.gif`;

export const onekoPreviewFrame: OnekoPreviewFrame = {
  scale: 1,
  sheetHeight: 128,
  sheetWidth: 256,
  x: -96,
  y: -96,
};

export const onekoVariants: OnekoVariant[] = [
  {
    id: 'mishubu',
    label: 'mishubu',
    preview: { x: -96, y: -96 },
    src: getOnekoSrc('mishubu'),
  },
  {
    id: 'dog',
    label: 'Dog',
    preview: { x: -96, y: -96 },
    src: getOnekoSrc('dog'),
  },
  {
    id: 'tora',
    label: 'Tora',
    preview: { x: -96, y: -96 },
    src: getOnekoSrc('tora'),
  },
  {
    id: 'maia',
    label: 'Maia',
    preview: { x: -96, y: -96 },
    src: getOnekoSrc('maia'),
  },
];
