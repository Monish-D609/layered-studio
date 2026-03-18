const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// POST /send-email
app.post("/send-email", async (req, res) => {
    const {
        fullName,
        email,
        phone,
        budget,
        projectDetails,
        selectedDate,
        selectedTime,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !budget) {
        return res
            .status(400)
            .json({ success: false, error: "Missing required fields." });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Client Inquiry – Layered Studio",
        text: `
----------------------------------------
NEW FORM SUBMISSION

Client Details:
Name: ${fullName}
Email: ${email}
Phone: ${phone}

Project Info:
Budget: ${budget}
Details: ${projectDetails || "Not provided"}

Call Schedule:
Date: ${selectedDate || "Not selected"}
Time: ${selectedTime || "Not selected"}
----------------------------------------
`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.json({ success: true });
    } catch (err) {
        console.error("Email send error:", err);
        return res.status(500).json({ success: false, error: "Failed to send email." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
