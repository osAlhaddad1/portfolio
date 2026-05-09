const STORAGE_KEY = 'ilithya-theme';

const toAttributeValue = (themeKey) => (themeKey === 'blue' ? '' : themeKey);
const toThemeKey = (attributeValue) => (attributeValue === '' ? 'blue' : attributeValue);

export function restoreTheme() {
  const attr = localStorage.getItem(STORAGE_KEY) ?? '';
  document.body.setAttribute('data-theme', attr);
  return toThemeKey(attr);
}

export function getActiveThemeKey() {
  const attr = localStorage.getItem(STORAGE_KEY) ?? '';
  return toThemeKey(attr);
}

export function applyThemeByKey(themeKey) {
  const attr = toAttributeValue(themeKey);
  document.body.setAttribute('data-theme', attr);
  localStorage.setItem(STORAGE_KEY, attr);
  return toThemeKey(attr);
}

