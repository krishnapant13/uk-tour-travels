import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      notes,
      countryCode,
      bookingDetails,
    } = await req.json();

    // Email transporter configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "krishna555.pant@gmail.com", // Owner's email
      subject: "New Booking Confirmation",
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${mobileNumber}</p>
        <p><strong>Notes:</strong> ${notes}</p>
        <h3>Booking Details</h3>
        <pre>${JSON.stringify(bookingDetails, null, 2)}</pre>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Booking email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending booking email:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to send booking email.",
      error,
    });
  }
}
