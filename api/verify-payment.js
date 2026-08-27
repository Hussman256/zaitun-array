/* Server-side Flutterwave transaction verification.
   Never trust the client's "payment successful" callback alone — the amount,
   currency and status must be re-checked here against Flutterwave's own record
   before an order is treated as paid. Requires FLW_SECRET_KEY set as an
   environment variable on Vercel (Project Settings > Environment Variables). */
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ status: "error", message: "Method not allowed" });
    return;
  }

  const { transaction_id, tx_ref, expected_amount } = req.body || {};
  if (!transaction_id || !tx_ref || !expected_amount) {
    res.status(400).json({ status: "error", message: "Missing parameters" });
    return;
  }

  const secretKey = process.env.FLW_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ status: "error", message: "Payment verification is not configured" });
    return;
  }

  try {
    const flwRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transaction_id)}/verify`,
      { headers: { Authorization: `Bearer ${secretKey}` } }
    );
    const data = await flwRes.json();
    const tx = data && data.data;

    const verified =
      data.status === "success" &&
      tx &&
      tx.status === "successful" &&
      tx.tx_ref === tx_ref &&
      tx.currency === "NGN" &&
      tx.amount >= Number(expected_amount);

    res.status(verified ? 200 : 400).json({
      status: verified ? "success" : "error",
      message: verified ? undefined : "Payment could not be verified",
    });
  } catch {
    res.status(502).json({ status: "error", message: "Could not reach payment provider" });
  }
};
