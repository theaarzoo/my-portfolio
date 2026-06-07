export type OnekoVariantId = 'classic' | 'dog' | 'tora' | 'maia';

export type OnekoVariant = {
  id: OnekoVariantId;
  label: string;
  src: string;
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
  id === 'classic' ? '/oneko/oneko.gif' : `/oneko/oneko-${id}.gif`;

export const onekoVariants: OnekoVariant[] = [
  { id: 'classic', label: 'Classic', src: getOnekoSrc('classic') },
  { id: 'dog', label: 'Dog', src: getOnekoSrc('dog') },
  { id: 'tora', label: 'Tora', src: getOnekoSrc('tora') },
  { id: 'maia', label: 'Maia', src: getOnekoSrc('maia') },
];
