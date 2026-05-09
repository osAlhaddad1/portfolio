# Schemas

**Purpose:** Request / response shapes (DTOs).

**No HTTP API exists**, so there are no request/response schemas. The shapes below are the **internal data shapes** used by the frontend; they would be the natural starting point if these were ever exposed over an API.

## `Project` — `services/content/projects-service.js`

```ts
type Project = {
  slug: string;            // URL-safe identifier (e.g., 'webgi-jewelry')
  title: string;
  type: string;            // e.g., 'Personal Project'
  category: string;        // e.g., 'WebGL', 'Backend'
  thumb: string;           // CSS gradient string, used as a tile background
  images: { bg: string; h: number }[];   // bg = CSS gradient, h = pixel height
  meta: { label: string; value: string }[];
  description: (string | { type: 'pre'; content: string })[];  // mixed paragraphs + preformatted blocks
};
```

## `GuestbookEntry` (sample data only) — `pages/guestbook/guestbook-page.js`

```ts
type GuestbookEntry = {
  n: number;        // entry number
  date: string;     // free-text date label, e.g., 'apr 18, 2026'
  msg: string;
  mood: string;     // emoji
  alias: string;
  link: string;     // possibly empty
  bg: string;       // hex
  fg: string;       // hex
};
```

## `JournalEntry` — `pages/writing-page.js`

```ts
type JournalEntry = {
  date: string;            // free-text label, e.g., 'Jan 2019 - age 15'
  paragraphs: string[];
};
```

## Theme key

Persisted in `localStorage['osami-theme']` and reflected on `body[data-theme]`. The empty string represents the default (blue).

```ts
type ThemeKey = 'blue' | 'purple' | 'hotpink' | 'black';
type ThemeAttr = '' | 'purple' | 'hotpink' | 'black';   // 'blue' is encoded as ''
```
