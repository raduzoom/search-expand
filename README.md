## Search Expand - pr1

Compact, animated search input that expands on focus/hover. Ships as a Web Component and a class-based API, with dynamic skin loading and CSS variables for flexible theming.

- **Package**: `search-expand`
- **Builds**: ESM/CJS via `dist/index.js`, UMD via `dist-webpack/search-expand.js`
- **Homepage**: `https://digitalzoomstudio.net`

### Features
- **Two usage modes**: programmatic API or `<dzs-search-expand>` web component
- **Skins**: `default`, `flat`, `default-dark`, `flat-dark` with dynamic loading
- **CSS variables** for quick theming
- **TypeScript types** included


form:
![skin-default](https://private-user-images.githubusercontent.com/58981243/491676373-d99d0dde-f857-41a5-845c-f23750b0cf12.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTgyOTY1NjgsIm5iZiI6MTc1ODI5NjI2OCwicGF0aCI6Ii81ODk4MTI0My80OTE2NzYzNzMtZDk5ZDBkZGUtZjg1Ny00MWE1LTg0NWMtZjIzNzUwYjBjZjEyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA5MTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwOTE5VDE1Mzc0OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTUyZDIyOGIxMzJjZmRmZmVhZDgyYmRmMDc4NmZkOTViYzNjYjM4ZjI1M2M2YmZmMGUzNzJmNTdmOGEwZWQzMmImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.qyW6W6cQf9LXJwsw6zE0nU6rd_qMHktfx1JZkxVql7o "Search expand")

expanded:
![skin-default](https://private-user-images.githubusercontent.com/58981243/491676470-06cce1cb-a9c1-4484-8ca0-c665c72e5ce0.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTgyOTY2MDAsIm5iZiI6MTc1ODI5NjMwMCwicGF0aCI6Ii81ODk4MTI0My80OTE2NzY0NzAtMDZjY2UxY2ItYTljMS00NDg0LThjYTAtYzY2NWM3MmU1Y2UwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA5MTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwOTE5VDE1MzgyMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWU4MWQ2Y2E3YzA2ZGNkMDA0NmJiMDgxNWNhZjNmZTU1MWU1YWFhN2U4NjM2MjEwMDg1M2I1ZTYxZTk1OThmZmImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.1rMI4VKH9eZrWjWX7tZMsqgXyQmyHW9In2AcOCro0j8 "Search expand - expanded")

## Installation
```bash
npm install search-expand
```

## Quick start

### 1) Programmatic (TypeScript/JavaScript)
```ts
import { initSearchExpand } from 'search-expand';

const host = document.getElementById('search-host') as HTMLElement;
const instance = initSearchExpand(host, {
  viewSkin: 'default',
  inputPlaceholderText: 'Filter results...',
  persistentOptions: [
    { htmlContent: 'Apple', value: 'apple', currentStatus: 'unchecked' },
    { htmlContent: 'Orange', value: 'orange', currentStatus: 'checked' },
  ],
  onSubmitSearch: (q) => console.log('Submit:', q),
});

// Note: include base CSS in your page
// <link rel="stylesheet" href="/dist-webpack/dzs-search-expand.css" />
```

### 2) Web Component
```html
<!-- Include UMD or initialize web components in your app code -->
<dzs-search-expand
  data-skin="default"
  data-persistentOptions='[
    {"htmlContent":"Apple","value":"apple","currentStatus":"unchecked"},
    {"htmlContent":"Orange","value":"orange","currentStatus":"checked"}
  ]'>
</dzs-search-expand>

<script>
  // Optional: change skin dynamically
  // const el = document.querySelector('dzs-search-expand');
  // el.setSkin('flat-dark');
</script>
```

Initialize custom element (only once per page) if you import modules directly:
```ts
import { initWebComponents, configureSkinLoading } from 'search-expand';
configureSkinLoading({ basePath: '/dist/style/skins/' });
initWebComponents();
```

### 3) UMD (Browser)
```html
<script src="dist-webpack/search-expand.js"></script>
<script>
  // Optional: configure skin path
  SearchExpand.configureSkinLoading({ basePath: '/dist/style/skins/' });

  const host = document.getElementById('search-host');
  const instance = SearchExpand.initSearchExpand(host, { viewSkin: 'default' });
  // instance.setSkin('flat');

  // Or use the web component
  SearchExpand.initWebComponents();
</script>
```

## Options
Type: `SearchExpandOptions`

- `placeholderNoItemsFound?`: string – Text when filtering yields no results
- `inputPlaceholderText?`: string – Placeholder for the input
- `middlewareFilterResults?`: any – Hook to post-process filtered results
- `viewSkin?`: string – One of `default | flat | default-dark | flat-dark`
- `viewIsWrapping?`: boolean – Control layout wrapping
- `persistentOptions?`: `ChipSelectorItem[]` – Seed options
- `onUpdateFunction?`: `(items: ChipSelectorItem[]) => any` – Called on updates
- `onSubmitSearch?`: `(query: string) => void | Promise<void>` – Called on icon click or Enter

Types are exported from `search-expand`: `SearchExpandOptions`, `ChipSelectorItem`, `currentStatusType`.

## Skins and styling

### Available skins
- `default`, `flat`, `default-dark`, `flat-dark`

Skin CSS files live under `dist/style/skins/`. If you use skins, call `configureSkinLoading({ basePath: '/dist/style/skins/' })` so the runtime can lazy-load the CSS.

### CSS variables
Tweak visuals via CSS custom properties:
```css
:root {
  --search-expand-icon-size: 24px;
  --search-expand-wrapper-padding: 8px;
  --search-expand-input-font-size: 14px;
  --search-expand-color-icon: #fff;
  --search-expand-color-icon-hover: #dadada;
  --search-expand-color-wrapper-bg: #222;
  --search-expand-color-wrapper-bg-hover: var(--search-expand-color-wrapper-bg);
  --search-expand-color-text: #fff;
  --search-expand-expand-w: 180px;
}
```
See `FLEXIBLE_STYLING.md` for more strategies.

## Development
```bash
# install deps
npm install

# dev build (watch)
npm run dev

# run tests
npm test

# production build (webpack + types + rollup)
npm run build
```

Useful demo pages:
- `src/demo.html`
- `src/usage-examples.html`
- `src/dynamic-skin-example.html`

## License
MIT OR Apache-2.0. See `LICENSE.txt`.

## Links
- Repo: `https://github.com/raduzoom/search-expand`
- Issues: `https://github.com/raduzoom/search-expand/issues`


