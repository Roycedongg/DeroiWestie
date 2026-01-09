import nodemailer from "nodemailer";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function esc(s: unknown) {
  return String(s ?? "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
}

function required(body: any, key: string) {
  const v = body?.[key];
  if (typeof v !== "string" || !v.trim()) throw new Error(`Missing field: ${key}`);
  return v.trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // minimal required fields (keep in sync with frontend)
    const name = required(body, "name");
    const cityCountry = required(body, "cityCountry");
    const email = required(body, "email");

    // SMTP config
    const SMTP_HOST = mustEnv("SMTP_HOST");
    const SMTP_PORT = Number(mustEnv("SMTP_PORT"));
    const SMTP_USER = mustEnv("SMTP_USER");
    const SMTP_PASS = mustEnv("SMTP_PASS");

    const MAIL_FROM = mustEnv("MAIL_FROM"); // e.g. "DeRoi Westie <no-reply@deroiwestie.com>"
    const MAIL_TO = mustEnv("MAIL_TO");     // your inbox

    const locale = (body?.locale === "en" ? "en" : "zh") as "zh" | "en";

    const subject =
      locale === "zh"
        ? `【DeRoi Westie】幼犬领养申请 - ${name}`
        : `[DeRoi Westie] Puppy Adoption Application - ${name}`;

    const lines: string[] = [];
    const push = (label: string, value: any) => lines.push(`${label}: ${String(value ?? "")}`);

    push("Name", name);
    push("City/Country", cityCountry);
    push("Email", email);
    push("WeChat/WhatsApp", body?.wechat ?? "");

    push("Housing Type", body?.housingType ?? "");
    push("Ownership", body?.ownership ?? "");
    push("Landlord Allowed", body?.landlordAllowed ?? "");
    push("Yard", body?.yard ?? "");

    push("Hours Alone", body?.aloneHours ?? "");
    push("Travel Often", body?.travelOften ?? "");
    push("Primary Caregiver", body?.primaryCaregiver ?? "");

    push("Had Dog Before", body?.hadDogBefore ?? "");
    push("Had Terrier Before", body?.hadTerrierBefore ?? "");
    push("Knows Hand Stripping", body?.knowsHandStripping ?? "");
    push("Willing Grooming Plan", body?.willingGroomingPlan ?? "");

    push("Purpose", body?.purpose ?? "");
    push("Accept Contract", body?.acceptContract ?? "");
    push("Keep In Touch", body?.keepInTouch ?? "");

    push("Why Westie", body?.whyWestie ?? "");
    push("Why DeRoi", body?.whyDeroi ?? "");
    push("Anything Else", body?.anythingElse ?? "");

    const text = lines.join("\n");

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system; line-height: 1.6;">
        <h2 style="margin:0 0 12px;">${esc(subject)}</h2>
        <pre style="white-space:pre-wrap;background:#f6f7f8;border:1px solid #e5e7eb;border-radius:12px;padding:16px;">${esc(
          text
        )}</pre>
        <p style="color:#6b7280;font-size:12px;margin-top:12px;">Submitted via puppy adoption form (/placement).</p>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true for 465, false for 587/25
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const info = await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email, // 你直接点“回复”就回到买家邮箱
      subject,
      text,
      html,
    });
    console.log("Placement email sent:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    return new Response(
      JSON.stringify({
        ok: true,
        messageId: info.messageId,
        accepted: info.accepted,
        rejected: info.rejected,
      }),
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Placement email failed:", e);
    return new Response(JSON.stringify({ ok: false, error: e?.message || "Unknown error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
