# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Temikoods — a static e-commerce site for a Nigerian handcrafted ankara-bag brand. Pure HTML/CSS/JS, no build step, no framework, no package.json. Deployable to any static host.

## Run locally

```bash
npx http-server -p 3456
# then open http://localhost:3456
```

There is no build, lint, or test tooling in this repo — changes are verified by loading pages directly in a browser.

## Deploy

Any static host works as-is. For Vercel: `vercel` from this folder (no config needed).

## Architecture

- **`products.js`** is the single source of truth for the catalog: the `PRODUCTS` array, `WHATSAPP_NUMBER`, `CATEGORY_LABELS`, and the `formatNaira()` helper. Every page (`index.html`, `shop.html`, `product.html`, `about.html`) loads `products.js` before `app.js`.
- **`app.js`** holds all shared behavior: cart state (persisted to `localStorage` under key `temikoods_cart_v1`), the cart drawer UI, `productCardHTML()` (renders a product card), `renderProductGrid()`, WhatsApp checkout message building, toasts, nav toggle, and scroll-reveal (`IntersectionObserver` on `.reveal` elements). This is loaded on every page and wires itself up on `DOMContentLoaded`.
- **No routing/build**: `product.html` reads `?id=<product-id>` from the query string via an inline `<script>` block at the bottom of the file, looks it up in `PRODUCTS`, and renders the detail markup directly into `#pd-root`. `shop.html` similarly uses an inline `<script>` to read `#backpacks` / `#work` / `#travel` from `location.hash` and filter the grid client-side (`.chip[data-filter]` buttons).
- **Checkout has no backend or payment gateway**: `checkoutWhatsApp()` in `app.js` builds a pre-filled order message from cart contents and opens `https://wa.me/<WHATSAPP_NUMBER>?text=...`. Order confirmation and payment happen manually in WhatsApp chat.
- **Styling**: single `styles.css` for the whole site — no CSS modules/preprocessor. Uses CSS custom properties for theme colors/fonts.
- **Images**: flat `images/` directory, referenced by relative path (e.g. `images/bag-0030.jpg`) from each product's `img` field in `products.js`.

## Adding a product

1. Drop the photo into `images/`.
2. Add an entry to the `PRODUCTS` array in `products.js` (copy an existing entry's shape — `id`, `name`, `category`, `price`, `oldPrice`, `img`, `badge`, `stock`, `tagline`, `description`, `details[]`). `id` must be unique and URL-safe (used as `product.html?id=<id>`).
3. Add a `<url>` entry for `product.html?id=<id>` to `sitemap.xml` — this is the one place that doesn't pick up new products automatically.
4. Otherwise that's it — shop grid, product detail page, related-items, and cart all pick it up automatically since they all read from `PRODUCTS`.

`category` must be one of the keys in `CATEGORY_LABELS` (`backpacks`, `work`, `travel`) or it won't get a label/filter chip.

## Known placeholders to watch for

These are launch-blocking placeholders already flagged in `README.md` — don't treat them as bugs to silently "fix" without confirming with the user, but do flag if asked to review/ship:

- `WHATSAPP_NUMBER` in `products.js` is `"2348000000000"` — a placeholder. It's also hardcoded separately as `wa.me/2348000000000` footer links in each HTML file (not derived from `products.js`), so both places need updating together.
- Footer email/Instagram (`hello@temikoods.com`, `@temikoods`) are placeholders in each HTML file's footer.
- Per-product `price`, `oldPrice`, and `stock` in `products.js` are illustrative and need real values before launch.
- `https://temikoods.com` used in the Open Graph/Twitter meta tags (every page's `<head>`), `robots.txt`, and `sitemap.xml` is a placeholder domain — swap for the real production URL once hosting is finalized.
- `product.html`'s OG/Twitter tags are static/generic (same card for every product) because the page renders per-product content via client-side JS, which link-preview crawlers don't execute. Fixing this properly needs server-side rendering or prerendered per-product HTML — out of scope for the current no-build static setup.
