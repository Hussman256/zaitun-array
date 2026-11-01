# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Zaitun-Array — an e-commerce site for a Nigerian handcrafted ankara-bag brand. Static HTML/CSS/JS front end (no build step, no framework) plus a single Vercel serverless function (`api/verify-payment.js`) that verifies Flutterwave payments server-side.

## Build log

`MEMORY.md` is the project's running log: decisions made, changes shipped, and open to-dos. Read it at the start of a session. After any meaningful change, add a dated entry at the top of its Log section and update its Open items.

## Run locally

Static pages only (no payment testing):

```bash
npx http-server -p 3456
# then open http://localhost:3456
```

To exercise the `/api/verify-payment` endpoint too, use the Vercel CLI instead: `vercel dev`. There is no lint or test tooling in this repo — changes are verified by loading pages directly in a browser.

## Deploy

Deploy to Vercel (`vercel` from this folder) — it auto-detects the `api/` folder as serverless functions and serves everything else as static files, no `vercel.json` needed. Set `FLW_SECRET_KEY` in the Vercel project's environment variables before testing real payments; it must never be committed. A plain static host (Netlify, GitHub Pages) still works for every page except on-site payment, since that path depends on `api/verify-payment.js` running somewhere.

## Architecture

- **`products.js`** is the single source of truth for the catalog: the `PRODUCTS` array, `WHATSAPP_NUMBER`, `CATEGORY_LABELS`, and the `formatNaira()` helper. Every page (`index.html`, `shop.html`, `product.html`, `about.html`) loads `products.js` before `app.js`.
- **`app.js`** holds all shared behavior: cart state (persisted to `localStorage` under key `zaitun_array_cart_v1`), the cart drawer UI, `productCardHTML()` (renders a product card), `renderProductGrid()`, WhatsApp checkout message building, toasts, nav toggle, and scroll-reveal (`IntersectionObserver` on `.reveal` elements). This is loaded on every page and wires itself up on `DOMContentLoaded`.
- **No routing/build**: `product.html` reads `?id=<product-id>` from the query string via an inline `<script>` block at the bottom of the file, looks it up in `PRODUCTS`, and renders the detail markup directly into `#pd-root`. `shop.html` similarly uses an inline `<script>` to read `#totes` / `#backpacks` / `#sets` from `location.hash` (the allowed list is hardcoded twice in that script, alongside the `.chip` buttons) and filter the grid client-side (`.chip[data-filter]` buttons).
- **Checkout has two paths, both in the cart drawer** (`app.js`): `checkoutWhatsApp()` builds a pre-filled order message from cart contents and opens `https://wa.me/<WHATSAPP_NUMBER>?text=...` (payment confirmed manually in chat); `payOnline()` collects name/email/phone, opens Flutterwave's inline checkout (`FlutterwaveCheckout(...)`, loaded via the `checkout.flutterwave.com/v3.js` script tag on every page), then on the client-side "successful" callback POSTs to `/api/verify-payment` to confirm the transaction server-side before treating the order as paid (`verifyAndFulfill()` → `fulfillPaidOrder()`).
- **`api/verify-payment.js`** is the only backend code. It re-checks the Flutterwave transaction's `status`, `tx_ref`, `currency`, and `amount` against what the client claims, using `FLW_SECRET_KEY` (server-only env var) — never trust the client callback alone, since it can be spoofed/tampered with in the browser.
- **No order database**: once a payment verifies, `fulfillPaidOrder()` clears the cart and opens a WhatsApp chat prefilled with the paid order details and `tx_ref` so the client still receives everything needed to fulfil it. There is nowhere else an order record is stored — if that WhatsApp message doesn't reach her (closed tab, no WhatsApp Web session), the order has no other record. Worth flagging if asked to make this more robust.
- **Styling**: single `styles.css` for the whole site — no CSS modules/preprocessor. Uses CSS custom properties for theme colors/fonts.
- **Images**: flat `images/` directory, referenced by relative path (e.g. `images/zaitun-signature-tote.jpg`) from each product's `img` field in `products.js`. Product photos are pre-cropped to 1000×1020 to match the near-square product cards (`.pc-media` is `aspect-ratio: 1/1.02`, `object-fit: cover`), so tall phone photos don't lose the top and bottom of the bag. The client's original photos are in `C:\Users\pc\Desktop\zaitun array\`.
- **Hardcoded home/about content**: the featured-product ids (inline script at the bottom of `index.html`), the category tiles and their "N designs" text, the "View all N designs" button, the shop hero ("Nine designs"), and the about-page "Live designs" stat are all hand-written. Update them when products are added or removed.

## Adding a product

1. Drop the photo into `images/`.
2. Add an entry to the `PRODUCTS` array in `products.js` (copy an existing entry's shape — `id`, `name`, `category`, `price`, `oldPrice`, `img`, `badge`, `stock`, `tagline`, `description`, `details[]`). `id` must be unique and URL-safe (used as `product.html?id=<id>`).
3. Add a `<url>` entry for `product.html?id=<id>` to `sitemap.xml` — this is the one place that doesn't pick up new products automatically.
4. Otherwise that's it — shop grid, product detail page, related-items, and cart all pick it up automatically since they all read from `PRODUCTS`.

`category` must be one of the keys in `CATEGORY_LABELS` (`totes`, `backpacks`, `sets`) or it won't get a label/filter chip.

Never list products that carry another company's logo, monogram or licensed characters (e.g. FILA, LV, Gucci stripe, Batman, Paw Patrol). The client sent photos like this, and they were deliberately left out as counterfeit or trademark risk.

## Known placeholders to watch for

These are launch-blocking placeholders already flagged in `README.md` — don't treat them as bugs to silently "fix" without confirming with the user, but do flag if asked to review/ship:

- `WHATSAPP_NUMBER` in `products.js` is the real order line, `2348035055985` (0803 505 5985). The footer of each HTML file hardcodes both client lines (0803 505 5985 and 0814 628 8244) as separate `wa.me` links, plus the about-page "Chat with us" button. These are not derived from `products.js`, so update all of them together if a number changes.
- Footer email/Instagram (`hello@zaitun-array.com`, `@zaitunarray`) are placeholders in each HTML file's footer.
- Per-product `price` and `stock` in `products.js` are placeholders (marked `// PLACEHOLDER`) until the client sends real values. `product.html` shows "Only N left in this batch", so placeholder stock is also a false scarcity claim.
- Homepage testimonials (`index.html`, marked with an HTML comment), the "Loved by 500+ carriers" hero line, and the about-page stats (500+ bags, 3 continents) came from the previous template. They are not real Zaitun-Array figures.
- `https://zaitun-array.com` used in the Open Graph/Twitter meta tags (every page's `<head>`), `robots.txt`, and `sitemap.xml` is a placeholder domain — swap for the real production URL once hosting is finalized.
- `product.html`'s OG/Twitter tags are static/generic (same card for every product) because the page renders per-product content via client-side JS, which link-preview crawlers don't execute. Fixing this properly needs server-side rendering or prerendered per-product HTML — out of scope for the current no-build static setup.
- `images/logo.jpg` still shows the old "Temikoods" logo/wordmark (brand was renamed to Zaitun-Array). It needs a replacement image from the user.
- `FLW_PUBLIC_KEY` in `products.js` is `"FLWPUBK_TEST-REPLACE-WITH-REAL-PUBLIC-KEY-X"` — a placeholder. The matching secret key must be set as `FLW_SECRET_KEY` in Vercel's environment variables, never committed to the repo.
