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

    // Extract required details from bookingDetails
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

    // Determine the destination and generate the correct Google Maps link
    const destination = toData || attractionData || "N/A";
    const destinationLat = toLatData || attractionLatData;
    const destinationLon = toLonData || attractionLonData;

    const googleMapsLink =
      fromLatData && fromLonData && destinationLat && destinationLon
        ? `https://www.google.com/maps/dir/${fromLatData},${fromLonData}/${destinationLat},${destinationLon}`
        : "#";

    // Email transporter configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create beautiful HTML email content
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
                <div style="display: flex; flex-direction:"column"; align-items: center; gap: 10px;">
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
            </div>
          `
              : ""
          }

          <p style="margin-top: 20px; color: #555; text-align: center;">Thank you for using our service!</p>
        </div>
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
