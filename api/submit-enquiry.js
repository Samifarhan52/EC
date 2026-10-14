/**
 * Serverless API Endpoint: /api/submit-enquiry
 * Handles student admission enquiries, sends alerts to counselors,
 * and sends confirmation acknowledgment to student via Nodemailer / Resend.
 */

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const {
      fullName = 'Applicant',
      phone = '',
      email = '',
      programLevel = 'UG & PG',
      course = 'Academic Program',
      college = 'Premier Institution',
      studyDestination = 'India',
      source = 'Website Form',
      refId = 'TEC-' + Math.floor(100000 + Math.random() * 900000),
      timestamp = new Date().toISOString()
    } = req.body || {};

    console.log(`[Lead Ingestion] New admission inquiry: ${refId} - ${fullName} (${phone}) for ${course} at ${college}`);

    const counselorEmail = process.env.COUNSELOR_EMAIL || 'enquiry@theeduconsultant.com';
    let studentEmailSent = false;
    let counselorEmailSent = false;
    let emailProvider = 'none';

    // 1. Method A: Nodemailer with Gmail SMTP or Custom SMTP
    const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      try {
        emailProvider = 'nodemailer-smtp';
        const transporter = nodemailer.createTransport({
          service: process.env.SMTP_SERVICE || 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        // 1A. Send Confirmation to Student
        if (email) {
          await transporter.sendMail({
            from: `"The Edu Consultant Admissions" <${smtpUser}>`,
            to: email,
            subject: `🎓 Admission Enquiry Confirmed (Ref: ${refId}) | The Edu Consultant`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h2 style="color: #0b0f3b; margin: 0; font-size: 1.5rem;">THE EDU CONSULTANT</h2>
                  <p style="color: #d97706; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;">Academic Strategies | Admission Counselling</p>
                </div>
                
                <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 14px; border-radius: 6px; margin-bottom: 20px;">
                  <h3 style="color: #15803d; margin: 0 0 6px; font-size: 1.1rem;">Dear ${fullName}, Your Enquiry is Confirmed!</h3>
                  <p style="color: #166534; font-size: 0.9rem; margin: 0;">We have received your admission enquiry for <strong>${course}</strong> at <strong>${college}</strong>.</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 0.9rem;">
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 8px 0; color: #64748b;">Reference ID:</td>
                    <td style="padding: 8px 0; font-weight: 700; color: #2563eb;">${refId}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 8px 0; color: #64748b;">Registered Phone:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">+91 ${phone}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 8px 0; color: #64748b;">Academic Program:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${course}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 8px 0; color: #64748b;">Preferred College:</td>
                    <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${college}</td>
                  </tr>
                </table>

                <div style="background: #eff6ff; border-radius: 8px; padding: 14px; margin-bottom: 20px;">
                  <h4 style="color: #1e40af; margin: 0 0 6px; font-size: 0.95rem;">Next Steps &amp; Priority Callback:</h4>
                  <p style="color: #1e3a8a; font-size: 0.85rem; margin: 0; line-height: 1.5;">
                    One of our Senior Academic Counselors will call you shortly on <strong>+91 ${phone}</strong> to verify seat availability, review cutoff criteria, and provide complete transparent fee matrices.
                  </p>
                </div>

                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                
                <div style="font-size: 0.82rem; color: #64748b; line-height: 1.6;">
                  <strong>Official Consultation Desk:</strong><br>
                  Helpline: +91 98453 71459 | +91 88840 58214 | +91 80508 54448<br>
                  Email: enquiry@theeduconsultant.com | Website: https://ec-puce-two.vercel.app<br>
                  Ashok Nagar, Bengaluru, Karnataka 560025
                </div>
              </div>
            `
          });
          studentEmailSent = true;
        }

        // 1B. Send Alert to Counselors
        await transporter.sendMail({
          from: `"The Edu Consultant Leads" <${smtpUser}>`,
          to: counselorEmail,
          subject: `🚨 NEW ADMISSION LEAD: ${fullName} - ${course} (${college})`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0b0f3b; margin-top: 0;">New Admission Lead Registered</h2>
              <p><strong>Ref ID:</strong> ${refId}</p>
              <p><strong>Student Name:</strong> ${fullName}</p>
              <p><strong>Phone / WhatsApp:</strong> <a href="https://wa.me/91${phone.replace(/\D/g, '')}">+91 ${phone} (Chat on WhatsApp)</a></p>
              <p><strong>Email:</strong> ${email || 'Not provided'}</p>
              <p><strong>Program Level:</strong> ${programLevel}</p>
              <p><strong>Course:</strong> ${course}</p>
              <p><strong>Target College:</strong> ${college}</p>
              <p><strong>Study Destination:</strong> ${studyDestination}</p>
              <p><strong>Source Form:</strong> ${source}</p>
              <p><strong>Time:</strong> ${timestamp}</p>
            </div>
          `
        });
        counselorEmailSent = true;

      } catch (smtpErr) {
        console.error('Nodemailer SMTP error:', smtpErr);
      }
    }

    // 2. Method B: Resend REST API (if RESEND_API_KEY is configured)
    if (!studentEmailSent && process.env.RESEND_API_KEY && email) {
      try {
        emailProvider = 'resend-api';
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'The Edu Consultant <onboarding@resend.dev>',
            to: [email],
            subject: `🎓 Admission Enquiry Confirmed (Ref: ${refId}) | The Edu Consultant`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #0b0f3b;">Dear ${fullName},</h2>
                <p>Your admission enquiry (Ref: <strong>${refId}</strong>) for <strong>${course}</strong> at <strong>${college}</strong> has been received by The Edu Consultant.</p>
                <p>One of our Senior Academic Counselors will call you back shortly on <strong>+91 ${phone}</strong> to guide you through seat quota allocation, cutoff reviews, and transparent fee structures.</p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                <p style="font-size: 0.85rem; color: #64748b;">
                  <strong>Official Consultation Desk:</strong><br>
                  Helpline: +91 98453 71459 | +91 88840 58214 | +91 80508 54448<br>
                  Website: <a href="https://ec-puce-two.vercel.app">The Edu Consultant</a>
                </p>
              </div>
            `
          })
        });
        if (resendRes.ok) studentEmailSent = true;
      } catch (resendErr) {
        console.error('Resend dispatch error:', resendErr);
      }
    }

    // 3. Method C: Google Apps Script Web App Relay (Google Sheet sync & enquiry@theeduconsultant.com email)
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL || req.body.googleScriptUrl;
    let googleSheetSynced = false;

    if (googleScriptUrl) {
      try {
        emailProvider = 'google-apps-script';
        const gScriptRes = await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName,
            phone,
            email,
            programLevel,
            course,
            college,
            studyDestination,
            source,
            refId,
            timestamp
          })
        });
        if (gScriptRes.ok) {
          googleSheetSynced = true;
          studentEmailSent = true;
        }
      } catch (gErr) {
        console.error('Google Apps Script relay error:', gErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: studentEmailSent 
        ? 'Enquiry registered, synced to Google Sheet, and confirmation email sent to student' 
        : 'Enquiry registered in system.',
      refId,
      studentEmailSent,
      counselorEmailSent,
      googleSheetSynced,
      emailProvider,
      lead: {
        fullName,
        phone,
        email,
        programLevel,
        course,
        college,
        studyDestination,
        source,
        timestamp
      }
    });

  } catch (error) {
    console.error('API submit error:', error);
    return res.status(500).json({ error: 'Internal server error processing enquiry' });
  }
};
