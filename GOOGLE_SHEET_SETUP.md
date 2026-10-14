# 📊 Google Sheets & Apps Script Integration Guide
## The Edu Consultant — Live Admissions Lead Tracking & Email Automation

This guide explains how to connect your **Google Sheets (Excel)** to the live website so that:
1. Every admission lead submitted on **The Edu Consultant** is automatically recorded in your Google Sheet in real time.
2. The student receives an official confirmation email from **`enquiry@theeduconsultant.com`**.
3. Counselors receive an instant lead alert email with one-click WhatsApp chat link.
4. You can export leads to Microsoft Excel (`.xlsx`) or CSV anytime with 1 click.

## 🚀 Active Production Webhook URL
The live Google Apps Script webhook is configured and active across all forms:
```
https://script.google.com/macros/s/AKfycbyXnFbX5MJTcTOv9bEhUy4xU1nnfCBHjBXMflmZJCC7m0aNzH3vV7WIkbt8kgRB57c/exec
```

---

## ⚡ 60-Second Setup Instructions

### Step 1: Create a Google Sheet
1. Open your browser and go to: **[sheets.new](https://sheets.new)**
2. Rename the spreadsheet to: `The Edu Consultant - Admissions Leads 2027`

---

### Step 2: Open Google Apps Script
1. In your Google Sheet top menu, click:  
   **Extensions** ➔ **Apps Script**
2. In the code editor, delete any existing code (`function myFunction() {}`).
3. Copy the entire code from **[`GoogleSheet_AppsScript.js`](./GoogleSheet_AppsScript.js)** and paste it into the editor.
4. Click the **Save** icon (disk icon or `Cmd + S` / `Ctrl + S`).

---

### Step 3: Deploy as a Web App
1. At the top right of the Apps Script window, click the blue **Deploy** button ➔ **New deployment**.
2. Click the gear icon (**Select type**) ➔ choose **Web app**.
3. Set the deployment fields:
   - **Description**: `The Edu Consultant Web Ingestion`
   - **Execute as**: `Me (your-email@...)`
   - **Who has access**: **`Anyone`** *(Essential so the website can submit leads without login)*
4. Click **Deploy**.
5. Google will ask you to **Authorize access**:
   - Click **Authorize access**.
   - Select your Google account.
   - Click **Advanced** ➔ **Go to Untitled project (unsafe)** ➔ Click **Allow**.
6. **Copy the Web App URL** (it will look like:  
   `https://script.google.com/macros/s/AKfycbx.../exec`).

---

### Step 4: Connect to The Edu Consultant Portal
1. Go to the Leads Dashboard:  
   **[`https://ec-puce-two.vercel.app/leads`](https://ec-puce-two.vercel.app/leads)**
2. In the green **Live Google Sheets & Apps Script Email Automation** card:
   - Paste your Web App URL into the text box.
   - Click **Save & Connect**.
3. Click **Test Sync & Email**:
   - Check your Google Sheet: A test row will appear instantly with deep academic navy headers!
   - Check your email: A test email will arrive with the subject:  
     `🎓 Admission Enquiry Confirmed | The Edu Consultant`.

---

## 📩 Sending Emails from `enquiry@theeduconsultant.com`
Google Apps Script automatically uses `enquiry@theeduconsultant.com` as the sender and reply-to:
- **Default**: Emails are sent with sender name **"The Edu Consultant"** and `Reply-To: enquiry@theeduconsultant.com`.
- **Custom Domain Alias**: If your Google Workspace account or Gmail has `enquiry@theeduconsultant.com` configured in **Gmail Settings ➔ Accounts ➔ Send mail as**, the script will automatically send *directly* `From: enquiry@theeduconsultant.com`.

---

## 📥 Exporting Leads to Excel (.xlsx)
From your Google Sheet:
- Click **File** ➔ **Download** ➔ **Microsoft Excel (.xlsx)** or **Comma Separated Values (.csv)**.
- You can also export leads directly from the website dashboard at `https://ec-puce-two.vercel.app/leads` by clicking the green **Export to Excel (.xlsx)** button.
