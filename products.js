/* ============================================================
   ZAITUN-ARRAY — Product Catalog
   Edit prices, names & stock here. Images live in /images.

   ⚠ PLACEHOLDERS: every price and stock figure below is a stand-in
   until the client sends real numbers (see MEMORY.md open items).
   Product details only describe what is visible in the photos —
   confirm sizes / materials with the client before launch.
   ============================================================ */

const PRODUCTS = [
  {
    id: "zaitun-signature-tote",
    name: "Zaitun Signature Tote",
    category: "totes",
    price: 25000, // PLACEHOLDER
    oldPrice: null,
    img: "images/zaitun-signature-tote.jpg",
    badge: "Signature",
    stock: 5, // PLACEHOLDER
    tagline: "Lime, violet and scarlet ankara, finished with our brass nameplate.",
    description:
      "The bag that carries our name, literally. A wide, generous tote in a bold lime, violet and scarlet ankara print, with a structured black front panel, a gold-tone medallion and the engraved Zaitun Array brass plate. Soft rolled handles sit comfortably on the shoulder.",
    details: [
      "Bold ankara print body",
      "Black front panel with gold-tone medallion",
      "Engraved Zaitun Array brass nameplate",
      "Rolled fabric shoulder handles",
      "Handmade in Lagos",
    ],
  },
  {
    id: "plum-sunburst-batik-tote",
    name: "Plum Sunburst Batik Tote",
    category: "totes",
    price: 22000, // PLACEHOLDER
    oldPrice: null,
    img: "images/plum-sunburst-batik-tote.jpg",
    badge: "New",
    stock: 5, // PLACEHOLDER
    tagline: "Hand-dyed plum batik with flame-orange bursts and flower clasps.",
    description:
      "Deep plum batik scattered with flame-orange and cream sunburst motifs, so no two bags crackle the same way. Matching fabric handles are finished with white flower clasps for a soft, feminine touch. Roomy enough for the everyday and pretty enough for the weekend.",
    details: [
      "Hand-dyed batik fabric",
      "Matching fabric shoulder handles",
      "White flower clasp details",
      "Roomy open-top shape",
      "Handmade in Lagos",
    ],
  },
  {
    id: "green-ripple-batik-tote",
    name: "Green Ripple Batik Tote",
    category: "totes",
    price: 24000, // PLACEHOLDER
    oldPrice: null,
    img: "images/green-ripple-batik-tote.jpg",
    badge: null,
    stock: 5, // PLACEHOLDER
    tagline: "Lime-and-forest dot batik, framed in black buckled straps.",
    description:
      "Rippling rows of lime and white dots spiral across a forest-green batik, finished with black leatherette trim. Adjustable buckled handles and side strap tabs give it a sharp, structured look that works from the office to the market.",
    details: [
      "Dotted spiral batik print",
      "Adjustable buckled leatherette handles",
      "Side strap-and-buckle detailing",
      "Black leatherette top trim",
      "Handmade in Lagos",
    ],
  },
  {
    id: "blue-fern-batik-tote",
    name: "Blue Fern Batik Tote",
    category: "totes",
    price: 24000, // PLACEHOLDER
    oldPrice: null,
    img: "images/blue-fern-batik-tote.jpg",
    badge: null,
    stock: 5, // PLACEHOLDER
    tagline: "Midnight batik layered with cobalt and turquoise fern leaves.",
    description:
      "Cobalt and turquoise fern leaves drift over a midnight-blue batik base. Same structured silhouette as our Green Ripple tote, with adjustable buckled handles, side strap tabs and black leatherette trim, in a cooler, moodier colourway.",
    details: [
      "Fern-leaf batik print",
      "Adjustable buckled leatherette handles",
      "Side strap-and-buckle detailing",
      "Black leatherette top trim",
      "Handmade in Lagos",
    ],
  },
  {
    id: "bloom-ankara-backpack",
    name: "Bloom Ankara Backpack",
    category: "backpacks",
    price: 20000, // PLACEHOLDER
    oldPrice: null,
    img: "images/bloom-ankara-backpack.jpg",
    badge: null,
    stock: 5, // PLACEHOLDER
    tagline: "A garden of mixed ankara florals, right down to the straps.",
    description:
      "Big blue, gold and white blooms on black, paired with a cobalt floral front pocket and print-covered shoulder straps. Two zip compartments and a top grab handle keep it practical. The colour does the rest.",
    details: [
      "Mixed ankara floral prints",
      "Main zip compartment + front zip pocket",
      "Print-covered shoulder straps",
      "Top grab handle",
      "Handmade in Lagos",
    ],
  },
  {
    id: "silver-weave-zip-tote",
    name: "Silver Weave Zip Tote",
    category: "totes",
    price: 18000, // PLACEHOLDER
    oldPrice: null,
    img: "images/silver-weave-zip-tote.jpg",
    badge: null,
    stock: 5, // PLACEHOLDER
    tagline: "Grey-and-white woven texture, clean black trim, zipped shut.",
    description:
      "A calm, minimal tote in a grey-and-white woven fabric, edged with a black band. A full-length top zip keeps everything secure, and a black zipped front pocket holds your phone and keys. Long fabric straps sit easily over the shoulder.",
    details: [
      "Woven grey-and-white fabric",
      "Full-length top zip closure",
      "Zipped black front pocket",
      "Long black fabric shoulder straps",
      "Handmade in Lagos",
    ],
  },
  {
    id: "onyx-weave-tote",
    name: "Onyx Weave Tote",
    category: "totes",
    price: 26000, // PLACEHOLDER
    oldPrice: null,
    img: "images/onyx-weave-tote.jpg",
    badge: null,
    stock: 5, // PLACEHOLDER
    tagline: "All-black basket-weave texture with silver hardware.",
    description:
      "Polished and understated. A structured all-black tote with a basket-weave texture from body to handles, a zipped front pocket and silver-tone D-ring hardware. It goes with everything and quietly upgrades it.",
    details: [
      "Black basket-weave textured finish",
      "Zipped front pocket",
      "Silver-tone D-ring hardware",
      "Matching textured shoulder handles",
      "Handmade in Lagos",
    ],
  },
  {
    id: "doodle-pop-tote",
    name: "Doodle Pop Tote",
    category: "totes",
    price: 23000, // PLACEHOLDER
    oldPrice: null,
    img: "images/doodle-pop-tote.jpg",
    badge: null,
    stock: 5, // PLACEHOLDER
    tagline: "Yellow doodles on black canvas: playful, with a grown-up finish.",
    description:
      "Rainbows, skulls, atoms and a little Mona Lisa, all scribbled in sunshine yellow across black canvas. A black leatherette base, flap front pocket and long handles keep it polished, and a brass zip closes the top.",
    details: [
      "Black canvas with yellow doodle print",
      "Leatherette base, handles & flap pocket",
      "Brass-tone top zip closure",
      "Long shoulder handles",
      "Handmade in Lagos",
    ],
  },
  {
    id: "bronze-croc-tote-set",
    name: "Bronze Croc Tote & Purse Set",
    category: "sets",
    price: 35000, // PLACEHOLDER
    oldPrice: null,
    img: "images/bronze-croc-tote-set.jpg",
    badge: "Set",
    stock: 5, // PLACEHOLDER
    tagline: "Burnished bronze croc-effect tote with a matching zip purse.",
    description:
      "A structured work tote in burnished bronze croc-effect finish, with a curved zipped front pocket and sturdy top handles, paired with a matching zip-around purse. Shown styled with a silk scarf (scarf not included).",
    details: [
      "Bronze croc-effect finish",
      "Matching zip-around purse included",
      "Curved zipped front pocket",
      "Structured shape with top handles",
      "Scarf shown for styling only",
    ],
  },
];

/* WhatsApp number for checkout — replace with the brand's real number
   (country code + number, digits only, e.g. 2348012345678) */
const WHATSAPP_NUMBER = "2348035055985"; // 0803 505 5985 — receives all orders (second line 0814 628 8244 is footer-only)

/* Flutterwave public key — safe to expose client-side. Get the real one from
   the Flutterwave dashboard (Settings > API) and put the matching secret key
   in the FLW_SECRET_KEY environment variable on Vercel (never in this file). */
const FLW_PUBLIC_KEY = "FLWPUBK_TEST-REPLACE-WITH-REAL-PUBLIC-KEY-X";

const CATEGORY_LABELS = {
  totes: "Totes",
  backpacks: "Backpacks",
  sets: "Sets",
};

function formatNaira(n) {
  return "₦" + n.toLocaleString("en-NG");
}
