import { Resend } from "resend";

export const runtime = "nodejs";

function clean(value, max = 3000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = clean(body.name, 120);
    const email = clean(body.email, 180);
    const phone = clean(body.phone, 80);
    const details = clean(body.details, 4000);

    if (!name || !email || !details) {
      return Response.json(
        { ok: false, message: "Name, email, and delivery details are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from =
      process.env.CONTACT_FROM_EMAIL ||
      "Datz Logistics Website <onboarding@resend.dev>";

    if (!apiKey || !to) {
      console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL.");
      return Response.json(
        { ok: false, message: "Email service is not configured yet." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeDetails = escapeHtml(details).replaceAll("\n", "<br />");

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New Datz Logistics website inquiry — ${name}`,
      text: [
        "New Datz Logistics website inquiry",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        "Delivery details:",
        details
      ].join("\n"),
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;color:#111315;">
          <div style="padding:24px 0;border-bottom:1px solid #d8d8d4;">
            <strong style="font-size:20px;">DATZ LOGISTICS</strong>
            <div style="font-size:12px;color:#6d7376;margin-top:6px;letter-spacing:.08em;">
              WEBSITE DELIVERY INQUIRY
            </div>
          </div>

          <div style="padding:28px 0;">
            <p style="margin:0 0 10px;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin:0 0 10px;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin:0 0 24px;"><strong>Phone:</strong> ${safePhone}</p>

            <div style="font-size:12px;letter-spacing:.08em;color:#6d7376;margin-bottom:8px;">
              DELIVERY DETAILS
            </div>
            <div style="line-height:1.65;padding:18px;background:#f3f2ee;border:1px solid #deddd8;">
              ${safeDetails}
            </div>
          </div>

          <div style="padding-top:18px;border-top:1px solid #d8d8d4;font-size:12px;color:#6d7376;">
            Replying to this email will reply directly to ${safeEmail}.
          </div>
        </div>
      `
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { ok: false, message: "We could not send your message. Please try again." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, id: data?.id ?? null });
  } catch (error) {
    console.error("Contact route error:", error);
    return Response.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
