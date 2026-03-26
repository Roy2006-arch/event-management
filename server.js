const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const path = require("path");

dotenv.config();

const app = express();

// ✅ CORS (allow your frontend)
app.use(
  cors({
    origin: "*", // for demo. Later you can set: "http://127.0.0.1:5500"
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Fix "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Eventify backend is running ✅");
});

// ====================================
// POST: create-order
// ====================================
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount, notes } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ ok: false, message: "Invalid amount" });
    }

    // Razorpay expects amount in paise
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      notes: notes || {},
    };

    const order = await razorpay.orders.create(options);
    return res.json({ ok: true, order });
  } catch (err) {
    console.error("create-order error:", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
});

// ====================================
// POST: verify payment signature
// ====================================
app.post("/api/payment/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ ok: false, message: "Missing fields" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ ok: false, message: "Invalid signature" });
    }

    return res.json({ ok: true, message: "Payment verified ✅" });
  } catch (err) {
    console.error("verify error:", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
