// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { email, phone } = await req.json();

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // Or any other email provider
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER, // Your own email address
//       subject: "New Enquiry Received",
//       text: `You have a new enquiry:\n\nEmail: ${email}\nPhone: ${phone}`,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return NextResponse.json(
//       { message: "Failed to send email" },
//       { status: 500 }
//     );
//   }
// }
