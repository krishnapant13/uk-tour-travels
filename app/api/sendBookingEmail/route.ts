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
      decryptedFormData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Decryption failed:", error);
      return NextResponse.json({
        success: false,
        message: "Failed to decrypt form data.",
        error: (error as Error).message,
      });
    }

    const {
      fullName,
      email,
      mobileNumber,
      notes,
      countryCode,
      bookingDetails,
    } = decryptedFormData;

    if (!bookingDetails) {
      return NextResponse.json({
        success: false,
        message: "Booking details missing!",
      });
    }

    const {
      fromData,
      toData,
      attractionData,
      departureTime,
      passengers,
      days,
      vehicle,
      transport,
      fromLatData,
      fromLonData,
      toLatData,
      toLonData,
      attractionLatData,
      attractionLonData,
    } = bookingDetails;

    const destination = toData || attractionData || "N/A";
    const destinationLat = toLatData || attractionLatData;
    const destinationLon = toLonData || attractionLonData;

    const googleMapsLink =
      fromLatData && fromLonData && destinationLat && destinationLon
        ? `https://www.google.com/maps/dir/${fromLatData},${fromLonData}/${destinationLat},${destinationLon}`
        : "#";

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Send booking email to business
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "🛻 New Booking Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px #ccc;">
          <h2 style="color: #007BFF; text-align: center;">
            <span style="font-weight: bold; color: #FFD700;">${transport}</span> Booking from ${fullName}
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Full Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${countryCode} ${mobileNumber}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Notes:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                notes || "N/A"
              }</td>
            </tr>
          </table>

          <h3 style="color: #28A745; margin-top: 20px;">📍 Route Details</h3>
          <p><strong>From:</strong> ${fromData || "N/A"}</p>
          <p><strong>To:</strong> ${destination || "N/A"}</p>

          <h3 style="color: #17A2B8; margin-top: 20px;">📅 Booking Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Departure:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                departureTime || "N/A"
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Passengers:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                passengers || "N/A"
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Days:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${
                days || "N/A"
              }</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Vehicle:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">
                <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                  <img src="${
                    vehicle?.image || "https://via.placeholder.com/100"
                  }" alt="${vehicle?.name || "Vehicle"}" 
                  style="width: 150px; height: auto; border-radius: 5px;" />
                  <div>
                    <strong>${vehicle?.name || "N/A"}</strong><br />
                    Price: ₹${vehicle?.price || "N/A"}
                  </div>
                </div>
              </td>
            </tr>
          </table>

          ${
            googleMapsLink !== "#"
              ? `
            <div style="text-align: center; margin-top: 20px;">
                  <a href="${googleMapsLink}" target="_blank" 
                    style="display: inline-block; background: #007BFF; color: #fff; text-decoration: none; 
                    padding: 12px 25px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                    View Route on Google Maps
                  </a>
                </div>`
              : ""
          }

          <p style="margin-top: 20px; color: #555; text-align: center;">Thank you for using our service!</p>
        </div>
      `,
    };

    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🌟 Travel Request Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 40px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 15px #ccc;">
    
          <!-- Logo Section -->
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://www.uttarakhandtravelss.com/android-chrome-512x512.png" 
              alt="Uttarakhand Travels Logo" 
              style="width: 120px; height: 120px; border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          </div>
    
          <!-- Header -->
          <h2 style="text-align: center; color: #007BFF; margin-bottom: 20px;">🌟 Thank You, ${fullName}!</h2>
    
          <!-- Message Section -->
          <p style="text-align: center; font-size: 18px; color: #555;">
            Your travel request has been received. Our team will contact you shortly.
          </p>
    
          <!-- Booking Details -->
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <h3 style="color: #28A745; margin-bottom: 10px;">📄 Travel Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>📞 Contact:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${countryCode} ${mobileNumber}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>✉️ Email:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px;"><strong>📍 From:</strong></td>
                <td style="padding: 10px;">${
                  bookingDetails?.fromData || "N/A"
                }</td>
              </tr>
              <tr>
                <td style="padding: 10px;"><strong>🚩 To:</strong></td>
                <td style="padding: 10px;">${
                  bookingDetails?.toData || "N/A"
                }</td>
              </tr>
            </table>
          </div>
    
          <!-- Footer -->
          <p style="text-align: center; color: #777; font-size: 14px; margin-top: 30px;">
            🚗 <strong>Uttarakhand Tour & Travels</strong> <br>
            Thank you for choosing us for your travel needs!
          </p>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(confirmationEmail),
    ]);

    return NextResponse.json({
      success: true,
      message: "Booking and confirmation emails sent!",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to send emails.",
    });
  }
}
