// ============================================
// booking.js — Razorpay Checkout + Backend API (Correct Amount)
// ============================================

const API_BASE = "http://localhost:5000"; // backend base URL

// ---------- helpers ----------
function getEventId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function getEvents() {
  try {
    return JSON.parse(localStorage.getItem("eventify_events_v1") || "[]");
  } catch {
    return [];
  }
}

function moneyLabel(priceRupees) {
  const p = Number(priceRupees || 0);
  return p === 0 ? "Free" : `₹${p}`;
}

function toPaise(rupees) {
  // Razorpay amount must be in paise
  return Math.round(Number(rupees || 0));
}

async function safeJson(res) {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  const text = await res.text();
  return { ok: false, message: text || `HTTP ${res.status}` };
}

function showError(msg) {
  alert(msg);
}

// ---------- API calls ----------
// ✅ IMPORTANT: this function expects amountInPaise already
async function createOrder(amountInPaise, notes = {}) {
  const res = await fetch(`${API_BASE}/api/payment/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: amountInPaise, notes })
  });

  return safeJson(res);
}

async function verifyPayment(payload) {
  const res = await fetch(`${API_BASE}/api/payment/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return safeJson(res);
}

function redirectToConfirmation({ eventName, amountRupees, paymentId = "" }) {
  const bookingId = "BK" + Date.now();
  window.location.href =
    `confirmation.html?booking=${encodeURIComponent(bookingId)}` +
    `&event=${encodeURIComponent(eventName)}` +
    `&amount=${encodeURIComponent(amountRupees)}` +
    `&payment_id=${encodeURIComponent(paymentId)}`;
}

// ---------- payment flow ----------
async function payNow({ ev, user }) {
  const amountRupees = Number(ev?.price || 0);
  const amountPaise = toPaise(amountRupees);

  // Free event: skip gateway
  if (amountRupees === 0) {
    redirectToConfirmation({ eventName: ev.name, amountRupees: 0 });
    return;
  }

  // Ensure Razorpay script is loaded
  if (!window.Razorpay) {
    showError(
      "Razorpay SDK not loaded.\n\nFix: Add this in booking.html BEFORE booking.js:\n" +
      '<script src="https://checkout.razorpay.com/v1/checkout.js"></script>'
    );
    return;
  }

  // Create order from backend (amount must be paise)
  let orderResp;
  try {
    orderResp = await createOrder(amountPaise, {
      eventId: ev.id,
      eventName: ev.name,
      customer: user.email
    });
  } catch (err) {
    showError(
      "Backend not reachable (Failed to fetch).\n\n" +
      "Fix:\n1) Start backend: node server.js (or npm run dev)\n2) Open frontend using Live Server (not file://)\n3) Check backend CORS.\n\n" +
      `Details: ${err.message}`
    );
    return;
  }

  if (!orderResp || !orderResp.ok) {
    showError("Order creation failed: " + (orderResp?.message || "Unknown error"));
    return;
  }

  const order = orderResp.order;

  // ✅ order.amount must be paise (e.g., 29900)
  const options = {
    key: "rzp_test_S3R4jCWzOWmUuo", // your key_id (test)
    amount: order.amount,
    currency: order.currency || "INR",
    name: "Eventify",
    description: `Ticket for ${ev.name}`,
    order_id: order.id,

    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone
    },

    theme: { color: "#6d5efc" },

    handler: async function (response) {
      try {
        const verifyResp = await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        });

        if (!verifyResp || !verifyResp.ok) {
          showError("Payment verification failed: " + (verifyResp?.message || "Unknown"));
          return;
        }

        redirectToConfirmation({
          eventName: ev.name,
          amountRupees,
          paymentId: response.razorpay_payment_id
        });
      } catch (err) {
        showError("Verification error: " + err.message);
      }
    }
  };

  const rzp = new Razorpay(options);
  rzp.on("payment.failed", function (resp) {
    showError("Payment Failed: " + (resp?.error?.description || "Try again"));
  });

  rzp.open();
}

// ---------- init page ----------
(function initBookingPage() {
  const eventId = getEventId();
  const events = getEvents();
  const ev = events.find(e => e.id === eventId) || events[0];

  if (!ev) {
    showError("No events found in localStorage. Open events.html once to seed events.");
    return;
  }

  // Fill UI (make sure these IDs exist in booking.html)
  const t = document.getElementById("bkEventTitle");
  const m = document.getElementById("bkEventMeta");
  const p = document.getElementById("bkEventPrice");
  const s = document.getElementById("bkEventSeats");

  if (t) t.textContent = ev.name || "Event";
  if (m) m.textContent = `${ev.date || ""} • ${ev.time || ""} • ${ev.venue || ""}`;
  if (p) p.textContent = moneyLabel(ev.price);
  if (s) s.textContent = String(ev.seats || 0);

  const form = document.getElementById("bookingForm");
  const payBtn = document.getElementById("payBtn");

  if (!form || !payBtn) {
    console.warn("bookingForm or payBtn not found in booking.html");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("bkName")?.value?.trim() || "";
    const email = document.getElementById("bkEmail")?.value?.trim() || "";
    const phone = document.getElementById("bkPhone")?.value?.trim() || "";

    if (!name || !email || !phone) {
      showError("Please fill Name, Email, Phone.");
      return;
    }

    payBtn.disabled = true;
    payBtn.classList.add('loading');
    payBtn.textContent = "Processing...";

    try {
      await payNow({ ev, user: { name, email, phone } });
    } catch (err) {
      showError("Something went wrong: " + err.message);
    } finally {
      payBtn.disabled = false;
      payBtn.classList.remove('loading');
      payBtn.textContent = "Pay / Confirm Booking";
    }
  });
})();
