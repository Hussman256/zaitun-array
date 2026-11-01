# MEMORY.md — Zaitun-Array build log

A running log of decisions and changes made while building this site. Newest entries go at the top.
`CLAUDE.md` describes how the code works. This file records what changed, why, and what is still open.

## Open items / to-do

- [ ] **Real prices & stock for all 9 bags**: the user will send these. Every `price` and `stock` in `products.js` is marked `// PLACEHOLDER`.
- [ ] **Full logo file**: the badge is done (see log). The full logo (badge + "ZAITUN ARRAY · HANDMADE IN LAGOS") still needs the original file. It was a WhatsApp JPEG in Downloads but is no longer there. Ask for it again, or for the designer's original. `images/logo.jpg` (the old Temikoods logo) is now unused and can be deleted or replaced.
- [ ] **Newsletter form saves nothing**: the home-page sign-up shows a "thanks" message, but the email is thrown away (front-end only). Connect it to a real list (Mailchimp, a Google Form, etc.) or remove it.
- [ ] **Confirm delivery promises**: the top banner says "Free Lagos delivery over ₦50,000 · Nationwide in 2–4 days", and the shop page has delivery times and a 6-month guarantee. These came from the old template, so confirm them with the client.
- [ ] **Testimonials and stats are not real**: the 3 homepage testimonials, "Loved by 500+ carriers", and the about-page "500+ bags / 3 continents" came from the old template. Replace them with real figures or remove them before launch.
- [ ] **Confirm product details with the client**: the descriptions were written from the photos only, with no sizes or materials confirmed. Some photos look AI-generated or styled (the green/blue batik pair, the bronze croc set). Ask whether real product photos exist.
- [ ] **Branded bags left out**: 5 client photos were not used because they show other companies' trademarks: 3 FILA kids' backpacks with Batman or Paw Patrol, an LV-monogram duffel, and a backpack with a Gucci-style stripe. If the client makes unbranded versions, add them then.
- [ ] **Confirm Instagram handle**: it is set to `@zaitunarray` because Instagram doesn't allow hyphens. Change it if the real handle is different (e.g. `zaitun_array`, `zaitun.array`).
- [ ] **Confirm email and domain**: `hello@zaitun-array.com` and `https://zaitun-array.com` are placeholders until the real domain is bought or confirmed.
- [ ] Launch placeholders from before the rename are still open (WhatsApp number, Flutterwave public key, prices and stock). See "Known placeholders" in `CLAUDE.md`.

## Log

### 2026-11-01 — New logo badge, logo colours, removed fake discount code
- Work moved to branch **`zaitun-array-rebrand`**. `main` still holds the original Temikoods version.
- `images/logo-badge.svg`: a hand-drawn vector of the round badge from the client's logo (olive field, mustard dotted ring, cream bag, orange zigzag, mustard leaf). It is used in the header and footer on all pages, as the favicon, and as the Flutterwave checkout logo.
- Site palette changed to match the logo, in the `:root` tokens in `styles.css`. Ink is now deep olive-black `#1c2314`, the accent is burnt orange `#c2622a`, `--indigo` holds the logo olive `#3b4a23`, and `--gold` is mustard `#e3a63b`. Token names are left over from the old template.
- Removed the fake "AKWAABA10 for 10% off" code from the top banner on all 4 pages, from the newsletter heading ("Get 10% off…" became "Be first to see new prints") and from the newsletter thank-you message. The code never worked.

### 2026-11-01 — Replaced the whole catalog with the new client's bags
- The client's photos are in `C:\Users\pc\Desktop\zaitun array\` (14 WhatsApp images). 9 were used. 5 branded ones were left out (see open items).
- New catalog (9 products): Zaitun Signature Tote, Plum Sunburst Batik Tote, Green Ripple Batik Tote, Blue Fern Batik Tote (green and blue are **separate products**, cropped from one shared photo), Bloom Ankara Backpack, Silver Weave Zip Tote, Onyx Weave Tote, Doodle Pop Tote, Bronze Croc Tote & Purse Set.
- Categories changed from `backpacks/work/travel` to **`totes/backpacks/sets`**. This touched the nav and footer links on all 4 pages, the shop filter chips and hash list, the home category tiles and `CATEGORY_LABELS`.
- Product photos were cropped and padded to 1000×1020 (card shape) with a PowerShell + System.Drawing script, since there is no Python or ImageMagick on this machine. Lifestyle shots were kept full frame: `batik-tote-duo.jpg` and `plum-batik-tote-workshop.jpg` (the sewing-machine shot, used for the home story section and the about page).
- Old `images/bag-00xx.jpg` files were deleted.
- Text updated to "Handmade in Lagos · Ankara & Batik" (matching the logo's tagline). Counts changed from 11 to 9. Meta and preview images were updated, the sitemap rebuilt, and the testimonials re-pointed to new bag names with a PLACEHOLDER comment.
- Payment reference prefix `TMK-` (a Temikoods leftover) changed to `ZA-` in `app.js`.

### 2026-11-01 — Rebrand: Temikoods → Zaitun-Array
- Replaced every "Temikoods" / "TEMIKOODS" with "Zaitun-Array" / "ZAITUN-ARRAY". This covers page titles, meta/OG/Twitter tags, body copy, footers, WhatsApp order messages, the Flutterwave checkout title and customer fallback name, and code comments.
- Header/footer wordmark: `Temi<span>koods</span>` became `Zaitun<span>-Array</span>`. The orange accent now falls on "-Array".
- Placeholder domain `temikoods.com` → `zaitun-array.com` (OG URLs, `robots.txt`, `sitemap.xml`, footer email).
- Instagram `@temikoods` → `@zaitunarray`.
- Cart localStorage key `temikoods_cart_v1` → `zaitun_array_cart_v1`. Any test carts saved in a browser under the old key are dropped. This is harmless before launch.
- `package.json` name → `zaitun-array`.
- `.footer-mega` font size reduced (`clamp(2.2rem, 9vw, 8.5rem)`, plus `nowrap`). "ZAITUN-ARRAY" is 12 letters versus 9 for "TEMIKOODS", and at the old size it would overflow the screen.
- Not changed: `images/logo.jpg` (see open items).
