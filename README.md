# Zaitun-Array — Handmade Bags from Lagos

Award-style e-commerce site for the Zaitun-Array bag brand. Static HTML/CSS/JS front end
plus one Vercel serverless function (`api/verify-payment.js`) for payment verification.
Deployable to Vercel; a plain static host (Netlify, GitHub Pages) works for everything
except the on-site card/transfer payment, which needs the serverless function.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, featured bags, story, craft process, testimonials |
| `shop.html` | Full catalog with category filters (`#totes`, `#backpacks`, `#sets`) |
| `product.html?id=<id>` | Product detail page (rendered from `products.js`) |
| `about.html` | Brand story |

## Before you launch — 3 things to update

1. **WhatsApp number** — in `products.js`, replace `WHATSAPP_NUMBER = "2348000000000"`
   with the brand's real number (country code + digits, no `+` or spaces).
   Also update the two `wa.me/2348000000000` footer links in each HTML file.
2. **Prices & stock** — edit each product in `products.js` (`price`, `oldPrice`, `stock`).
3. **Email & Instagram** — footer links currently point to `hello@zaitun-array.com`
   and `@zaitunarray`; change if different.
4. **Site domain** — Open Graph/Twitter share tags in every page's `<head>`, plus
   `robots.txt` and `sitemap.xml`, use the placeholder `https://zaitun-array.com`;
   replace with the real production domain once it's live (search for
   `zaitun-array.com` across the repo).
5. **Flutterwave keys** — in `products.js`, replace `FLW_PUBLIC_KEY` with the real
   public key from the Flutterwave dashboard. Set the matching **secret** key as the
   `FLW_SECRET_KEY` environment variable in the Vercel project settings — never put it
   in a file that gets committed.

## How orders work

The cart (persisted in localStorage) offers two checkout paths from the same drawer:

- **Pay with Card / Transfer** — collects name/email/phone, opens Flutterwave's inline
  checkout, then calls `api/verify-payment.js` (a Vercel serverless function) to
  confirm the transaction status, amount and currency server-side before treating the
  order as paid. There is no order database — once verified, the cart clears and a
  WhatsApp chat auto-opens with the client, prefilled with the paid order details and
  payment reference, so she still has everything she needs to fulfil it.
- **Checkout on WhatsApp** — unchanged: opens a chat with a pre-filled order message
  and payment happens in the DM, as before.

## Adding a new product

1. Drop the photo into `images/`.
2. Add an entry to the `PRODUCTS` array in `products.js` (copy an existing one).
3. Add a `<url>` entry for it in `sitemap.xml` (shop grid, product page, related items
   and cart pick up the new product automatically — the sitemap is the one place that
   needs a manual update).

## Run locally

For static pages only (no payment testing):

```bash
npx http-server -p 3456
# then open http://localhost:3456
```

To test the payment flow, the `/api` function needs to run too — use the Vercel CLI
instead:

```bash
npm i -g vercel
vercel dev
```

## Deploy

Deploy to Vercel: `vercel` from this folder. Set `FLW_SECRET_KEY` in the project's
environment variables before testing real payments. A plain static host works for
every page except on-site payment, since that needs `api/verify-payment.js` to run
somewhere.
