/* ============================================================
   TEMIKOODS — App: cart, product rendering, interactions
   ============================================================ */

/* ---------- cart state (localStorage) ---------- */
const CART_KEY = "temikoods_cart_v1";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
  renderCartDrawer();
}
function addToCart(id, qty = 1) {
  const cart = getCart();
  const line = cart.find((l) => l.id === id);
  if (line) line.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  const p = PRODUCTS.find((p) => p.id === id);
  showToast(`✦ ${p ? p.name : "Item"} added to your bag`);
  bumpCartCount();
}
function setQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) cart = cart.filter((l) => l.id !== id);
  else cart.find((l) => l.id === id).qty = qty;
  saveCart(cart);
}
function cartTotal() {
  return getCart().reduce((sum, l) => {
    const p = PRODUCTS.find((p) => p.id === l.id);
    return sum + (p ? p.price * l.qty : 0);
  }, 0);
}
function cartCount() {
  return getCart().reduce((n, l) => n + l.qty, 0);
}

/* ---------- cart UI ---------- */
function renderCartCount() {
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = cartCount();
  });
}
function bumpCartCount() {
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  });
}

function buildCartDrawer() {
  if (document.querySelector(".cart-drawer")) return;
  const overlay = document.createElement("div");
  overlay.className = "cart-overlay";
  overlay.addEventListener("click", closeCart);

  const drawer = document.createElement("aside");
  drawer.className = "cart-drawer";
  drawer.setAttribute("aria-label", "Shopping bag");
  drawer.innerHTML = `
    <div class="cart-head">
      <h3>Your Bag</h3>
      <button class="cart-close" aria-label="Close bag">×</button>
    </div>
    <div class="cart-items"></div>
    <div class="cart-foot">
      <div class="cart-total-row">
        <span class="ct-label">Subtotal</span>
        <span class="ct-value"></span>
      </div>
      <div class="checkout-fields">
        <input type="text" class="cf-name" placeholder="Full name" autocomplete="name">
        <input type="email" class="cf-email" placeholder="Email (for payment receipt)" autocomplete="email">
        <input type="tel" class="cf-phone" placeholder="Phone number" autocomplete="tel">
      </div>
      <button class="btn pay-btn"><span>Pay with Card / Transfer</span> <span class="arr">→</span></button>
      <p class="cf-note">Free delivery in Lagos on orders over ₦50,000. We confirm every order personally on WhatsApp.</p>
      <button class="btn btn-wa checkout-btn"><span>Checkout on WhatsApp</span> <span class="arr">→</span></button>
    </div>`;
  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
  drawer.querySelector(".cart-close").addEventListener("click", closeCart);
  drawer.querySelector(".checkout-btn").addEventListener("click", checkoutWhatsApp);
  drawer.querySelector(".pay-btn").addEventListener("click", payOnline);
}

function renderCartDrawer() {
  const itemsEl = document.querySelector(".cart-items");
  if (!itemsEl) return;
  const cart = getCart();
  const foot = document.querySelector(".cart-foot");

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <span class="ce-icon">🧺</span>
        <p>Your bag is empty — for now.</p>
        <a class="btn btn-ghost" href="shop.html"><span>Shop the collection</span> <span class="arr">→</span></a>
      </div>`;
    foot.style.display = "none";
    return;
  }
  foot.style.display = "";
  itemsEl.innerHTML = cart.map((l) => {
    const p = PRODUCTS.find((p) => p.id === l.id);
    if (!p) return "";
    return `
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}">
        <div>
          <div class="ci-name">${p.name}</div>
          <div class="ci-price">${formatNaira(p.price)} each</div>
          <div class="ci-qty">
            <button data-dec="${p.id}" aria-label="Decrease quantity">−</button>
            <span>${l.qty}</span>
            <button data-inc="${p.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div style="text-align:right">
          <div class="ci-line-total">${formatNaira(p.price * l.qty)}</div>
          <button class="ci-remove" data-remove="${p.id}">Remove</button>
        </div>
      </div>`;
  }).join("");
  document.querySelector(".ct-value").textContent = formatNaira(cartTotal());

  itemsEl.querySelectorAll("[data-inc]").forEach((b) =>
    b.addEventListener("click", () => {
      const l = getCart().find((l) => l.id === b.dataset.inc);
      setQty(b.dataset.inc, l.qty + 1);
    })
  );
  itemsEl.querySelectorAll("[data-dec]").forEach((b) =>
    b.addEventListener("click", () => {
      const l = getCart().find((l) => l.id === b.dataset.dec);
      setQty(b.dataset.dec, l.qty - 1);
    })
  );
  itemsEl.querySelectorAll("[data-remove]").forEach((b) =>
    b.addEventListener("click", () => setQty(b.dataset.remove, 0))
  );
}

function openCart() {
  document.querySelector(".cart-overlay").classList.add("open");
  document.querySelector(".cart-drawer").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.querySelector(".cart-overlay").classList.remove("open");
  document.querySelector(".cart-drawer").classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------- WhatsApp checkout ---------- */
function checkoutWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) return;
  const lines = cart.map((l) => {
    const p = PRODUCTS.find((p) => p.id === l.id);
    return `• ${p.name} × ${l.qty} — ${formatNaira(p.price * l.qty)}`;
  });
  const msg = [
    "Hello Temikoods! 👋 I'd like to order:",
    "",
    ...lines,
    "",
    `Total: ${formatNaira(cartTotal())}`,
    "",
    "My delivery details:",
    "Name:",
    "Location:",
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* ---------- online payment (Flutterwave) ---------- */
function payOnline() {
  const cart = getCart();
  if (cart.length === 0) return;

  const emailEl = document.querySelector(".cf-email");
  const nameEl = document.querySelector(".cf-name");
  const phoneEl = document.querySelector(".cf-phone");
  const email = emailEl.value.trim();
  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();

  if (!email) {
    showToast("Enter your email above to pay online");
    emailEl.focus();
    return;
  }
  if (typeof FlutterwaveCheckout !== "function") {
    showToast("Online payment isn't available right now — please checkout on WhatsApp");
    return;
  }

  const amount = cartTotal();
  const txRef = `TMK-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  FlutterwaveCheckout({
    public_key: FLW_PUBLIC_KEY,
    tx_ref: txRef,
    amount,
    currency: "NGN",
    payment_options: "card, banktransfer, ussd",
    customer: { email, phone_number: phone, name: name || "Temikoods Customer" },
    customizations: {
      title: "Temikoods",
      description: "Payment for handcrafted ankara bag order",
      logo: `${location.origin}/images/logo.jpg`,
    },
    callback: (response) => verifyAndFulfill(response, txRef, amount, { name, email, phone }),
    onclose: () => {},
  });
}

async function verifyAndFulfill(response, txRef, amount, customer) {
  if (!response || response.status !== "successful") {
    showToast("Payment was not completed");
    return;
  }
  showToast("Verifying payment…");
  try {
    const res = await fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transaction_id: response.transaction_id,
        tx_ref: txRef,
        expected_amount: amount,
      }),
    });
    const data = await res.json();
    if (data.status === "success") fulfillPaidOrder(txRef, customer);
    else showToast(`We couldn't verify your payment — please contact us on WhatsApp with reference ${txRef}`);
  } catch {
    showToast(`Network error verifying payment — contact us on WhatsApp with reference ${txRef}`);
  }
}

function fulfillPaidOrder(txRef, customer) {
  const cart = getCart();
  const lines = cart.map((l) => {
    const p = PRODUCTS.find((p) => p.id === l.id);
    return `• ${p.name} × ${l.qty} — ${formatNaira(p.price * l.qty)}`;
  });
  const msg = [
    "New PAID order via website ✅",
    `Ref: ${txRef}`,
    "",
    ...lines,
    "",
    `Total: ${formatNaira(cartTotal())}`,
    "",
    `Name: ${customer.name || "-"}`,
    `Phone: ${customer.phone || "-"}`,
    `Email: ${customer.email}`,
    "",
    "Delivery location:",
  ].join("\n");
  saveCart([]);
  closeCart();
  showToast("✦ Payment successful — thank you!");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

/* ---------- toast ---------- */
let toastTimer;
function showToast(text) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- product card ---------- */
function productCardHTML(p) {
  const badge = p.badge
    ? `<span class="pc-badge ${p.badge === "Limited" ? "badge-limited" : ""}">${p.badge}</span>`
    : "";
  const old = p.oldPrice ? `<span class="pc-old">${formatNaira(p.oldPrice)}</span>` : "";
  return `
    <article class="product-card reveal">
      <a class="pc-media" href="product.html?id=${p.id}">
        ${badge}
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="pc-quick" data-add="${p.id}">Add to bag — ${formatNaira(p.price)}</button>
      </a>
      <div class="pc-body">
        <span class="pc-cat">${CATEGORY_LABELS[p.category]}</span>
        <a href="product.html?id=${p.id}"><h3 class="pc-name">${p.name}</h3></a>
        <p class="pc-tag">${p.tagline}</p>
        <div class="pc-price-row"><span class="pc-price">${formatNaira(p.price)}</span>${old}</div>
      </div>
    </article>`;
}

function bindQuickAdd(scope = document) {
  scope.querySelectorAll("[data-add]").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(b.dataset.add, 1);
    })
  );
}

function renderProductGrid(el, products) {
  el.innerHTML = products.map(productCardHTML).join("");
  bindQuickAdd(el);
  observeReveals(el);
}

/* ---------- scroll reveals ---------- */
let revealObserver;
function observeReveals(scope = document) {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObserver.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
  }
  scope.querySelectorAll(".reveal:not(.in)").forEach((el) => revealObserver.observe(el));
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildCartDrawer();
  renderCartCount();
  renderCartDrawer();
  observeReveals();

  document.querySelectorAll(".cart-btn").forEach((b) => b.addEventListener("click", openCart));

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        nav.classList.remove("open");
      })
    );
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  /* newsletter (front-end only) */
  document.querySelectorAll(".nl-form").forEach((form) =>
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      if (input.value.trim()) {
        showToast("✦ Welcome to the family — 10% code: AKWAABA10");
        input.value = "";
      }
    })
  );

  bindQuickAdd();
});
