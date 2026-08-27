# Temikoods — Handcrafted Ankara Bags

Award-style e-commerce site for the Temikoods bag brand. Pure HTML/CSS/JS — no build
step, deployable to any static host (Vercel, Netlify, GitHub Pages).

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, featured bags, story, craft process, testimonials |
| `shop.html` | Full catalog with category filters (`#backpacks`, `#work`, `#travel`) |
| `product.html?id=<id>` | Product detail page (rendered from `products.js`) |
| `about.html` | Brand story |

## Before you launch — 3 things to update

1. **WhatsApp number** — in `products.js`, replace `WHATSAPP_NUMBER = "2348000000000"`
   with the brand's real number (country code + digits, no `+` or spaces).
   Also update the two `wa.me/2348000000000` footer links in each HTML file.
2. **Prices & stock** — edit each product in `products.js` (`price`, `oldPrice`, `stock`).
3. **Email & Instagram** — footer links currently point to `hello@temikoods.com`
   and `@temikoods`; change if different.
4. **Site domain** — Open Graph/Twitter share tags in every page's `<head>`, plus
   `robots.txt` and `sitemap.xml`, use the placeholder `https://temikoods.com`;
   replace with the real production domain once it's live (search for
   `temikoods.com` across the repo).

## How orders work

The cart (persisted in localStorage) checks out via WhatsApp: it opens a chat with a
pre-filled order message (items, quantities, total, delivery details prompt). No
payment gateway is required — you confirm and take payment in the chat, which is the
highest-converting flow for Nigerian social-commerce brands. A Paystack/Flutterwave
gateway can be added later if needed.

## Adding a new product

1. Drop the photo into `images/`.
2. Add an entry to the `PRODUCTS` array in `products.js` (copy an existing one).
3. Add a `<url>` entry for it in `sitemap.xml` (shop grid, product page, related items
   and cart pick up the new product automatically — the sitemap is the one place that
   needs a manual update).

## Run locally

```bash
npx http-server -p 3456
# then open http://localhost:3456
```

## Deploy

Any static host works. For Vercel: `npm i -g vercel && vercel` from this folder.
