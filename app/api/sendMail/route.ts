import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, phone, message } = await req.json();
    console.log(process.env.EMAIL_USER);
    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "krishna555.pant@gmail.com",
      subject: "New Enquiry Request",
      text: `New enquiry received:\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to send email.",
      error,
    });
  }
}
