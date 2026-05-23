// ============================================================
// Завдання 6 — Парсер кольорів
// ============================================================

const NAMED_COLORS = {
  red:   { r: 255, g: 0,   b: 0 },
  green: { r: 0,   g: 128, b: 0 },
  blue:  { r: 0,   g: 0,   b: 255 },
  white: { r: 255, g: 255, b: 255 },
  black: { r: 0,   g: 0,   b: 0 },
};

/**
 * Парсить колір у одному з форматів:
 *
 *   #FF8800              → { r: 255, g: 136, b: 0 }
 *   #f80                 → { r: 255, g: 136, b: 0 }  (короткий hex)
 *   rgb(255, 136, 0)     → { r: 255, g: 136, b: 0 }
 *   rgb(255,136,0)       → те саме (без пробілів)
 *   red                  → { r: 255, g: 0, b: 0 }     (named)
 *   "invalid", ""        → null
 *
 * Поверніть null для invalid input.
 */
function parseColor(str) {
  // TODO

  const cleanStr = str.trim().toLowerCase();

  if (cleanStr.startsWith('#')) {
    const hex = cleanStr.slice(1);

    if (hex.length === 6) {
      const r = parseInt(hex.slice(0,2), 16);
      const g = parseInt(hex.slice(2,4), 16);
      const b = parseInt(hex.slice(4,6), 16);

      if (isNaN(r) || isNaN(g) || isNaN(b)) {
        return null;
      }

      return {r, g, b};
    }

    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      
      if (isNaN(r) || isNaN(g) || isNaN(b)) {
        return null;
      }

      return {r, g, b};
    }

    return null;
  }

  if (cleanStr.startsWith('rgb(')) {
    return rgbparse(cleanStr);
  }

  if (NAMED_COLORS[cleanStr]) {
    return NAMED_COLORS[cleanStr];
  }

  return null;
}

function rgbparse(str) {
  const cleanStr = str.replaceAll(' ', '');
  const rgbNum = cleanStr.slice(4, -1).split(',');

  if (!cleanStr.startsWith('rgb(') || !cleanStr.endsWith(')')) {
    return null;
  }

  if (rgbNum.length !== 3) {
    return null;
  }

   const r = parseInt(rgbNum[0], 10);
   const g = parseInt(rgbNum[1], 10);
   const b = parseInt(rgbNum[2], 10);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }

   return {r, g, b};
}


// ============================================================
// Тестові кейси
// ============================================================
console.log(parseColor("#FF8800"));            // { r: 255, g: 136, b: 0 }
console.log(parseColor("#f80"));               // { r: 255, g: 136, b: 0 }
console.log(parseColor("rgb(255, 136, 0)"));   // { r: 255, g: 136, b: 0 }
console.log(parseColor("rgb(255,136,0)"));     // { r: 255, g: 136, b: 0 }
console.log(parseColor("red"));                // { r: 255, g: 0, b: 0 }
console.log(parseColor("invalid"));            // null
console.log(parseColor(""));                   // null
console.log(parseColor("#GGG"));               // null