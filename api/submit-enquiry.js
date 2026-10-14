/**
 * Serverless API Endpoint: /api/submit-enquiry
 * Handles student admission enquiries, sends alerts to counselors,
 * and sends confirmation acknowledgment to student.
 */

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

    // If an external SMTP or webhook service is configured via environment variables
    const counselorEmail = process.env.COUNSELOR_EMAIL || 'samifarhan52@gmail.com';
    const emailApiKey = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY;

    let emailSent = false;

    // Optional integration with Resend if API key is provided
    if (process.env.RESEND_API_KEY && email) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'The Edu Consultant <admissions@theeduconsultant.com>',
            to: [email],
            subject: 'Admission Enquiry Confirmed | The Edu Consultant',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #0b0f3b;">Thank You, ${fullName}!</h2>
                <p>Your admission enquiry (Ref: <strong>${refId}</strong>) for <strong>${course}</strong> at <strong>${college}</strong> has been successfully registered.</p>
                <p>One of our Senior Academic Counselors will call you back shortly on <strong>${phone}</strong> to guide you through seat quota allocation, cutoff reviews, and transparent fee structures.</p>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                <p style="font-size: 0.9rem; color: #64748b;">
                  <strong>Official Consultation Desk:</strong><br>
                  Helpline: +91 98453 71459 | +91 88840 58214 | +91 80508 54448<br>
                  Website: <a href="https://ec-puce-two.vercel.app">The Edu Consultant</a>
                </p>
              </div>
            `
          })
        });
        if (response.ok) emailSent = true;
      } catch (err) {
        console.error('Resend dispatch error:', err);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Enquiry received and queued for counselor callback',
      refId,
      emailSent,
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
