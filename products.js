/* ============================================================
   TEMIKOODS — Product Catalog
   Edit prices, names & stock here. Images live in /images.
   ============================================================ */

const PRODUCTS = [
  {
    id: "sahara-night",
    name: "Sahara Night Backpack",
    category: "backpacks",
    price: 24500,
    oldPrice: 28000,
    img: "images/bag-0030.jpg",
    badge: "Bestseller",
    stock: 4,
    tagline: "Midnight canvas, firelit mudcloth. The one everyone asks about.",
    description:
      "Our most-loved silhouette. A deep black body cut with hand-selected bogolan-inspired ankara in ember orange and bone white. Padded straps, reinforced base, and a front organiser pocket that swallows chargers, keys and chaos.",
    details: [
      "Fits laptops up to 15.6\"",
      "Water-resistant lined interior",
      "Padded adjustable shoulder straps",
      "Front zip organiser + twin side pockets",
      "Genuine ankara wax print — no two bags identical",
    ],
  },
  {
    id: "adire-indigo",
    name: "Adire Indigo Backpack",
    category: "backpacks",
    price: 26000,
    oldPrice: null,
    img: "images/bag-0037.jpg",
    badge: "Back in stock",
    stock: 6,
    tagline: "Deep indigo adire crowned with smooth black leather.",
    description:
      "Inspired by the indigo dye pits of Yoruba adire makers, this backpack pairs a rich blue wax print with a supple leather top panel. Roomy main compartment, quick-grab front zip, and side mesh pockets for your bottle.",
    details: [
      "Leather-finished top panel",
      "Fits laptops up to 15\"",
      "Front zip pocket + side mesh pockets",
      "Double-stitched stress points",
      "Hand-cut adire-inspired ankara print",
    ],
  },
  {
    id: "sunset-symbols",
    name: "Sunset Symbols Backpack",
    category: "backpacks",
    price: 23500,
    oldPrice: null,
    img: "images/bag-0036.jpg",
    badge: null,
    stock: 5,
    tagline: "Adinkra-style symbols in sunset orange, gold and oxblood.",
    description:
      "A walking festival. Bold symbol bands in orange, navy, maroon and gold wrap the entire bag — front pocket, side pockets, everything. For the ones who never wanted to blend in anyway.",
    details: [
      "Full-print body, front and back",
      "Padded back panel & straps",
      "Front zip pocket + twin mesh side pockets",
      "Fits A4 books, tablet & 14\" laptop",
      "Genuine ankara wax print",
    ],
  },
  {
    id: "ember-stripe-pack",
    name: "Ember Stripe Backpack",
    category: "backpacks",
    price: 22000,
    oldPrice: null,
    img: "images/bag-0042.jpg",
    badge: null,
    stock: 7,
    tagline: "Crimson and gold bamboo stripes. Loud, proud, everyday-ready.",
    description:
      "Red-and-gold bamboo-stripe ankara over a full-size school-and-street silhouette. Twin zip compartments, mesh side pockets and a padded back panel built for daily carry that refuses to be quiet.",
    details: [
      "Two full zip compartments",
      "Padded back panel & straps",
      "Mesh side pockets",
      "Front organiser pocket",
      "Genuine ankara wax print",
    ],
  },
  {
    id: "olive-trail-mini",
    name: "Olive Trail Mini",
    category: "backpacks",
    price: 18500,
    oldPrice: null,
    img: "images/bag-0031.jpg",
    badge: null,
    stock: 3,
    tagline: "Compact black-and-olive mudcloth for light movers.",
    description:
      "The small bag with a big personality. Colour-blocked black and olive-green mudcloth print in a compact frame — perfect for market runs, day trips and minimalists who still want to be seen.",
    details: [
      "Compact everyday size",
      "Front zip pocket",
      "Adjustable straps",
      "Fits tablet, purse & essentials",
      "Genuine ankara wax print",
    ],
  },
  {
    id: "cowrie-duo",
    name: "Cowrie Shell Backpack",
    category: "backpacks",
    price: 24000,
    oldPrice: null,
    img: "images/bag-0033.jpg",
    badge: "Limited",
    stock: 2,
    tagline: "Cowrie-print panels on jet black — wealth symbols, worn daily.",
    description:
      "Cowries were currency long before paper money. This jet-black pack carries red and green cowrie motifs across the front — a quiet nod to abundance. Shown alongside our indigo classics; you're ordering the cowrie print.",
    details: [
      "Cowrie-motif ankara front panel",
      "Front zip pocket",
      "Padded straps & back panel",
      "Fits 14\" laptop",
      "Small batch — 2 left",
    ],
  },
  {
    id: "midnight-mudcloth-tote",
    name: "Midnight Mudcloth Work Tote",
    category: "work",
    price: 28500,
    oldPrice: null,
    img: "images/bag-0029.jpg",
    badge: "Bestseller",
    stock: 5,
    tagline: "Boardroom black leather, heartbeat of bogolan print.",
    description:
      "The bag that walks into meetings before you do. Structured black leatherette frame with full mudcloth-print panels in indigo or bone. Twin top handles, interior laptop sleeve, and a finish that reads luxury at ten paces.",
    details: [
      "Fits laptops up to 15.6\"",
      "Structured leatherette frame",
      "Choice of indigo or bone print (note at checkout)",
      "Interior padded sleeve + pen slots",
      "Top zip closure",
    ],
  },
  {
    id: "village-story",
    name: "Village Story Laptop Bag",
    category: "work",
    price: 34000,
    oldPrice: null,
    img: "images/bag-0032.jpg",
    badge: "Signature",
    stock: 3,
    tagline: "A whole village, hand-printed along the hem. Our signature piece.",
    description:
      "Our signature. Smooth black leatherette up top, and along the base — an entire storytelling print: homesteads, drummers, baobab trees and birds in flight. Every glance finds a new detail. This is the bag people stop you for.",
    details: [
      "Fits laptops up to 15.6\"",
      "Premium leatherette body",
      "Narrative ankara hem panel",
      "Long top handles + D-rings for strap",
      "Interior padded compartment",
    ],
  },
  {
    id: "dashiki-royale",
    name: "Dashiki Royale Laptop Bag",
    category: "work",
    price: 29500,
    oldPrice: null,
    img: "images/bag-0034.jpg",
    badge: null,
    stock: 4,
    tagline: "The classic Angelina dashiki print, carried like royalty.",
    description:
      "The unmistakable dashiki 'Angelina' print — cobalt, flame and ivory — wrapped around a slim laptop carrier with jet-black handles. Worn across Africa for generations; now it carries your work.",
    details: [
      "Fits laptops up to 15\"",
      "Slim, lightweight profile",
      "Black leatherette handles",
      "Full-zip main compartment",
      "Iconic dashiki wax print",
    ],
  },
  {
    id: "kente-ember-brief",
    name: "Kente Ember Slim Brief",
    category: "work",
    price: 31000,
    oldPrice: null,
    img: "images/bag-0035.jpg",
    badge: null,
    stock: 4,
    tagline: "Amber flame-weave print with a detachable cross-body strap.",
    description:
      "A slim brief in a hypnotic amber-and-umber flame weave, edged with black leatherette. Carry it by the handles or clip on the adjustable cross-body strap (included). Office to owambe without missing a beat.",
    details: [
      "Fits laptops up to 15\"",
      "Detachable adjustable shoulder strap",
      "Leatherette trim & handles",
      "Front slip pocket with patch detail",
      "Genuine ankara wax print",
    ],
  },
  {
    id: "ember-stripe-duffel",
    name: "Ember Stripe Duffel",
    category: "travel",
    price: 36500,
    oldPrice: null,
    img: "images/bag-0041.jpg",
    badge: "Travel-ready",
    stock: 3,
    tagline: "The weekender that turns departure lounges into runways.",
    description:
      "Full-size barrel duffel in our crimson-and-gold bamboo stripe. End zip pocket for shoes or laundry, wraparound webbing handles, and a detachable shoulder strap. Built for two-to-four day escapes.",
    details: [
      "40L weekender capacity",
      "End zip compartment",
      "Detachable padded shoulder strap",
      "Reinforced wraparound handles",
      "Genuine ankara wax print",
    ],
  },
];

/* WhatsApp number for checkout — replace with the brand's real number
   (country code + number, digits only, e.g. 2348012345678) */
const WHATSAPP_NUMBER = "2348000000000";

const CATEGORY_LABELS = {
  backpacks: "Backpacks",
  work: "Work & Laptop",
  travel: "Travel",
};

function formatNaira(n) {
  return "₦" + n.toLocaleString("en-NG");
}
