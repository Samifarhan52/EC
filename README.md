# The Edu Consultant — Official Web Platform 🎓

> **Premier Academic Strategy & Management Quota Admission Advisory (Admissions 2027)**  
> Live Platform: [https://theeduconsultant.in/](https://theeduconsultant.in/) • Test Preparation Portal: [https://studententrance.com/](https://studententrance.com/)

---

## 🌟 Overview

**The Edu Consultant** is an authoritative, high-conversion academic admissions platform built with modern web engineering standards. The platform guides students and parents through authorized institutional management quota seats, direct admission counseling, transparent university fee structures, and global study abroad programs.

---

## ✨ Key Features

- **⚡ Admissions 2027 Live Marquee Banner**:
  - High-visibility glowing live status badge (`Admissions 2027 Live`).
  - Seamless dual-direction marquee loops displaying real-time seat matrices across Christ, St. Joseph's, VIT, RVCE, BMSCE, and Dayananda Sagar.
  - Interactive "Apply Now" and "Check Seats" click-to-register quick action triggers.

- **🔄 2-Second Dynamic Text Flipping Admissions Box**:
  - Interactive admissions chamber dynamically cycling through top colleges (Christ, St. Joseph's, VIT, RVCE, RVITM, BMSCE, BMSIT, Dayananda Sagar, Presidency, Sir MVIT).
  - Contextual accreditation badges and institutional descriptions updated in sync.
  - Primary CTAs: **Register Now** & **Download Fee Structure**.

- **🛡️ Streamlined Admission Forms (Zero Friction)**:
  - Clean input fields: Student Full Name, Mobile / WhatsApp Number, Email Address, Academic Stream dropdown, Target College dropdown, and India / Abroad Study Destination.
  - Dynamic "Others" placeholder fields that appear seamlessly when an unlisted course or college is chosen.
  - Removed outdated student ID / register numbers to maximize conversion rates.

- **🌐 Dual-Direction Infinite Logo Scrolling Marquee**:
  - Left-to-right and right-to-left continuous partner tracks featuring official institution marks and international study abroad destinations (Oxford, Melbourne, Toronto, TU Munich).

- **🏛️ Colleges & Programs Interactive Catalog Directory**:
  - Filterable by academic stream: *Engineering & Tech*, *Commerce & Finance*, *Medical & Healthcare*, and *Management & MBA*.
  - Instant toggle between **Top Colleges** and **Popular Programs** views with real-time seat matrix badges, highest placement packages, and direct application modals.

- **💎 Ultra-HD Vector SVG & High-DPI Brandmark**:
  - Pure mathematical vector SVGs ([logo-1.svg](images/logo-1.svg) and [logo-2.svg](images/logo-2.svg)) crafted with 3D metallic gold gradients, mortarboard graduation cap, atomic electron orbitals, and open book foundation.
  - Dynamic sticky navigation header: Prominent horizontal logo at page top; transitions to compact golden crest badge upon scrolling.

- **🎉 Instant Confirmation Modal**:
  - Branded feedback popup on form submission informing students that a senior counselor will contact them promptly, with direct guidance to [StudentEntrance.com](https://studententrance.com/) for upcoming entrance exams.

---

## 🚀 One-Click Deployment to Vercel

This repository is pre-configured for instant zero-configuration deployment on [Vercel](https://vercel.com):

1. Log in to [vercel.com](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Import the repository: `Samifarhan52/EC`.
4. Framework Preset: **Other** (Static HTML).
5. Click **Deploy**.

Vercel will automatically read `vercel.json` for security headers, clean URLs, and static asset caching.

---

## 📁 Repository Structure

```
.
├── index.html              # Main single-page web application
├── vercel.json             # Vercel deployment configuration & caching headers
├── package.json            # Project manifest & local dev scripts
├── .gitignore              # Git ignore rules for macOS & Vercel
├── README.md               # Project documentation & deployment guide
├── css/
│   └── style.css           # Modern CSS3 stylesheet (typography, animations, grid)
├── js/
│   └── main.js             # Interactive controller (dynamic flips, modals, directory)
└── images/
    ├── logo-1.svg          # Ultra-HD horizontal vector brandmark
    ├── logo-2.svg          # Ultra-HD stacked crest vector badge
    ├── logo-1.png          # High-density raster fallback
    ├── logo-2.png          # High-density raster fallback
    └── logos/              # Official high-resolution college emblems
```

---

## 💻 Local Development

To run the site locally:

```bash
# Using Python built-in server:
python3 -m http.server 8000

# Or using Node:
npx serve .
```

Open `http://localhost:8000` in your web browser.
