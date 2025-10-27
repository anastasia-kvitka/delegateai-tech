import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "ivan@warptechnologies.tech",
      to: process.env.NOTIFY_EMAIL!,
      subject: "New DelegateAI Lead",
      html: `<p>New potential client: ${email}</p>`,
    });

    // Optional: send confirmation to user
    await resend.emails.send({
        from: "ivan@warptechnologies.tech",
        to: email,
        subject: "Welcome to DelegateAI 👋",
        html: `
          <h2>Thanks for connecting with DelegateAI!</h2>
          <p>We'll get in touch soon to help you connect your business to ChatGPT.</p>
        `,
      });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log("Resend result:", data);
    return NextResponse.json({ success: true });
  
}
