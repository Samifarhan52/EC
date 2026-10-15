/**
 * ============================================================================
 * THE EDU CONSULTANT - GOOGLE APPS SCRIPT FOR GOOGLE SHEETS & EMAIL AUTOMATION
 * ============================================================================
 * This script runs inside Google Sheets (Extensions -> Apps Script).
 * 1. Automatically logs all student leads from the website in real time.
 * 2. Sends confirmation email to the student from enquiry@theeduconsultant.com.
 * 3. Sends instant lead alerts to the counselors.
 * 4. Enables 1-click Export to Excel / CSV from Google Sheets.
 */

// 1. Initial Setup Menu in Google Sheets
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('🎓 The Edu Consultant')
    .addItem('1. Initialize Sheet Headers', 'setupSheetHeaders')
    .addItem('2. Test Student Confirmation Email', 'sendTestEmail')
    .addItem('3. Test Counselor Lead Alert Email', 'sendTestCounselorAlert')
    .addToUi();
}

/**
 * Initializes and formats Google Sheet headers with professional academic branding
 */
function setupSheetHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.setName('Admissions Leads 2027');

  var headers = [
    'Timestamp',
    'Lead Ref ID',
    'Student Full Name',
    'Mobile / WhatsApp',
    'Email Address',
    'Program Level',
    'Course / Academic Stream',
    'Target College / University',
    'Study Destination',
    'Source Form',
    'Counselor Status',
    'Counselor Notes'
  ];

  // Set headers in Row 1
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format Header Row: Deep Academic Navy background with Bold White text
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#0b0f3b');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setFontFamily('Arial');
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment('center');
  
  // Freeze Header Row
  sheet.setFrozenRows(1);
  
  // Auto-fit column widths
  for (var col = 1; col <= headers.length; col++) {
    sheet.autoResizeColumn(col);
  }

  SpreadsheetApp.getUi().alert('Success! Headers have been configured for The Edu Consultant Admissions Leads.');
}

/**
 * Handles incoming HTTP POST requests from the website
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Acquire a lock with a 15-second timeout to handle concurrent requests safely
    lock.waitLock(15000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming data
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var now = new Date();
    var refId = data.refId ? String(data.refId).trim() : ('TEC-' + Math.floor(100000 + Math.random() * 900000));
    var fullName = data.fullName || data.name || 'Student';
    var phone = data.phone || '';
    var email = data.email || '';
    var programLevel = data.programLevel || 'UG & PG';
    var course = data.course || 'Academic Program';
    var college = data.college || 'Premier Institution';
    var destination = data.studyDestination || data.destination || 'India';
    var source = data.source || 'Website Enquiry Form';
    var status = data.status || 'New';
    var notes = '';

    // =========================================================================
    // DEDUPLICATION GATE: Prevent duplicate entries in Google Sheets
    // =========================================================================
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      // 1. Check if this Ref ID is already recorded in Column B (rows 2 to lastRow)
      if (refId) {
        var existingRefs = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
        for (var i = 0; i < existingRefs.length; i++) {
          var existingRef = String(existingRefs[i][0]).trim();
          if (existingRef && existingRef === refId) {
            // Already logged! Skip appending duplicate row and do not resend emails.
            return ContentService.createTextOutput(JSON.stringify({
              status: 'duplicate_skipped',
              refId: refId,
              message: 'Lead with Ref ID ' + refId + ' already exists in Google Sheets. Duplicate skipped.'
            })).setMimeType(ContentService.MimeType.JSON);
          }
        }
      }

      // 2. Secondary check: Rapid duplicate submission by same phone within 60 seconds
      if (phone) {
        var cleanPhone = String(phone).replace(/[^0-9]/g, '');
        var lastPhone = String(sheet.getRange(lastRow, 4).getValue()).replace(/[^0-9]/g, '');
        var lastTimeVal = sheet.getRange(lastRow, 1).getValue();
        if (cleanPhone && cleanPhone === lastPhone && lastTimeVal instanceof Date) {
          var secondsDiff = (now.getTime() - lastTimeVal.getTime()) / 1000;
          if (secondsDiff < 60) {
            return ContentService.createTextOutput(JSON.stringify({
              status: 'duplicate_skipped',
              refId: refId,
              message: 'Lead for phone ' + phone + ' was already recorded ' + Math.round(secondsDiff) + 's ago. Duplicate skipped.'
            })).setMimeType(ContentService.MimeType.JSON);
          }
        }
      }
    }

    // 1. Append the row to Google Sheets
    sheet.appendRow([
      now,
      refId,
      fullName,
      phone,
      email,
      programLevel,
      course,
      college,
      destination,
      source,
      status,
      notes
    ]);

    // 2. Send Official Confirmation Email to Student from enquiry@theeduconsultant.com
    if (email && email.indexOf('@') !== -1) {
      sendStudentConfirmationEmail(email, fullName, phone, course, college, refId);
    }

    // 3. Send Instant Lead Notification Alert to Counselors
    sendCounselorAlertEmail(refId, fullName, phone, email, course, college, destination, source);

    // 4. Return JSON response to caller
    var responseOutput = ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      refId: refId,
      message: 'Enquiry logged in Google Sheets, student confirmation email sent, and counselor alert dispatched.'
    })).setMimeType(ContentService.MimeType.JSON);

    return responseOutput;

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    try {
      lock.releaseLock();
    } catch (lockErr) {}
  }
}

/**
 * Handles GET requests (for testing or webhook verification)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'active',
    portal: 'The Edu Consultant - Admissions Google Sheet Automation',
    officialEmail: 'enquiry@theeduconsultant.com'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Sends branded HTML confirmation email to the student
 */
function sendStudentConfirmationEmail(toEmail, fullName, phone, course, college, refId) {
  var subject = "🎓 Admission Enquiry Confirmed (Ref: " + refId + ") | The Edu Consultant";
  
  var htmlBody = 
    '<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">' +
      '<div style="text-align: center; margin-bottom: 24px; border-bottom: 2px solid #f1f5f9; padding-bottom: 16px;">' +
        '<h2 style="color: #0b0f3b; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 0.5px;">THE EDU CONSULTANT</h2>' +
        '<p style="color: #d97706; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 4px;">Academic Strategies | Admission Counselling</p>' +
      '</div>' +

      '<div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; border-radius: 8px; margin-bottom: 22px;">' +
        '<h3 style="color: #15803d; margin: 0 0 6px; font-size: 16px; font-weight: 800;">Dear ' + fullName + ', Your Admission Enquiry is Received!</h3>' +
        '<p style="color: #166534; font-size: 13.5px; margin: 0; line-height: 1.5;">Thank you for contacting <strong>The Edu Consultant</strong>. Your application has been logged with Reference ID <strong style="color: #2563eb;">' + refId + '</strong>.</p>' +
      '</div>' +

      '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; margin-bottom: 22px;">' +
        '<div style="font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">Registered Admission Details</div>' +
        '<table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">' +
          '<tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 7px 0; color: #64748b; font-weight: 600;">Student Name:</td><td style="padding: 7px 0; font-weight: 700; color: #0f172a;">' + fullName + '</td></tr>' +
          '<tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 7px 0; color: #64748b; font-weight: 600;">Registered Phone:</td><td style="padding: 7px 0; font-weight: 700; color: #0f172a;">+91 ' + phone + '</td></tr>' +
          '<tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 7px 0; color: #64748b; font-weight: 600;">Course / Academic Stream:</td><td style="padding: 7px 0; font-weight: 700; color: #0f172a;">' + course + '</td></tr>' +
          '<tr><td style="padding: 7px 0; color: #64748b; font-weight: 600;">Target College / University:</td><td style="padding: 7px 0; font-weight: 700; color: #0f172a;">' + college + '</td></tr>' +
        '</table>' +
      '</div>' +

      '<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 16px; margin-bottom: 22px;">' +
        '<h4 style="color: #1e40af; margin: 0 0 6px; font-size: 14px; font-weight: 800;">Senior Counselor Callback:</h4>' +
        '<p style="color: #1e3a8a; font-size: 13px; margin: 0; line-height: 1.5;">' +
          'Our Senior Academic Counselors will call you back shortly on <strong>+91 ' + phone + '</strong> to verify direct seat quota availability, guide you through cutoff requirements, and provide transparent institutional fee schedules.' +
        '</p>' +
      '</div>' +

      '<div style="border-top: 1px solid #e2e8f0; padding-top: 18px; font-size: 12.5px; color: #64748b; line-height: 1.6;">' +
        '<strong>Official Consultation Desk:</strong><br>' +
        '• 9845371459 — Bangalore & Abroad Counsellor<br>' +
        '• 8884058241 — Bangalore - Counsellor<br>' +
        '• 9731998555 — Entrance prep<br>' +
        'Official Email: <a href="mailto:enquiry@theeduconsultant.com" style="color: #2563eb; text-decoration: none; font-weight: bold;">enquiry@theeduconsultant.com</a><br>' +
        'Office: Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025<br>' +
        'Website: <a href="https://ec-puce-two.vercel.app" style="color: #2563eb; text-decoration: none; font-weight: bold;">The Edu Consultant Official Portal</a>' +
      '</div>' +
    '</div>';

  var mailOptions = {
    name: "The Edu Consultant",
    replyTo: "enquiry@theeduconsultant.com",
    htmlBody: htmlBody
  };

  // Check if enquiry@theeduconsultant.com is configured as alias
  var aliases = GmailApp.getAliases();
  for (var i = 0; i < aliases.length; i++) {
    if (aliases[i].toLowerCase() === "enquiry@theeduconsultant.com") {
      mailOptions.from = "enquiry@theeduconsultant.com";
      break;
    }
  }

  GmailApp.sendEmail(toEmail, subject, "", mailOptions);
}

/**
 * Test function to verify email delivery from Apps Script
 */
function sendTestEmail() {
  var userEmail = Session.getActiveUser().getEmail();
  sendStudentConfirmationEmail(
    userEmail,
    "Test Applicant",
    "9845371459",
    "B.Tech Computer Science & Engineering",
    "RV College of Engineering (RVCE)",
    "TEC-TEST01"
  );
  SpreadsheetApp.getUi().alert("Test email dispatched to " + userEmail + " with reply-to enquiry@theeduconsultant.com");
}

/**
 * Sends instant lead notification email to Counselors
 */
function sendCounselorAlertEmail(refId, fullName, phone, email, course, college, destination, source) {
  var counselorEmail = "enquiry@theeduconsultant.com";
  var ownerEmail = "";
  try {
    ownerEmail = Session.getActiveUser().getEmail();
  } catch (e) {}

  var recipients = [counselorEmail];
  if (ownerEmail && ownerEmail.indexOf('@') !== -1 && ownerEmail.toLowerCase() !== counselorEmail.toLowerCase()) {
    recipients.push(ownerEmail);
  }

  var subject = "🚨 NEW ADMISSION LEAD: " + fullName + " - " + course + " (" + college + ") [Ref: " + refId + "]";
  var cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
  var waLink = "https://wa.me/91" + cleanPhone;

  var htmlBody = 
    '<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">' +
      '<div style="background: #0b0f3b; color: #ffffff; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">' +
        '<h3 style="margin: 0; font-size: 18px; font-weight: 800;">🚨 NEW ADMISSION ENQUIRY RECEIVED</h3>' +
        '<p style="margin: 4px 0 0; font-size: 12px; color: #fbbf24; font-weight: 700;">Immediate counselor follow-up required</p>' +
      '</div>' +
      '<table style="width: 100%; border-collapse: collapse; font-size: 13.5px; margin-bottom: 20px;">' +
        '<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Lead Ref ID:</td><td style="padding: 8px 0; font-weight: 800; color: #2563eb;">' + refId + '</td></tr>' +
        '<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Student Name:</td><td style="padding: 8px 0; font-weight: 700; color: #0f172a;">' + fullName + '</td></tr>' +
        '<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Mobile Phone:</td><td style="padding: 8px 0; font-weight: 700; color: #0f172a;">+91 ' + phone + '</td></tr>' +
        '<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td><td style="padding: 8px 0; font-weight: 600; color: #0f172a;">' + (email || 'Not provided') + '</td></tr>' +
        '<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Course / Stream:</td><td style="padding: 8px 0; font-weight: 700; color: #0f172a;">' + course + '</td></tr>' +
        '<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Target College:</td><td style="padding: 8px 0; font-weight: 700; color: #0f172a;">' + college + '</td></tr>' +
        '<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Study Destination:</td><td style="padding: 8px 0; font-weight: 600; color: #0f172a;">' + destination + '</td></tr>' +
        '<tr><td style="padding: 8px 0; color: #64748b; font-weight: 600;">Source Form:</td><td style="padding: 8px 0; font-weight: 600; color: #0f172a;">' + source + '</td></tr>' +
      '</table>' +
      '<div style="margin-bottom: 20px;">' +
        '<a href="' + waLink + '" style="display: inline-block; background: #25d366; color: #ffffff; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; text-decoration: none;">💬 Open WhatsApp Chat (+91 ' + phone + ')</a>' +
      '</div>' +
      '<div style="font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 12px;">' +
        'This lead has been saved to the Google Sheet tracker. Counselors can export to Excel (.xlsx) at any time from File &rarr; Download &rarr; Microsoft Excel.' +
      '</div>' +
    '</div>';

  try {
    GmailApp.sendEmail(recipients.join(','), subject, "", {
      name: "The Edu Consultant Leads Alert",
      replyTo: "enquiry@theeduconsultant.com",
      htmlBody: htmlBody
    });
  } catch (err) {
    console.warn("Counselor alert dispatch error: " + err);
  }
}

/**
 * Test function to verify Counselor alert email
 */
function sendTestCounselorAlert() {
  sendCounselorAlertEmail(
    "TEC-TEST-ALERT",
    "Test Student",
    "9845371459",
    "student@example.com",
    "B.Tech Computer Science (Direct Quota)",
    "RV College of Engineering",
    "Bangalore, India",
    "Test Action"
  );
  SpreadsheetApp.getUi().alert("Test counselor lead alert dispatched to enquiry@theeduconsultant.com");
}

