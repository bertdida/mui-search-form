import useMediaQuery from '@mui/material/useMediaQuery';

export default function useMaxItems() {
  // Total number of chips per screen sizes.
  const map = new Map([
    [5, useMediaQuery('(min-width: 1440px)')],
    [3, useMediaQuery('(min-width: 1024px)')],
    [2, useMediaQuery('(min-width: 768px)')],
    [1, useMediaQuery('(min-width: 570px)')],
    [0, useMediaQuery('(min-width: 0)')],
  ]);

  const keys = Array.from(map.keys());
  return keys.find((key: number) => map.get(key)) || 0;
}
