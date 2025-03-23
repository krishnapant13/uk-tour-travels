import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
  try {
    const { encryptedData } = await req.json();

    if (!encryptedData) {
      return NextResponse.json({
        success: false,
        message: "No encrypted data received.",
      });
    }

    const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;

    let decryptedFormData;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedText) {
        throw new Error("Decryption failed.");
      }

      decryptedFormData = JSON.parse(decryptedText);
    } catch (error) {
      console.error("Decryption failed:", error);
      return NextResponse.json({
        success: false,
        message: "Failed to decrypt form data.",
      });
    }

    const { email, phone, message } = decryptedFormData;

    if (!email || !phone || !message) {
      return NextResponse.json({
        success: false,
        message: "Missing required form fields.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "uttarakhandtravel4u@gmail.com",
      subject: "New Enquiry Request",
      text: `New enquiry received:\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to send email.",
    });
  }
}
