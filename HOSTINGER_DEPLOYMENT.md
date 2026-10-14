# 🚀 Hostinger Deployment Guide for The Edu Consultant

This static portal is 100% pre-configured and production-ready for deployment on **Hostinger Web Hosting** (or Hostinger Cloud / VPS with LiteSpeed or Apache).

---

## 📁 Key Files Configured for Hostinger

| File | Purpose |
|------|---------|
| `.htaccess` | Clean URLs (`/enquiry`, `/fee-structure`), HTTPS enforcement, Gzip/Brotli compression, Cache-Control, and security headers |
| `404.html` | Custom branded error page when a visitor mistypes a URL |
| `robots.txt` | Instructions for Google / Bing search engines (blocks admin leads page, points to sitemap) |
| `sitemap.xml` | XML sitemap for SEO indexing of all pages |
| `index.html` | Main homepage with flipping cities (`Bangalore`, `Mumbai`, `Pune`, `Abroad`), dynamic college flipper, search bar |
| `enquiry.html` | Modernized Direct Admissions 2027 consultation & registration portal |
| `fee-structure.html` | Verified university fee structure download schedule portal |
| `privacy-policy.html` | Systematically aligned data privacy and confidentiality policy |
| `terms-of-service.html` | Systematically aligned terms of service & advisory regulations |
| `leads.html` | Internal counselor lead tracker with Google Sheets webhook integration & Excel export |
| `GoogleSheet_AppsScript.js` | Apps Script webhook backend for instant Google Sheets sync |

---

## 🛠️ Deployment Methods

### Option 1: Via Hostinger File Manager (Quickest - 2 Minutes)

1. Log into your **Hostinger hPanel** (`https://hpanel.hostinger.com/`).
2. Go to **Websites** &rarr; click **Manage** next to your domain (`theeduconsultant.in`).
3. Click on **File Manager** (Files &rarr; File Manager).
4. Navigate into the **`public_html`** folder.
5. If there is a default `default.php` file from Hostinger, delete it.
6. Upload the files and folders from this project directly into `public_html`:
   - `index.html`, `enquiry.html`, `fee-structure.html`, `privacy-policy.html`, `terms-of-service.html`, `leads.html`, `404.html`
   - `.htaccess`, `robots.txt`, `sitemap.xml`
   - Folders: `css/`, `js/`, `images/`
7. Ensure that `.htaccess` is uploaded (enable "Show hidden files" in Hostinger File Manager settings if `.htaccess` is not visible).
8. Visit your domain: `https://theeduconsultant.in/` — it's immediately live!

---

### Option 2: Via Git Deployment in Hostinger hPanel

If you have connected your GitHub repository (`https://github.com/Samifarhan52/EC`):
1. In Hostinger hPanel, go to **Advanced** &rarr; **Git**.
2. Set Repository: `https://github.com/Samifarhan52/EC.git`
3. Branch: `main`
4. Directory: `/public_html`
5. Click **Create** &rarr; click **Deploy**.
6. Every time you push to `main`, Hostinger can automatically auto-deploy!

---

### Option 3: Via FTP (FileZilla or Cyberduck)

1. Hostinger hPanel &rarr; **Files** &rarr; **FTP Accounts**.
2. Note your FTP Host (e.g. `ftp.theeduconsultant.in`), Username, and Password.
3. Connect via FileZilla on Port 21.
4. Drag and drop all project files into `/public_html/`.

---

## 🔒 SSL & HTTPS Configuration on Hostinger

Hostinger provides a **Free Lifetime SSL Certificate**:
1. In hPanel, navigate to **Security** &rarr; **SSL**.
2. Check that your domain status shows **Active (Installed)**.
3. The `.htaccess` file automatically redirects all HTTP traffic to HTTPS (`RewriteCond %{HTTPS} off`).

---

## 📱 Verification Checklist

After deploying to Hostinger, verify the following:
- [x] **Hero Flipping Title**: "Get your admission in Top Colleges in [Bangalore / Mumbai / Pune / Abroad]." cycles smoothly every 2 seconds.
- [x] **Top Offer Banner**: Rich educational warm amber-orange theme (no blue).
- [x] **Glossy Buttons**: Header CTA, Hero CTA, and Submit buttons reflect light with glossy top sheen.
- [x] **Privacy Policy & Terms of Service**: Accessible via footer links or `/privacy-policy` and `/terms-of-service`.
- [x] **Dual WhatsApp Routing**: Form submissions open WhatsApp to `+91 98453 71459` and `+91 88840 58214`.
- [x] **Google Sheet Sync**: Leads post to your Google App Script webhook automatically.
