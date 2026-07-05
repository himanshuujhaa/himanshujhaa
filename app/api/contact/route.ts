import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    let body;
    try {
        body = await req.json();
    } catch (error) {
        console.error("Failed to parse JSON body:", error);
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 }
        );
    }

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        console.log("Contact Form Submission: ", body);

        const { data, error } = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: "himanshuprincejha2001@gmail.com",
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Message from Portfolio Contact Form</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
            `,
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data
        });
    } catch (error) {
        console.error("Failed to send contact email via Resend:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}