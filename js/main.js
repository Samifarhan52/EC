/**
 * THE EDU CONSULTANT - CORE CLIENT APPLICATION
 * High-performance, zero-bloat vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initCollegeFlipper();
  initCollegesAndProgramsDirectory();
  initConditionalFormFields();
  initModalControllers();
  initAdmissionAlertPopup();
  initFormSubmissions();
  initMobileNavigation();
  initScrollHeader();
  initEnquiryPillButtons();
  initHeroWordFlip();

  const heroDiscipline = document.getElementById('searchDiscipline');
  if (heroDiscipline) {
    heroDiscipline.addEventListener('change', function() {
      if (typeof window.updateHeroCollegeOptions === 'function') {
        window.updateHeroCollegeOptions(this.value, document.getElementById('searchProgramLevel')?.value);
      }
    });
  }
});

/* ==========================================================================
   1. DYNAMIC COLLEGE FLIPPER (2-SECOND CYCLE)
   ========================================================================== */
const FLIP_COLLEGES = [
  {
    name: "Christ University",
    campus: "Bangalore (Central & BGR)",
    quota: "Direct Quota Open 2027",
    tag: "NAAC A+ • Deemed Univ",
    desc: "Premier multi-disciplinary campus known for B.Com, BBA, Law, BCA & MBA direct quota seats."
  },
  {
    name: "St. Joseph's University",
    campus: "Bengaluru Central",
    quota: "Applications Active",
    tag: "140+ Yrs Heritage",
    desc: "Historic Jesuit institution offering sought-after Commerce, Humanities, Science & Management seats."
  },
  {
    name: "Vellore Institute of Technology (VIT)",
    campus: "Vellore / Chennai / AP",
    quota: "Category 1-5 NRI/Mgmt",
    tag: "NIRF Top 10 • Tier-1",
    desc: "World-class engineering ecosystem with direct advisory for CSE, AI, Robotics, Data Science & ECE."
  },
  {
    name: "RV College of Engineering (RVCE)",
    campus: "Mysore Road, Bangalore",
    quota: "Limited Quota 2027",
    tag: "Highest Package 62 LPA",
    desc: "Karnataka's #1 private engineering college. Direct management seats for Computer Science, IS & EC."
  },
  {
    name: "RV Institute of Technology (RVITM)",
    campus: "JP Nagar, Bangalore",
    quota: "Early Bird Merit",
    tag: "RV Group Innovation",
    desc: "Next-gen tech campus powered by the iconic RV trust, specializing in AI/ML, Cyber Security & Data Science."
  },
  {
    name: "BMS College of Engineering (BMSCE)",
    campus: "Basavanagudi, Bangalore",
    quota: "Institutional Quota",
    tag: "India's 1st Pvt Engg",
    desc: "Autonomous institution with 75+ years of excellence. Strong campus placement records across Fortune 500."
  },
  {
    name: "BMS Institute of Technology (BMSIT)",
    campus: "Yelahanka, Bangalore",
    quota: "Seat Booking Open",
    tag: "NAAC A++ Accredited",
    desc: "Renowned technical institute offering premier infrastructure, incubation hubs, and cutting-edge lab tracks."
  },
  {
    name: "Dayananda Sagar College (DSCE)",
    campus: "Kumaraswamy Layout, Bangalore",
    quota: "Mgmt Quota Priority",
    tag: "29-Acre Mega Campus",
    desc: "Top destination for Engineering, Architecture, Dental, MBA & MCA with modern research facilities."
  },
  {
    name: "Ramaiah Institute of Technology (MSRIT)",
    campus: "Mathikere, Bangalore",
    quota: "Direct Quota Active",
    tag: "NIRF Top 70 • Tier-1",
    desc: "Autonomous powerhouse with top NIRF ranking and elite placements in CSE, AI/ML, Cyber Security & ECE."
  },
  {
    name: "PES University",
    campus: "Ring Road & Electronic City",
    quota: "Management Quota Seats",
    tag: "Highest Package 65 LPA",
    desc: "Top-ranked private university famous for premier CS coding culture, high CTC packages, and global alumni."
  },
  {
    name: "Mount Carmel College (MCC)",
    campus: "Vasanth Nagar, Bangalore",
    quota: "Applications Open",
    tag: "NAAC A+ Autonomous",
    desc: "Premier autonomous institution for women renowned for B.Com, BBA, Computer Applications, and MBA."
  },
  {
    name: "Jain University",
    campus: "CMS & JGI Global Campus",
    quota: "Direct Quota 2027",
    tag: "NAAC A++ Deemed Univ",
    desc: "Next-gen business and technology programs with direct quota seats in Corporate BBA, AI, and Cloud tracks."
  },
  {
    name: "Kristu Jayanti College",
    campus: "K. Narayanapura, Hennur Road",
    quota: "Seat Booking Open",
    tag: "NAAC A++ (3.78 CGPA)",
    desc: "Top-rated autonomous commerce and computer applications institution with premier corporate tie-ups."
  }
];

function initCollegeFlipper() {
  const nameEl = document.getElementById('flipCollegeName');
  const labelEl = document.getElementById('flipCollegeLabel');
  const badgeEl = document.getElementById('flipCollegeBadge');
  const descEl = document.getElementById('flipCollegeDesc');

  if (!nameEl) return;

  let currentIndex = 0;

  setInterval(() => {
    // Phase 1: Animate out
    nameEl.classList.remove('anim-active', 'anim-in');
    nameEl.classList.add('anim-out');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % FLIP_COLLEGES.length;
      const college = FLIP_COLLEGES[currentIndex];

      nameEl.textContent = college.name;
      if (labelEl) labelEl.textContent = college.campus;
      if (badgeEl) badgeEl.innerHTML = `<i class="fa-solid fa-award"></i> ${college.tag}`;
      if (descEl) descEl.textContent = college.desc;

      // Phase 2: Animate in
      nameEl.classList.remove('anim-out');
      nameEl.classList.add('anim-in');

      // Trigger reflow
      void nameEl.offsetWidth;

      nameEl.classList.remove('anim-in');
      nameEl.classList.add('anim-active');
    }, 450);
  }, 2000); // 2 seconds cycle
}

/* ==========================================================================
   2. COLLEGES & PROGRAMS DATASET & DIRECTORY ENGINE
   ========================================================================== */
const DIRECTORY_COLLEGES = [
  {
    id: 'c1',
    name: "RV College of Engineering (RVCE)",
    logo: "images/logos/rvce.png",
    stream: "engineering",
    streamBadge: "Engineering & Tech",
    location: "Mysore Road, Bengaluru",
    ranking: "NIRF Top 80 • NAAC A+",
    highestPkg: "₹62.0 LPA",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
    description: "Ranked #1 private engineering college in Karnataka. Global alumni network, tech incubators, and direct management quota for Computer Science, AI, and Electronics.",
    quotaBadge: "Mgmt Quota 2027",
    highlights: ["Avg CTC: 15.4 LPA", "Direct Quota Allotment", "100% Placement Support"]
  },
  {
    id: 'c2',
    name: "Christ University",
    logo: "images/logos/christ.png",
    stream: "commerce",
    streamBadge: "Commerce & Mgmt",
    location: "Hosur Road / Yeshwanthpur, Bengaluru",
    ranking: "NAAC A+ Grade • Deemed Univ",
    highestPkg: "₹24.5 LPA",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    description: "Prestigious multi-campus university renowned worldwide for B.Com (Hons), BBA Finance, MBA, Law (BA LLB), and Computer Applications (BCA).",
    quotaBadge: "Applications Open",
    highlights: ["Global Exchange Programs", "Merit & Quota Counselling", "Top Corporate Recruiters"]
  },
  {
    id: 'c3',
    name: "Vellore Institute of Technology (VIT)",
    logo: "images/logos/vit.png",
    stream: "engineering",
    streamBadge: "Engineering & Tech",
    location: "Vellore / Chennai / AP",
    ranking: "NIRF Rank #11 Engineering",
    highestPkg: "₹1.02 Crore",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    description: "Premier Institution of Eminence. Category-wise counseling and direct institutional NRI/management quotas for B.Tech in CSE, AI/ML, and Robotics.",
    quotaBadge: "Category 1-5 Seats",
    highlights: ["1,000+ Recruiters", "World-Class Labs", "Flexible Choice Credit System"]
  },
  {
    id: 'c4',
    name: "St. Joseph's University",
    logo: "images/logos/stjosephs.png",
    stream: "commerce",
    streamBadge: "Commerce & Arts",
    location: "Langford Town, Bengaluru",
    ranking: "NAAC A++ • 140+ Years Legacy",
    highestPkg: "₹18.0 LPA",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
    description: "Heritage university in the heart of Bangalore offering high-demand programs in Commerce (ACCA / CMA integrated), Economics, Big Data, and Media.",
    quotaBadge: "Direct Admission 2027",
    highlights: ["Central Bangalore Campus", "Renowned Faculty", "Industry Mentorship"]
  },
  {
    id: 'c5',
    name: "BMS College of Engineering (BMSCE)",
    logo: "images/logos/bmsce.png",
    stream: "engineering",
    streamBadge: "Engineering & Tech",
    location: "Bull Temple Road, Basavanagudi",
    ranking: "NIRF Top 100 • AICTE Approved",
    highestPkg: "₹50.0 LPA",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=600&q=80",
    description: "The first private engineering college in India. Unmatched reputation for Mechanical, Civil, CSE, and Information Science with guaranteed corporate links.",
    quotaBadge: "Limited Quota",
    highlights: ["78 Yrs Excellence", "Autonomous Curriculum", "Active Alumni in 40+ Nations"]
  },
  {
    id: 'c6',
    name: "Dayananda Sagar College (DSCE)",
    logo: "images/logos/dayanandasagar.png",
    stream: "engineering",
    streamBadge: "Engineering & Medical",
    location: "Kumaraswamy Layout, Bengaluru",
    ranking: "NAAC A+ • NBA Accredited",
    highestPkg: "₹45.0 LPA",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&q=80",
    description: "Expansive 29-acre campus offering 20+ engineering disciplines, Architecture, MBA, and allied medical/dental faculties with cutting-edge incubation centers.",
    quotaBadge: "Direct Seat Allotment",
    highlights: ["Centre for Innovation", "Global MoUs", "Vibrant Campus Life"]
  },
  {
    id: 'c7',
    name: "Ramaiah Institute of Technology (MSRIT)",
    logo: "images/logos/msrit.png",
    stream: "engineering",
    streamBadge: "Engineering & Tech",
    location: "Mathikere, Bengaluru",
    ranking: "NIRF Top 70 • NAAC A+",
    highestPkg: "₹52.0 LPA",
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=600&q=80",
    description: "Flagship institution of the Gokula Education Foundation. Direct quota advisory for CSE, Biotechnology, Cyber Security, and Electrical Engineering.",
    quotaBadge: "Quota Applications Open",
    highlights: ["Medical & Engg Hub", "Top R&D Grants", "Premier Campus Recruitments"]
  },
  {
    id: 'c8',
    name: "Bangalore Medical College & RI (BMCRI)",
    logo: "images/logos/bmcri.png",
    stream: "medical",
    streamBadge: "Medical & Health",
    location: "Fort, K.R. Road, Bengaluru",
    ranking: "NIRF Medical Top 15 • Govt/Allied",
    highestPkg: "Govt Stipends / Residencies",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80",
    description: "One of the most prestigious medical colleges in South India. Comprehensive guidance for NEET qualifying seats, NRI quotas, and allied health sciences.",
    quotaBadge: "NEET Guidance / NRI",
    highlights: ["5 Associated Hospitals", "Super-Specialty Training", "Clinical Exposure"]
  },
  {
    id: 'c9',
    name: "PES University",
    logo: "images/logos/pes.png",
    stream: "engineering",
    streamBadge: "Engineering & Mgmt",
    location: "Ring Road & Electronic City",
    ranking: "State Private University • Tier 1",
    highestPkg: "₹65.0 LPA",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=600&q=80",
    description: "Top-ranked private university famous for its high-salary CS placements, PESSAT entrance counseling, and institutional management quota seats.",
    quotaBadge: "Higher Fee / Mgmt Quota",
    highlights: ["Highest Package 65 LPA", "Cisco & Intel Labs", "Tech Research Hub"]
  },
  {
    id: 'c10',
    name: "Vydehi Institute of Medical Sciences",
    logo: "images/logos/vydehi.png",
    stream: "medical",
    streamBadge: "Medical & Nursing",
    location: "Whitefield, Bengaluru",
    ranking: "NMC Approved • RGUHS Affiliated",
    highestPkg: "Premier Hospital Network",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    description: "Leading 1600-bed hospital and medical college in Bangalore offering MBBS, BDS, MD/MS, and B.Sc Nursing with direct quota counseling.",
    quotaBadge: "MBBS / BDS Quotas",
    highlights: ["Multi-Specialty Hospital", "Modern Simulation Labs", "Expert Medical Faculty"]
  },
  {
    id: 'c11',
    name: "Presidency University",
    logo: "images/logos/presidency.png",
    stream: "management",
    streamBadge: "Law, Mgmt & Tech",
    location: "Rajanukunte, Yelahanka",
    ranking: "Award-winning Green Campus",
    highestPkg: "₹15.5 LPA",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    description: "Dynamic university offering industry-curated BBA, MBA, BA LLB (Hons), B.Tech AI, and Design programs with active corporate internships.",
    quotaBadge: "Merit & Direct Seats",
    highlights: ["60-Acre Campus", "Bloomberg Terminal Lab", "100% Placement Assistance"]
  },
  {
    id: 'c12',
    name: "Sir M. Visvesvaraya Institute (SMVIT)",
    logo: "images/logos/smvit_crest.png",
    stream: "engineering",
    streamBadge: "Engineering & Tech",
    location: "Hunasamaranahalli, Yelahanka",
    ranking: "NAAC Accredited • VTU Affiliated",
    highestPkg: "₹28.0 LPA",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    description: "Established by the Sri Krishnadevaraya Educational Trust. Renowned for academic discipline, Mechanical, CSE, and Electronics engineering departments.",
    quotaBadge: "Direct Admissions Open",
    highlights: ["133-Acre Lush Campus", "Research Centers", "Hostel Facilities"]
  },
  {
    id: 'c13',
    name: "Mount Carmel College (MCC)",
    logo: "images/logos/mcc.png",
    stream: "commerce",
    streamBadge: "Commerce & Mgmt",
    location: "Vasanth Nagar, Bengaluru",
    ranking: "NAAC A+ • Premier Autonomous Women's College",
    highestPkg: "₹21.5 LPA",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
    description: "Iconic autonomous institution in central Bengaluru offering prestigious B.Com, BBA, BCA, and MBA programs with direct management quota seats.",
    quotaBadge: "Quota Applications Open",
    highlights: ["Central Bangalore Hub", "Fortune 500 Recruiters", "Elite Academic Legacy"]
  },
  {
    id: 'c14',
    name: "Jain University (CMS / FET)",
    logo: "images/logos/jain.png",
    stream: "commerce",
    streamBadge: "Commerce, Law & Tech",
    location: "Palace Road / Kanakapura Road, Bengaluru",
    ranking: "NAAC A++ Deemed-to-be University",
    highestPkg: "₹42.0 LPA",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    description: "Industry-aligned multidisciplinary university known for Center for Management Studies (CMS Corporate BBA) and Faculty of Engineering (AI, Cloud with Google & IBM).",
    quotaBadge: "Direct Quota 2027",
    highlights: ["Top Business Incubation", "Google Cloud Programs", "Global Placement Record"]
  },
  {
    id: 'c15',
    name: "Kristu Jayanti College (Autonomous)",
    logo: "images/logos/kristu.png",
    stream: "commerce",
    streamBadge: "Commerce & Computing",
    location: "K. Narayanapura, Hennur Road, Bengaluru",
    ranking: "NAAC A++ (CGPA 3.78) • NIRF Ranked",
    highestPkg: "₹16.5 LPA",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
    description: "Autonomous college offering high-impact programs in Commerce (ACCA integrated), BBA, Computer Applications (BCA), and MBA with direct admission support.",
    quotaBadge: "Direct Admission Active",
    highlights: ["Highest NAAC Score", "Modern Digital Campus", "Top Analytics Labs"]
  },
  {
    id: 'c16',
    name: "St. Joseph's College of Commerce (SJCC)",
    logo: "images/logos/sjcc.png",
    stream: "commerce",
    streamBadge: "Commerce & Finance",
    location: "163, Brigade Road, Ashok Nagar, Bengaluru",
    ranking: "NAAC A++ (3.57 CGPA) • Est. 1972",
    highestPkg: "₹22.0 LPA",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=600&q=80",
    description: "Premier commerce institution located on Brigade Road. Direct management quota and institutional guidance for B.Com (Regular / Professional / Analytics) and BBA.",
    quotaBadge: "Management Quota Open",
    highlights: ["ACCA / CMA Global Tie-ups", "Big 4 Firm Recruiters", "Elite Jesuit Heritage"]
  },
  {
    id: 'c17',
    name: "NMIMS (Mumbai & Bengaluru)",
    logo: "images/logos/nmims.png",
    stream: "management",
    streamBadge: "Management & BBA",
    location: "Vile Parle West, Mumbai & Bannerghatta Rd, Bengaluru",
    ranking: "Category-1 Deemed Univ • AACSB Accredited",
    highestPkg: "₹67.8 LPA",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    description: "Premier national B-School brand offering BBA, B.Com (Hons), B.Sc Finance, and MBA. Direct institutional quota seat allotment assistance in Mumbai and Bangalore.",
    quotaBadge: "Direct Seat Allotment",
    highlights: ["Top 10 Indian B-School", "Global Corporate Tie-ups", "Executive Placements"]
  },
  {
    id: 'c18',
    name: "BMS Institute of Technology & Management (BMSIT)",
    logo: "images/logos/bmsit.png",
    stream: "engineering",
    streamBadge: "Engineering & Tech",
    location: "Doddaballapur Road, Yelahanka, Bengaluru",
    ranking: "Autonomous VTU • BMS Educational Trust",
    highestPkg: "₹44.0 LPA",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
    description: "BMS Educational Trust institution in North Bengaluru offering cutting-edge engineering programs in CSE, AIML, CSBS, ECE, and Architecture with verified packages.",
    quotaBadge: "Institutional Quota",
    highlights: ["BMS Trust Heritage", "Rapid Placement Growth", "Autonomous Curriculum"]
  },
  {
    id: 'c19',
    name: "Nitte Meenakshi Institute of Technology (NMIT)",
    logo: "images/logos/nmit.svg",
    stream: "engineering",
    streamBadge: "Engineering & AI",
    location: "Govindapura, Gollahalli, Yelahanka, Bengaluru",
    ranking: "Autonomous VTU • NAAC A+ Grade",
    highestPkg: "₹40.0 LPA",
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=600&q=80",
    description: "Autonomous engineering powerhouse with premier industry centers of excellence. Direct management quota packages for CSE, Data Science, AIML, and ECE.",
    quotaBadge: "Direct Quota Active",
    highlights: ["Satellite Research Lab", "Center for Robotics", "High Average CTC"]
  },
  {
    id: 'c20',
    name: "New Horizon College of Engineering (NHCE)",
    logo: "images/logos/nhce.svg",
    stream: "engineering",
    streamBadge: "Engineering & Tech",
    location: "Outer Ring Road, Marathahalli, Bengaluru",
    ranking: "Autonomous VTU • NAAC A Grade",
    highestPkg: "₹35.0 LPA",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&q=80",
    description: "Prime IT Corridor campus near major tech parks. Direct admission seats for CSE, AI & ML, Data Science, and Information Science with guaranteed corporate linkage.",
    quotaBadge: "Direct Quota 2027",
    highlights: ["Prime IT Corridor", "Japan Exchange Program", "Fortune 500 On-Campus"]
  },
  {
    id: 'c21',
    name: "Global Academy of Technology (GAT)",
    logo: "images/logos/gat.svg",
    stream: "engineering",
    streamBadge: "Engineering & Tech",
    location: "Ideal Homes, Rajarajeshwarinagar, Bengaluru",
    ranking: "Autonomous VTU • AICTE Approved",
    highestPkg: "₹32.0 LPA",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=600&q=80",
    description: "Prominent autonomous institute in South Bengaluru offering CSE, AIML, AIDS, ISE, Aeronautical, and ECE with transparent fee structure packages.",
    quotaBadge: "Seat Booking Open",
    highlights: ["Autonomous Status", "Strong Industry Connect", "Modern Lab Complexes"]
  },
  {
    id: 'c22',
    name: "REVA University",
    logo: "images/logos/reva.svg",
    stream: "engineering",
    streamBadge: "University & Tech",
    location: "Rukmini Knowledge Park, Kattigenahalli, Yelahanka",
    ranking: "Leading State Private University • 45 Acres",
    highestPkg: "₹50.0 LPA",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    description: "State-of-the-art mega campus with future-focused engineering specializations in AI, Data Science, Blockchain, IoT, and Robotics. Direct quota seat allocation.",
    quotaBadge: "Direct Quota Available",
    highlights: ["45-Acre Lush Campus", "UI/UX & Robotics Hubs", "Multi-Disciplinary Options"]
  }
];

const DIRECTORY_PROGRAMS = [
  {
    id: 'p1',
    name: "B.Tech Computer Science & AI / ML",
    category: "engineering",
    categoryBadge: "Engineering & Tech",
    duration: "4 Years (8 Semesters)",
    colleges: "RVCE, VIT, BMSCE, DSCE, MSRIT, PES",
    eligibility: "10+2 with Physics, Maths & Chem (Min 50%)",
    careerScope: "AI Engineer, Cloud Architect, Systems Designer (Avg 12-25 LPA)",
    quotaAvailability: "Direct Quota & NRI Seats Open",
    description: "The most sought-after technical degree focusing on neural networks, distributed systems, deep learning algorithms, and high-performance computing."
  },
  {
    id: 'p2',
    name: "MBBS - Bachelor of Medicine & Surgery",
    category: "medical",
    categoryBadge: "Medical & Healthcare",
    duration: "5.5 Years (Incl. 1 Yr Internship)",
    colleges: "Vydehi, BMCRI, Ramaiah Medical, KIMS",
    eligibility: "NEET Qualified + 10+2 PCB (Min 50%)",
    careerScope: "Medical Officer, Specialist Resident, Clinical Surgeon",
    quotaAvailability: "Management & Institutional NRI Quota",
    description: "Comprehensive medical curriculum with extensive clinical rotations, super-specialty hospital training, and direct admission seat assistance."
  },
  {
    id: 'p3',
    name: "BBA (Honours) / International Business",
    category: "commerce",
    categoryBadge: "Commerce & Mgmt",
    duration: "3 to 4 Years",
    colleges: "Christ University, St. Joseph's, Presidency",
    eligibility: "10+2 Any Stream (Min 55%)",
    careerScope: "Business Analyst, Marketing Strategist, Corporate Consultant",
    quotaAvailability: "Direct Interview / Quota Allocation",
    description: "Immersive management program combining financial modeling, strategic management, cross-border trade, and international case competitions."
  },
  {
    id: 'p4',
    name: "B.Com Professional (ACCA / CMA Integrated)",
    category: "commerce",
    categoryBadge: "Commerce & Finance",
    duration: "3 Years",
    colleges: "St. Joseph's, Christ University, Jain",
    eligibility: "10+2 Commerce / Science",
    careerScope: "Investment Banker, Audit Associate, Financial Controller",
    quotaAvailability: "Direct Seats Available",
    description: "Globally accredited commerce degree enabling students to clear global chartered certifications alongside university degree examinations."
  },
  {
    id: 'p5',
    name: "MBA / PGDM (Dual Specialization)",
    category: "commerce",
    categoryBadge: "Management & MBA",
    duration: "2 Years",
    colleges: "Christ, Dayananda Sagar, Ramaiah, BMS",
    eligibility: "Graduation (Min 50%) + MAT/CAT/CMAT/Direct",
    careerScope: "Product Manager, VP Operations, Brand Director (Avg 9-18 LPA)",
    quotaAvailability: "Executive Quota Seats 2027",
    description: "High-impact leadership program with dual specializations in FinTech, Business Analytics, Human Capital, and Strategic Marketing."
  },
  {
    id: 'p6',
    name: "BCA (Cloud Computing & Cyber Security)",
    category: "engineering",
    categoryBadge: "IT & Applications",
    duration: "3 to 4 Years",
    colleges: "Christ, St. Joseph's, Presidency, DSCE",
    eligibility: "10+2 Any Stream with Mathematics / Stats",
    careerScope: "Penetration Tester, Cloud Administrator, DevOps Engineer",
    quotaAvailability: "Fast-Track Seat Confirmation",
    description: "Practical software development program centered around modern DevOps pipelines, AWS/Azure architectures, and ethical hacking protocols."
  },
  {
    id: 'p7',
    name: "BA LLB / BBA LLB (5-Year Integrated)",
    category: "commerce",
    categoryBadge: "Law & Legal Studies",
    duration: "5 Years",
    colleges: "Christ School of Law, BMS Law, Presidency",
    eligibility: "10+2 Any Stream (Min 45%)",
    careerScope: "Corporate Counsel, Litigation Attorney, Legal Advisor",
    quotaAvailability: "Management Quota Allocation",
    description: "Bar Council of India approved dual-degree with national moot court training, corporate law internships, and intellectual property specializations."
  },
  {
    id: 'p8',
    name: "B.Tech Electronics & Communication (ECE)",
    category: "engineering",
    categoryBadge: "Engineering & Tech",
    duration: "4 Years",
    colleges: "RVCE, BMSCE, VIT, MSRIT, SMVIT",
    eligibility: "10+2 PCM (Min 50%)",
    careerScope: "VLSI Design Engineer, Embedded Systems Architect, Telecom Lead",
    quotaAvailability: "Direct Management Allotment",
    description: "In-depth training in semiconductor design, VLSI, IoT devices, signal processing, and direct integration with Bangalore's semiconductor hubs."
  },
  {
    id: 'p9',
    name: "BDS - Bachelor of Dental Surgery",
    category: "medical",
    categoryBadge: "Dental & Health",
    duration: "5 Years (With Rotatory Internship)",
    colleges: "Dayananda Sagar Dental, Vydehi, Ramaiah",
    eligibility: "NEET Qualified + 10+2 PCB",
    careerScope: "Oral Surgeon, Dental Consultant, Orthodontist",
    quotaAvailability: "Direct Quota Allotment",
    description: "Hands-on dental surgery education equipped with digital CAD/CAM dental labs, patient OPD clinics, and prosthodontics training."
  },
  {
    id: 'p10',
    name: "B.Pharm & Pharm.D (Doctor of Pharmacy)",
    category: "medical",
    categoryBadge: "Pharmacy & Life Sci",
    duration: "4 to 6 Years",
    colleges: "Dayananda Sagar, Oxford College, Ramaiah",
    eligibility: "10+2 PCB / PCM",
    careerScope: "Clinical Pharmacist, Drug Regulatory Affairs, R&D Scientist",
    quotaAvailability: "Institutional Quota Active",
    description: "Payscale-leading pharmaceutical programs encompassing formulation pharmacology, clinical drug trials, and multinational pharmaceutical careers."
  },
  {
    id: 'p11',
    name: "B.Arch - Bachelor of Architecture",
    category: "engineering",
    categoryBadge: "Design & Architecture",
    duration: "5 Years",
    colleges: "BMS College of Architecture, RVCA, DSCA",
    eligibility: "NATA Qualified + 10+2 with Maths",
    careerScope: "Urban Designer, Principal Architect, Sustainable Habitat Planner",
    quotaAvailability: "Council Approved Quota Seats",
    description: "Creative studio-based degree focusing on sustainable urbanism, computational parametric design, and BIM structural modeling."
  },
  {
    id: 'p12',
    name: "B.Tech Biotechnology & Bioinformatics",
    category: "engineering",
    categoryBadge: "Biotech & Genomics",
    duration: "4 Years",
    colleges: "RVCE, VIT, MSRIT, DSCE",
    eligibility: "10+2 with Physics, Chem, Bio/Maths",
    careerScope: "Genomic Data Analyst, Bioprocess Engineer, Vaccine Researcher",
    quotaAvailability: "Specialized Quota Allocation",
    description: "Modern biotechnology engineering with specialized tracks in CRISPR genomics, bioprocess engineering, and algorithmic bioinformatics."
  },
  {
    id: 'p13',
    name: "MCA - Master of Computer Applications",
    category: "engineering",
    categoryBadge: "IT & Applications (PG)",
    duration: "2 Years",
    colleges: "RVCE, BMSCE, DSCE, PES, Christ, SMVIT",
    eligibility: "BCA / B.Sc / Any Degree with Maths (Min 50%)",
    careerScope: "Full-Stack Tech Lead, Cloud Solutions Architect, AI Engineer",
    quotaAvailability: "Direct PG Management Seats 2027",
    description: "Industry-aligned master's program specializing in Cloud Computing, Artificial Intelligence, Mobile Architectures, and Enterprise Software Systems."
  },
  {
    id: 'p14',
    name: "M.Sc - Master of Science (Data Science & AI)",
    category: "medical",
    categoryBadge: "Advanced Science & Analytics",
    duration: "2 Years",
    colleges: "Christ University, St. Joseph's, Ramaiah",
    eligibility: "B.Sc / BCA / B.E (Min 50%)",
    careerScope: "Data Scientist, Predictive Modeler, Research Associate",
    quotaAvailability: "Merit & Quota Seats Open",
    description: "Specialized postgraduate program in Applied Statistics, Deep Learning algorithms, Natural Language Processing, and Big Data infrastructure."
  },
  {
    id: 'p15',
    name: "M.Com - Master of Commerce (Finance & Analytics)",
    category: "commerce",
    categoryBadge: "Commerce & Banking (PG)",
    duration: "2 Years",
    colleges: "Christ University, St. Joseph's, Mount Carmel",
    eligibility: "B.Com / BBA / BBM (Min 50%)",
    careerScope: "Financial Analyst, Risk Consultant, Equity Strategist",
    quotaAvailability: "Priority Direct Allocation",
    description: "Advanced commerce curriculum with international taxation, capital markets, corporate governance, and quantitative financial analysis."
  },
  {
    id: 'p16',
    name: "B.Sc - Bachelor of Science (Biotech & Comp Sci)",
    category: "medical",
    categoryBadge: "Science & Technology",
    duration: "3 to 4 Years",
    colleges: "St. Joseph's, Christ University, Oxford College",
    eligibility: "10+2 with Science (Min 50%)",
    careerScope: "Biotech Analyst, Scientific Officer, Software Developer",
    quotaAvailability: "Direct Allotment Available",
    description: "Interdisciplinary scientific foundation combining molecular genetics, biochemical analysis, algorithmic logic, and laboratory instrumentation."
  },
  {
    id: 'p17',
    name: "BA - Bachelor of Arts (Economics & Psychology)",
    category: "commerce",
    categoryBadge: "Humanities & Social Sciences",
    duration: "3 to 4 Years",
    colleges: "Christ University, St. Joseph's, Presidency",
    eligibility: "10+2 Any Stream (Min 50%)",
    careerScope: "Policy Researcher, Communications Lead, HR Consultant",
    quotaAvailability: "Direct Interview Quota",
    description: "Comprehensive liberal arts program integrating macroeconomics, cognitive psychology, public policy, and corporate communication."
  }
];

let currentDirectoryMode = 'colleges'; // 'colleges' | 'programs'
let currentCategoryFilter = 'all';

function initCollegesAndProgramsDirectory() {
  const modeCollegesBtn = document.getElementById('modeCollegesBtn');
  const modeSchoolsBtn = document.getElementById('modeSchoolsBtn');
  const modeProgramsBtn = document.getElementById('modeProgramsBtn');

  if (modeCollegesBtn) {
    modeCollegesBtn.addEventListener('click', () => window.switchDirectoryMode('colleges'));
  }
  if (modeSchoolsBtn) {
    modeSchoolsBtn.addEventListener('click', () => window.switchDirectoryMode('schools'));
  }
  if (modeProgramsBtn) {
    modeProgramsBtn.addEventListener('click', () => window.switchDirectoryMode('programs'));
  }

  bindDirectoryFilterPillEvents();
  renderDirectoryGrid();
}

function bindDirectoryFilterPillEvents() {
  const filterPills = document.querySelectorAll('.filter-tag');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-tag').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategoryFilter = pill.dataset.filter || 'all';
      renderDirectoryGrid();
    });
  });
}

window.switchDirectoryMode = function(mode) {
  const modeCollegesBtn = document.getElementById('modeCollegesBtn');
  const modeSchoolsBtn = document.getElementById('modeSchoolsBtn');
  const modeProgramsBtn = document.getElementById('modeProgramsBtn');
  const filterPillsBar = document.getElementById('directoryFilterPillsBar');

  [modeCollegesBtn, modeSchoolsBtn, modeProgramsBtn].forEach(b => b && b.classList.remove('active'));

  if (mode === 'programs') {
    currentDirectoryMode = 'programs';
    if (modeProgramsBtn) modeProgramsBtn.classList.add('active');
    if (filterPillsBar) {
      filterPillsBar.innerHTML = `
        <button type="button" class="filter-tag active" data-filter="all">All Disciplines</button>
        <button type="button" class="filter-tag" data-filter="engineering">Engineering &amp; Tech</button>
        <button type="button" class="filter-tag" data-filter="commerce">Commerce &amp; Finance</button>
        <button type="button" class="filter-tag" data-filter="medical">Medical &amp; Healthcare</button>
        <button type="button" class="filter-tag" data-filter="management">Management &amp; MBA</button>
      `;
      bindDirectoryFilterPillEvents();
    }
  } else if (mode === 'schools') {
    currentDirectoryMode = 'schools';
    if (modeSchoolsBtn) modeSchoolsBtn.classList.add('active');
    if (filterPillsBar) {
      filterPillsBar.innerHTML = `
        <button type="button" class="filter-tag active" data-filter="all">All Boards (144)</button>
        <button type="button" class="filter-tag" data-filter="cbse">CBSE</button>
        <button type="button" class="filter-tag" data-filter="icse">ICSE &amp; ISC</button>
        <button type="button" class="filter-tag" data-filter="igcse">IGCSE (Cambridge)</button>
        <button type="button" class="filter-tag" data-filter="ib">IB World</button>
        <button type="button" class="filter-tag" data-filter="state">Karnataka State Board</button>
      `;
      bindDirectoryFilterPillEvents();
    }
  } else {
    currentDirectoryMode = 'colleges';
    if (modeCollegesBtn) modeCollegesBtn.classList.add('active');
    if (filterPillsBar) {
      filterPillsBar.innerHTML = `
        <button type="button" class="filter-tag active" data-filter="all">All Disciplines</button>
        <button type="button" class="filter-tag" data-filter="engineering">Engineering &amp; Tech</button>
        <button type="button" class="filter-tag" data-filter="commerce">Commerce &amp; Finance</button>
        <button type="button" class="filter-tag" data-filter="medical">Medical &amp; Healthcare</button>
        <button type="button" class="filter-tag" data-filter="management">Management &amp; MBA</button>
      `;
      bindDirectoryFilterPillEvents();
    }
  }
  currentCategoryFilter = 'all';
  renderDirectoryGrid();
};

function renderDirectoryGrid() {
  const gridContainer = document.getElementById('directoryCardsGrid');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';

  if (currentDirectoryMode === 'colleges') {
    const filtered = DIRECTORY_COLLEGES.filter(item => {
      if (currentCategoryFilter === 'all') return true;
      return item.stream === currentCategoryFilter;
    });

    filtered.forEach(col => {
      const card = document.createElement('div');
      card.className = 'directory-card';
      card.innerHTML = `
        <div class="card-top-banner" style="background-image: url('${col.image}');">
          <span class="badge-stream">${col.streamBadge}</span>
          <span class="badge-quota"><i class="fa-solid fa-bolt"></i> ${col.quotaBadge}</span>
        </div>
        <div class="card-body">
          <div class="college-card-header">
            <div class="college-crest-mini">
              ${col.logo ? `<img src="${col.logo}" alt="${col.name} Logo" class="college-logo-img" loading="lazy">` : `<i class="fa-solid fa-graduation-cap"></i>`}
            </div>
            <div class="college-title-block">
              <h4>${col.name}</h4>
              <span class="college-location"><i class="fa-solid fa-location-dot"></i> ${col.location}</span>
            </div>
          </div>
          <p class="card-description">${col.description}</p>
          <div class="card-meta-pills">
            <span class="meta-pill"><i class="fa-solid fa-star text-warning"></i> ${col.ranking}</span>
            <span class="meta-pill"><i class="fa-solid fa-money-bill-wave text-success"></i> Max Pkg: ${col.highestPkg}</span>
          </div>
          <div class="card-actions-row">
            <a href="enquiry.html?college=${encodeURIComponent(col.name)}" class="btn-card-apply" title="Free Counselling for ${col.name}">
              <i class="fa-solid fa-comments"></i> Free Counselling
            </a>
            <a href="fee-structure.html?college=${encodeURIComponent(col.name)}" class="btn-card-fee" title="Download Fee Structure for ${col.name}">
              <i class="fa-solid fa-file-arrow-down"></i> Download Fee Structure
            </a>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  } else if (currentDirectoryMode === 'schools') {
    const allSchools = window.DIRECTORY_SCHOOLS || [];
    const filtered = allSchools.filter(sch => {
      if (currentCategoryFilter === 'all') return true;
      const bStr = (sch.boards || []).join(' ').toLowerCase();
      if (currentCategoryFilter === 'cbse') return bStr.includes('cbse');
      if (currentCategoryFilter === 'icse') return bStr.includes('icse') || bStr.includes('isc');
      if (currentCategoryFilter === 'igcse') return bStr.includes('igcse') || bStr.includes('cambridge') || bStr.includes('a level');
      if (currentCategoryFilter === 'ib') return bStr.includes('ib');
      if (currentCategoryFilter === 'state') return bStr.includes('state') || bStr.includes('karnataka');
      return true;
    });

    const displaySchools = filtered.slice(0, 24);

    displaySchools.forEach(sch => {
      const card = document.createElement('div');
      card.className = 'directory-card school-card';
      const bgImg = sch.image || 'https://hbwkaokcdepfokpxroud.supabase.co/storage/v1/object/public/campus-photographs/schools/1e5ee6d2-03e2-47ba-b426-3ceef0a78171-thumb-a2414012f27e.webp';
      card.innerHTML = `
        <div class="card-top-banner" style="background-image: url('${bgImg}');">
          <span class="badge-stream">${(sch.boards || []).slice(0, 2).join(' · ') || 'K-12 Board'}</span>
          <span class="badge-quota"><i class="fa-solid fa-circle-check"></i> Admissions 2027</span>
        </div>
        <div class="card-body">
          <div class="college-card-header">
            <div class="college-crest-mini" style="background: rgba(37, 99, 235, 0.12); color: #2563eb;">
              <i class="fa-solid fa-school"></i>
            </div>
            <div class="college-title-block">
              <h4>${sch.name}</h4>
              <span class="college-location"><i class="fa-solid fa-location-dot"></i> ${sch.location_type || 'Bengaluru · Day'}</span>
            </div>
          </div>
          <p class="card-description">Authorized admissions support, curriculum guidance, and interaction assistance across ${sch.classes || 'Nursery to 12th'}.</p>
          <div class="card-meta-pills">
            <span class="meta-pill"><i class="fa-solid fa-graduation-cap text-primary"></i> ${sch.classes || 'All Grades'}</span>
            <span class="meta-pill"><i class="fa-solid fa-award text-warning"></i> ${(sch.boards || []).join(', ')}</span>
          </div>
          <div class="card-actions-row">
            <a href="enquiry.html?college=${encodeURIComponent(sch.name)}&course=School%20Admission" class="btn-card-apply" title="Free Counselling for ${sch.name}">
              <i class="fa-solid fa-comments"></i> Free Counselling
            </a>
            ${sch.website ? `
            <a href="${sch.website}" target="_blank" rel="noopener noreferrer" class="btn-card-fee" title="Visit Official Website">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Official Website
            </a>` : `
            <a href="fee-structure.html?college=${encodeURIComponent(sch.name)}&course=School%20Admission" class="btn-card-fee" title="Download Brochure">
              <i class="fa-solid fa-file-arrow-down"></i> Fee Details
            </a>`}
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });

    const footerLink = document.createElement('div');
    footerLink.style.cssText = 'grid-column: 1 / -1; text-align: center; margin-top: 1.5rem; padding: 1.5rem 1rem; background: #ffffff; border-radius: 20px; border: 1.5px dashed #cbd5e1; box-shadow: 0 4px 15px rgba(0,0,0,0.03);';
    footerLink.innerHTML = `
      <p style="font-size: 1.1rem; font-weight: 700; color: #0b0f3b; margin-bottom: 0.85rem;">
        Looking for all 144 verified schools in Bengaluru with instant curriculum search and fee insights?
      </p>
      <a href="schools.html" class="sf-btn-icon-primary" style="display: inline-flex; text-decoration: none; padding: 12px 28px; font-size: 15px; margin: 0 auto;">
        <span>Explore All 144 Bangalore Schools</span>
        <span class="icon"><i class="fa-solid fa-arrow-right"></i></span>
      </a>
    `;
    gridContainer.appendChild(footerLink);
  } else {
    // Programs Mode
    const filtered = DIRECTORY_PROGRAMS.filter(item => {
      if (currentCategoryFilter === 'all') return true;
      return item.category === currentCategoryFilter;
    });

    filtered.forEach(prog => {
      const card = document.createElement('div');
      card.className = 'directory-card';
      card.innerHTML = `
        <div class="card-top-banner" style="background-image: linear-gradient(135deg, #102a52 0%, #060d17 100%);">
          <span class="badge-stream">${prog.categoryBadge}</span>
          <span class="badge-quota"><i class="fa-solid fa-check-double"></i> ${prog.quotaAvailability}</span>
        </div>
        <div class="card-body">
          <div class="college-card-header">
            <div class="college-crest-mini" style="background: rgba(245, 158, 11, 0.15); color: #d97706;">
              <i class="fa-solid fa-book-bookmark"></i>
            </div>
            <div class="college-title-block">
              <h4>${prog.name}</h4>
              <span class="college-location"><i class="fa-solid fa-clock"></i> Duration: ${prog.duration}</span>
            </div>
          </div>
          <p class="card-description">${prog.description}</p>
          <div class="card-meta-pills" style="margin-bottom: 0.75rem;">
            <div style="font-size: 0.8rem; color: #1e3a8a; font-weight: 700; width: 100%;">
              <i class="fa-solid fa-building-columns me-1"></i> Offered At: ${prog.colleges}
            </div>
            <div style="font-size: 0.78rem; color: #475569; width: 100%; margin-top: 4px;">
              <i class="fa-solid fa-user-check me-1"></i> Eligibility: ${prog.eligibility}
            </div>
          </div>
          <div class="card-actions-row">
            <a href="enquiry.html?course=${encodeURIComponent(prog.name)}" class="btn-card-apply" title="Free Counselling for ${prog.name}">
              <i class="fa-solid fa-comments"></i> Free Counselling
            </a>
            <a href="fee-structure.html?course=${encodeURIComponent(prog.name)}" class="btn-card-fee" title="Download Fee Structure for ${prog.name}">
              <i class="fa-solid fa-file-arrow-down"></i> Download Fee Structure
            </a>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }
}

/* ==========================================================================
   3. DYNAMIC CONDITIONAL INPUT FIELDS ("OTHERS" TRIGGER)
   ========================================================================== */
function initConditionalFormFields() {
  // Main admission form pairs (Homepage)
  setupConditionalPair('formCourseSelect', 'conditionalCourseOther');
  setupConditionalPair('formCollegeSelect', 'conditionalCollegeOther');
  setupConditionalPair('mainProgramLevelSelect', 'mainConditionalProgramLevelOther');

  // Modal form pairs
  setupConditionalPair('modalCourseSelect', 'modalConditionalCourseOther');
  setupConditionalPair('modalCollegeSelect', 'modalConditionalCollegeOther');
  setupConditionalPair('modalProgramLevelSelect', 'modalConditionalProgramLevelOther');

  // Fee modal pairs
  setupConditionalPair('feeModalCourseSelect', 'feeConditionalCourseOther');
  setupConditionalPair('feeModalCollegeSelect', 'feeConditionalCollegeOther');
  setupConditionalPair('feeModalProgramLevelSelect', 'feeModalConditionalProgramLevelOther');

  // Standalone enquiry page pairs
  setupConditionalPair('enquiryCourseSelect', 'enquiryConditionalCourseOther');
  setupConditionalPair('enquiryCollegeSelect', 'enquiryConditionalCollegeOther');
  setupConditionalPair('enquiryProgramLevelSelect', 'enquiryConditionalProgramLevelOther');

  // Standalone fee-structure page pairs
  setupConditionalPair('feePageCourseSelect', 'feePageConditionalCourseOther');
  setupConditionalPair('feePageCollegeSelect', 'feePageConditionalCollegeOther');
  setupConditionalPair('feeProgramLevelSelect', 'feeConditionalProgramLevelOther');

  // Hero search bar conditional pairs
  setupConditionalPair('searchProgramLevel', 'heroConditionalProgramLevelOther');
  setupConditionalPair('searchDiscipline', 'heroConditionalDisciplineOther');
  setupConditionalPair('searchCollege', 'heroConditionalCollegeOther');
}

function setupConditionalPair(selectId, conditionalWrapId) {
  const selectEl = document.getElementById(selectId);
  const wrapEl = document.getElementById(conditionalWrapId);
  if (!selectEl || !wrapEl) return;

  const checkValue = () => {
    const val = (selectEl.value || '').trim().toLowerCase();
    const isOther = val === 'others' || val === "other's" || val === 'other';
    if (isOther) {
      wrapEl.classList.add('is-visible');
      const input = wrapEl.querySelector('input');
      if (input) {
        input.required = true;
        input.focus();
      }
    } else {
      wrapEl.classList.remove('is-visible');
      const input = wrapEl.querySelector('input');
      if (input) {
        input.required = false;
        input.value = '';
      }
    }
  };

  selectEl.addEventListener('change', checkValue);
}

/* ==========================================================================
   4. MODALS MANAGEMENT (REGISTER, FEE DOWNLOAD, SUCCESS POPUP)
   ========================================================================== */
function initModalControllers() {
  // Close buttons on all modals
  document.querySelectorAll('.modal-close-btn, .btn-close-modal-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close when clicking overlay backdrop
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Ticker keyboard trigger (Enter or Space)
  const tickerBanner = document.getElementById('admissionsTickerBanner');
  if (tickerBanner) {
    tickerBanner.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.openRegisterModal();
      }
    });
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.classList.remove('is-active');
  });
}

/* ==========================================================================
   HELLOBOTZ-STYLE ADMISSION ALERT POPUP & 2-SECOND FLIPPING COLLEGE BRAND
   Colleges: Christ / Jospehs / NMIMS / SYMBIOSIS / BMS / PES / RVCE / MSRIT / VIT
   ========================================================================== */
const POPUP_FLIP_COLLEGES = [
  {
    name: "Christ University",
    tagline: "Central, BGR & Kengeri Campus",
    meta: "NAAC A+ • Bangalore",
    pillClass: "pill-indigo",
    logo: "images/logos/christ.png",
    alt: "Christ University Official Logo"
  },
  {
    name: "St. Joseph's University",
    tagline: "SJU & SJCC Bengaluru",
    meta: "NAAC A++ • Autonomous",
    pillClass: "pill-rose",
    logo: "images/logos/stjosephs.png",
    alt: "St. Joseph's University Official Logo"
  },
  {
    name: "NMIMS Deemed University",
    tagline: "Bengaluru & Mumbai Campus",
    meta: "Top B-School • NIRF Ranked",
    pillClass: "pill-rose",
    logo: "images/logos/nmims.svg",
    alt: "NMIMS Official Logo"
  },
  {
    name: "Symbiosis International",
    tagline: "Bengaluru & Pune Campus",
    meta: "SIU • Category-1 Deemed",
    pillClass: "pill-amber",
    logo: "images/logos/symbiosis.svg",
    alt: "Symbiosis International Official Logo"
  },
  {
    name: "BMS College of Engineering",
    tagline: "Basavanagudi Main Campus",
    meta: "78 Yrs Legacy • Autonomous",
    pillClass: "pill-emerald",
    logo: "images/logos/bmsce.png",
    alt: "BMSCE Official Logo"
  },
  {
    name: "PES University",
    tagline: "RR & Electronic City Campus",
    meta: "Top CS & Tech • Tier-1",
    pillClass: "pill-purple",
    logo: "images/logos/pes.png",
    alt: "PES University Official Logo"
  },
  {
    name: "RV College of Engineering",
    tagline: "Mysore Road Bangalore",
    meta: "Top Engineering • Autonomous",
    pillClass: "pill-blue",
    logo: "images/logos/rvce.png",
    alt: "RVCE Official Logo"
  },
  {
    name: "Ramaiah (MSRIT)",
    tagline: "Mathikere Bangalore",
    meta: "NIRF Top 70 • Autonomous",
    pillClass: "pill-blue",
    logo: "images/logos/msrit.png",
    alt: "Ramaiah MSRIT Official Logo"
  },
  {
    name: "VIT University",
    tagline: "Vellore, Chennai & AP",
    meta: "NIRF #11 • Inst of Eminence",
    pillClass: "pill-teal",
    logo: "images/logos/vit.png",
    alt: "VIT University Official Logo"
  }
];

let popupFlipIndex = 0;
let popupFlipInterval = null;

function initAdmissionAlertPopup() {
  const modal = document.getElementById('admissionAlertModal');
  if (!modal) return;

  // Start the 2-second college flipping interval
  startPopupCollegeFlip();

  // Primary Action Button: Apply Now / Book Quota Seat
  const applyBtn = document.getElementById('btnPopupApplyNow');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      closeAdmissionAlertPopup();
      const activeCollege = POPUP_FLIP_COLLEGES[popupFlipIndex] ? POPUP_FLIP_COLLEGES[popupFlipIndex].name : '';
      window.openRegisterModal(activeCollege);
    });
  }

  // Close button inside the popup card
  const closeBtn = document.getElementById('closeAdmissionAlertBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAdmissionAlertPopup();
    });
  }

  // Automatic entrance popup as soon as users open the website (700ms smooth delay)
  setTimeout(() => {
    openAdmissionAlertPopup();
  }, 700);
}

function openAdmissionAlertPopup() {
  const modal = document.getElementById('admissionAlertModal');
  if (!modal) return;
  modal.classList.add('is-active');
  startPopupCollegeFlip();
}

function closeAdmissionAlertPopup() {
  const modal = document.getElementById('admissionAlertModal');
  if (!modal) return;
  modal.classList.remove('is-active');
}

function startPopupCollegeFlip() {
  if (popupFlipInterval) clearInterval(popupFlipInterval);
  popupFlipInterval = setInterval(() => {
    const container = document.getElementById('popupFlipBrand');
    const logoEl = document.getElementById('popupFlipLogo');
    const nameEl = document.getElementById('popupFlipCollegeName');
    const taglineEl = document.getElementById('popupFlipCollegeTagline');
    const metaEl = document.getElementById('popupFlipCollegeMeta');

    if (!container || !logoEl || !nameEl || !taglineEl || !metaEl) return;

    // Trigger smooth 3D flip
    container.classList.add('is-flipping');

    setTimeout(() => {
      popupFlipIndex = (popupFlipIndex + 1) % POPUP_FLIP_COLLEGES.length;
      const col = POPUP_FLIP_COLLEGES[popupFlipIndex];

      logoEl.src = col.logo;
      logoEl.alt = col.alt;
      nameEl.textContent = col.name;
      taglineEl.textContent = col.tagline;
      metaEl.innerHTML = `<span class="badge-pill ${col.pillClass}">${col.meta.split('•')[0].trim()}</span> • ${col.meta.split('•')[1] ? col.meta.split('•')[1].trim() : 'Admissions 2027'}`;

      container.classList.remove('is-flipping');
    }, 280);
  }, 2000); // exactly 2 seconds as requested!
}

window.openAdmissionAlertPopup = openAdmissionAlertPopup;
window.closeAdmissionAlertPopup = closeAdmissionAlertPopup;

window.openRegisterModal = function(prefillCollege = '', prefillCourse = '') {
  let target = 'enquiry.html';
  const params = [];
  if (prefillCollege) params.push('college=' + encodeURIComponent(prefillCollege));
  if (prefillCourse) params.push('course=' + encodeURIComponent(prefillCourse));
  if (params.length) target += '?' + params.join('&');
  window.location.href = target;
};

window.openFeeModal = function(prefillCollege = '', prefillCourse = '') {
  let target = 'fee-structure.html';
  const params = [];
  if (prefillCollege) params.push('college=' + encodeURIComponent(prefillCollege));
  if (prefillCourse) params.push('course=' + encodeURIComponent(prefillCourse));
  if (params.length) target += '?' + params.join('&');
  window.location.href = target;
};

window.openSuccessModal = function(applicantName = 'Student', actionType = 'registration') {
  // Backwards compatibility proxy
  window.openEnhancedSuccessModal({
    fullName: applicantName,
    refId: 'TEC-' + Math.floor(100000 + Math.random() * 900000),
    course: 'Academic Program',
    college: 'Premier Institution',
    formType: actionType,
    waUrl1: 'https://wa.me/919845371459',
    waUrl2: 'https://wa.me/918884058241',
    waUrl3: 'https://wa.me/919731998555'
  });
};

window.openEnhancedSuccessModal = function(data) {
  closeAllModals();
  const modal = document.getElementById('successModal');
  if (!modal) return;

  const titleEl = document.getElementById('successApplicantTitle');
  const msgEl = document.getElementById('successApplicantMsg');

  if (titleEl) {
    titleEl.textContent = `Enquiry Received, ${data.fullName}!`;
  }

  if (msgEl) {
    msgEl.innerHTML = `
      <div class="success-summary-card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <span class="success-ref-pill">
            <i class="fa-solid fa-circle-check"></i> Ref: ${data.refId}
          </span>
          <span style="font-size: 0.72rem; color: #15803d; font-weight: 750;">Priority Locked</span>
        </div>
        <p class="success-details-text">
          Admission enquiry for <strong>${data.course || 'Admissions 2027'}</strong> at <strong>${data.college || 'Bangalore Premier Colleges'}</strong> has been registered with our senior academic counselors.
        </p>

        <!-- Official Counselor Routing Box -->
        <div class="success-counselor-section">
          <div class="success-counselor-label">Official Counselor Desks:</div>
          <div class="success-counselor-grid">
            <a href="${data.waUrl1 || 'https://wa.me/919845371459'}" target="_blank" rel="noopener noreferrer" class="success-wa-pill wa-pill-primary">
              <span class="wa-pill-left"><i class="fa-brands fa-whatsapp"></i> Bangalore &amp; Abroad Desk</span>
              <span class="wa-pill-action">Open &rarr;</span>
            </a>
            <a href="${data.waUrl2 || 'https://wa.me/918884058241'}" target="_blank" rel="noopener noreferrer" class="success-wa-pill wa-pill-secondary">
              <span class="wa-pill-left"><i class="fa-brands fa-whatsapp"></i> Bangalore Quota Desk</span>
              <span class="wa-pill-action">Send &rarr;</span>
            </a>
            <a href="${data.waUrl3 || 'https://wa.me/919731998555'}" target="_blank" rel="noopener noreferrer" class="success-wa-pill wa-pill-tertiary">
              <span class="wa-pill-left"><i class="fa-brands fa-whatsapp"></i> Entrance Prep Desk</span>
              <span class="wa-pill-action">Desk &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  modal.classList.add('is-active');
};

/**
 * Universal Form Lead Processor
 * 1. Saves lead to localStorage for Excel Export
 * 2. Calls /api/submit-enquiry for counselor alert & student confirmation email
 * 3. Formats message and triggers WhatsApp routing (919845371459, 918884058241 & 919731998555)
 */
window.handleAdmissionFormSubmit = function(formElement, formType = 'registration') {
  // Prevent duplicate submissions / rapid double taps
  if (formElement.dataset.submitting === 'true') {
    return;
  }
  formElement.dataset.submitting = 'true';

  const submitBtn = formElement.querySelector('button[type="submit"]');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-submitting');
  }

  const unlockForm = () => {
    delete formElement.dataset.submitting;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove('btn-submitting');
      submitBtn.innerHTML = originalBtnHtml;
    }
  };
  setTimeout(unlockForm, 4000);

  const fullName = formElement.querySelector('input[name="fullName"]')?.value?.trim() || 'Student';
  const phone = formElement.querySelector('input[name="phone"]')?.value?.trim() || '';
  const email = formElement.querySelector('input[name="email"]')?.value?.trim() || '';

  let college = formElement.querySelector('select[name="college"]')?.value || '';
  if (college === 'Others') {
    college = formElement.querySelector('input[name="otherCollegeName"]')?.value?.trim() || 'Other College';
  }
  let course = formElement.querySelector('select[name="course"]')?.value || '';
  if (course === 'Others') {
    course = formElement.querySelector('input[name="otherCourseName"]')?.value?.trim() || 'Other Course';
  }
  const destination = formElement.querySelector('select[name="studyDestination"]')?.value || 'India';

  let programLevel = formElement.querySelector('select[name="programLevel"]')?.value || '';
  if (programLevel.toLowerCase() === 'others' || programLevel.toLowerCase() === "other's") {
    programLevel = formElement.querySelector('input[name="otherProgramLevel"]')?.value?.trim() || 'Others';
  }
  if (!programLevel) {
    programLevel = (course && (course.includes('M.') || course.includes('MBA') || course.includes('MCA') || course.includes('MS'))) ? 'PG' : 'UG';
  }

  const refId = 'TEC-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const timestampStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // 1. Persist lead in localStorage for Excel Lead Tracker
  const leadRecord = {
    refId,
    fullName,
    phone,
    email,
    programLevel,
    course: course || 'Academic Program',
    college: college || 'Premier Institution',
    studyDestination: destination,
    source: formType,
    status: 'New',
    timestamp: now.toISOString()
  };

  try {
    const existing = JSON.parse(localStorage.getItem('the_edu_consultant_leads') || '[]');
    existing.unshift(leadRecord);
    localStorage.setItem('the_edu_consultant_leads', JSON.stringify(existing));
  } catch (err) {
    console.warn('Lead storage error:', err);
  }

  // 2. Dispatch to Google Apps Script Web App (Logs to Google Sheet & dispatches email from enquiry@theeduconsultant.com)
  const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXnFbX5MJTcTOv9bEhUy4xU1nnfCBHjBXMflmZJCC7m0aNzH3vV7WIkbt8kgRB57c/exec';
  const googleScriptUrl = window.GOOGLE_SCRIPT_WEBAPP_URL || localStorage.getItem('the_edu_consultant_google_script_url') || DEFAULT_GOOGLE_SCRIPT_URL;
  if (googleScriptUrl) {
    try {
      fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(leadRecord)
      }).catch(e => console.warn('Google Apps Script dispatch:', e));
    } catch (e) {}
  }

  // 2B. Also forward to /api/submit-enquiry (Flagged with directScriptDispatched: true to prevent duplicate sheet logging)
  try {
    fetch('/api/submit-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leadRecord, googleScriptUrl, directScriptDispatched: true })
    }).catch(e => console.warn('API background submit:', e));
  } catch (e) {}

  // 3. Formulate structured WhatsApp text for Counselors
  const waText = 
`*🎓 NEW ADMISSION ENQUIRY - THE EDU CONSULTANT*
━━━━━━━━━━━━━━━━━━━━━
👤 *Student Name:* ${fullName}
📱 *Phone / WhatsApp:* ${phone}
📧 *Email:* ${email || 'Not provided'}
🎓 *Program Level:* ${programLevel}
📚 *Course / Stream:* ${course || 'General Guidance'}
🏛️ *Target College:* ${college || 'Bangalore Premier'}
📍 *Destination:* ${destination}
🕒 *Submitted At:* ${timestampStr}
🆔 *Ref ID:* ${refId}
━━━━━━━━━━━━━━━━━━━━━
_Please verify quota seats and call back the student promptly._`;

  const waEncoded = encodeURIComponent(waText);
  const waUrl1 = `https://wa.me/919845371459?text=${waEncoded}`;
  const waUrl2 = `https://wa.me/918884058241?text=${waEncoded}`;
  const waUrl3 = `https://wa.me/919731998555?text=${waEncoded}`;

  // Automatically open WhatsApp 1
  try {
    window.open(waUrl1, '_blank');
  } catch (e) {
    console.warn('Popup blocked for WhatsApp 1:', e);
  }

  // If Fee download requested, trigger the document
  if (formType === 'fee') {
    triggerFeeDocumentDownload(fullName, college, course);
  }

  // Open the enhanced success modal with WhatsApp dispatch buttons & email confirmation note
  window.openEnhancedSuccessModal({
    fullName,
    phone,
    email,
    college,
    course,
    refId,
    formType,
    waUrl1,
    waUrl2,
    waUrl3
  });

  formElement.reset();
  unlockForm();
};

/* ==========================================================================
   5. FORM SUBMISSION HANDLERS & PDF DOWNLOAD GENERATOR
   ========================================================================== */
function initFormSubmissions() {
  // 1. On-page form
  const onPageForm = document.getElementById('mainAdmissionsForm');
  if (onPageForm) {
    onPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.handleAdmissionFormSubmit(onPageForm, 'Direct Consultation Form');
    });
  }

  // 2. Modal register form
  const modalRegisterForm = document.getElementById('modalRegisterForm');
  if (modalRegisterForm) {
    modalRegisterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.handleAdmissionFormSubmit(modalRegisterForm, 'Quick Register Modal');
    });
  }

  // 3. Download Fee Structure Form
  const downloadFeeForm = document.getElementById('downloadFeeForm');
  if (downloadFeeForm) {
    downloadFeeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.handleAdmissionFormSubmit(downloadFeeForm, 'fee');
    });
  }

  // 4. Standalone enquiry page form
  const standaloneEnquiryForm = document.getElementById('standaloneEnquiryForm');
  if (standaloneEnquiryForm) {
    standaloneEnquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enquiryType = standaloneEnquiryForm.querySelector('input[name="enquiryType"]')?.value || 'admission-enquiry';
      window.handleAdmissionFormSubmit(standaloneEnquiryForm, enquiryType === 'fee-structure' ? 'fee' : 'Enquiry Page Form');
    });
  }

  // 5. Standalone fee page form
  const standaloneFeeForm = document.getElementById('standaloneFeeForm');
  if (standaloneFeeForm) {
    standaloneFeeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.handleAdmissionFormSubmit(standaloneFeeForm, 'fee');
    });
  }
}

/**
 * Generates and downloads a branded PDF/Text Fee Breakdown Certificate
 */
function triggerFeeDocumentDownload(name, college, course) {
  const content = `
================================================================================
                    THE EDU CONSULTANT - OFFICIAL ADMISSIONS PORTAL
                  Management Quota Fee Structure & Allocation Notice
================================================================================

Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
Application Reference: TEC-${Math.floor(100000 + Math.random() * 900000)}

APPLICANT PROFILE:
- Full Name: ${name}
- Target College: ${college}
- Preferred Course: ${course}
- Academic Year: 2026 - 2027

MANAGEMENT QUOTA & MERIT FEE SCHEDULE SUMMARY:
--------------------------------------------------------------------------------
1. Institutional Tuition Fee (Annual):
   - Standard Quota Range: ₹1,50,000 - ₹4,25,000 per annum (Subject to branch)
   - Category-wise / NRI Quota: As per Governing Board guidelines

2. One-Time University Development / Registration Charges:
   - ₹25,000 - ₹50,000 (Payable at time of provisional seat locking)

3. Merit Scholarship Eligibility:
   - Students securing >85% in qualifying exams receive up to 30% tuition concessions.

NEXT STEPS:
1. An allocated Senior Academic Counselor from The Edu Consultant will verify your
   academic credentials within 2 business hours.
2. Required documents for seat verification: 10th & 12th Marks Cards, Transfer Certificate,
   Entrance Test Rank Card (if appeared).

ENTRANCE TEST PREPARATION ADVISORY:
Preparing for upcoming entrance tests (KCET, COMEDK, JEE, NEET, MAT, CLAT)?
Prepare on India's premier testing engine: https://studententrance.com/

Helpline: 
- 9845371459 — Bangalore & Abroad Counsellor
- 8884058241 — Bangalore - Counsellor
- 9731998555 — Entrance prep
Official Website: https://theeduconsultant.in/
================================================================================
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TheEduConsultant_${college.replace(/\s+/g, '_')}_Fee_Structure_2027.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ==========================================================================
   6. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('desktopNav');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('mobile-nav-active');
  });

  // Auto-close on clicking any nav link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-nav-active');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      navMenu.classList.remove('mobile-nav-active');
    }
  });
}

/* ==========================================================================
   7. STICKY DYNAMIC HEADER & SCROLL LOGO SWITCHER
   ========================================================================== */
function initScrollHeader() {
  const header = document.getElementById('siteHeader') || document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    if (scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   8. SCROLLING ENQUIRY BUTTONS CONTROLLER
   (Admission Enquiry, Fee Structure, Management Quota, Abroad Admissions)
   ========================================================================== */
function initEnquiryPillButtons() {
  document.querySelectorAll('.enquiry-buttons-track').forEach(track => {
    const buttons = track.querySelectorAll('.enquiry-pill-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active from siblings in this track
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const enquiryType = btn.getAttribute('data-type') || 'admission-enquiry';
        const formId = btn.getAttribute('data-form-id');
        const form = formId ? document.getElementById(formId) : btn.closest('form');

        if (form) {
          // Update hidden input
          const hiddenInput = form.querySelector('input[name="enquiryType"]');
          if (hiddenInput) {
            hiddenInput.value = enquiryType;
          }

          // Dynamic submit button text
          const submitBtn = form.querySelector('button[type="submit"]');
          const submitTextSpan = submitBtn ? submitBtn.querySelector('span') : null;
          if (submitTextSpan) {
            if (enquiryType === 'fee-structure') {
              submitTextSpan.textContent = 'Download Verified Fee Structure (2027)';
            } else if (enquiryType === 'management-quota') {
              submitTextSpan.textContent = 'Apply for Management Quota Priority';
            } else if (enquiryType === 'abroad-admissions') {
              submitTextSpan.textContent = 'Submit Abroad Admission Enquiry';
            } else {
              submitTextSpan.textContent = 'Submit your Enquiry & Lock Priority';
            }
          }

          // Dynamic context pre-selections
          const destinationSelect = form.querySelector('select[name="studyDestination"]');
          if (destinationSelect) {
            if (enquiryType === 'abroad-admissions') {
              destinationSelect.value = 'Abroad';
            } else if (enquiryType === 'management-quota') {
              destinationSelect.value = 'India';
            }
          }
        }
      });
    });
  });

  // URL search parameter support (?type=fee, ?type=quota, ?type=abroad, ?type=admission, ?college=..., ?course=...)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type') || urlParams.get('category');
    if (typeParam) {
      let targetType = 'admission-enquiry';
      if (typeParam.includes('fee')) targetType = 'fee-structure';
      else if (typeParam.includes('quota') || typeParam.includes('mgmt')) targetType = 'management-quota';
      else if (typeParam.includes('abroad') || typeParam.includes('global')) targetType = 'abroad-admissions';

      document.querySelectorAll(`.enquiry-pill-btn[data-type="${targetType}"]`).forEach(btn => {
        btn.click();
      });
    }

    const collegeParam = urlParams.get('college');
    if (collegeParam) {
      document.querySelectorAll('select[name="college"]').forEach(sel => {
        const match = Array.from(sel.options).find(o => o.value.toLowerCase().includes(collegeParam.toLowerCase()));
        if (match) {
          sel.value = match.value;
        } else {
          const otherOpt = Array.from(sel.options).find(o => o.value === 'Others');
          if (otherOpt) {
            sel.value = 'Others';
            sel.dispatchEvent(new Event('change'));
            const customInput = document.querySelector('input[name="otherCollegeName"], input[name="otherCollege"]');
            if (customInput) customInput.value = collegeParam;
          }
        }
      });
    }

    const courseParam = urlParams.get('course') || urlParams.get('stream');
    if (courseParam) {
      document.querySelectorAll('select[name="course"], select[name="discipline"]').forEach(sel => {
        const match = Array.from(sel.options).find(o => o.value.toLowerCase().includes(courseParam.toLowerCase()));
        if (match) {
          sel.value = match.value;
        } else {
          const otherOpt = Array.from(sel.options).find(o => o.value === 'Others');
          if (otherOpt) {
            sel.value = 'Others';
            sel.dispatchEvent(new Event('change'));
            const customInput = document.querySelector('input[name="otherCourseName"], input[name="otherDiscipline"]');
            if (customInput) customInput.value = courseParam;
          }
        }
      });
    }
  } catch (err) {
    console.warn('URL params parser:', err);
  }
}

/* ==========================================================================
   STUDYLIFTER FLOATING SEARCH & TAB CONTROLLER (BANGALORE & INDIA ADMISSIONS)
   ========================================================================== */
window.handleSearchTabClick = function(tab) {
  const tabs = document.querySelectorAll('.search-tab-pill');
  tabs.forEach(t => t.classList.remove('active'));
  
  if (tab === 'colleges') {
    const tabEl = document.getElementById('searchTabColleges');
    if (tabEl) tabEl.classList.add('active');
    if (typeof window.switchDirectoryMode === 'function') {
      window.switchDirectoryMode('colleges');
    }
    const dirEl = document.getElementById('directorySection');
    if (dirEl) dirEl.scrollIntoView({ behavior: 'smooth' });
  } else if (tab === 'schools') {
    const tabEl = document.getElementById('searchTabSchools');
    if (tabEl) tabEl.classList.add('active');
    if (typeof window.switchDirectoryMode === 'function') {
      window.switchDirectoryMode('schools');
    }
    const dirEl = document.getElementById('directorySection');
    if (dirEl) dirEl.scrollIntoView({ behavior: 'smooth' });
  } else if (tab === 'programs') {
    const tabEl = document.getElementById('searchTabPrograms');
    if (tabEl) tabEl.classList.add('active');
    if (typeof window.switchDirectoryMode === 'function') {
      window.switchDirectoryMode('programs');
    }
    const dirEl = document.getElementById('directorySection');
    if (dirEl) dirEl.scrollIntoView({ behavior: 'smooth' });
  } else if (tab === 'fees') {
    const tabEl = document.getElementById('searchTabFees');
    if (tabEl) tabEl.classList.add('active');
    window.location.href = 'fee-structure.html';
  } else if (tab === 'counselling') {
    const tabEl = document.getElementById('searchTabCounselling');
    if (tabEl) tabEl.classList.add('active');
    window.location.href = 'enquiry.html';
  }
};

/* ==========================================================================
   PROGRAM LEVEL & DYNAMIC STREAM SELECTOR DATA
   ========================================================================== */
const PROGRAM_STREAM_DATA = {
  all: [
    { value: 'all', label: 'All Disciplines & Streams' },
    { value: 'engineering', label: 'Engineering & Technology (B.Tech / B.E / M.Tech)' },
    { value: 'management', label: 'Management & MBA (BBA / MBA / PGDM)' },
    { value: 'computer-applications', label: 'Computer Applications & IT (BCA / MCA)' },
    { value: 'commerce', label: 'Commerce & Finance (B.Com / M.Com / ACCA)' },
    { value: 'medical', label: 'Medical & Healthcare (MBBS / BDS / MD / MS)' },
    { value: 'science', label: 'Science & Biotechnology (B.Sc / M.Sc)' },
    { value: 'law', label: 'Law & Legal Studies (BA LLB / BBA LLB / LLM)' },
    { value: 'pharmacy', label: 'Pharmacy & Nursing (B.Pharm / M.Pharm / Nursing)' },
    { value: 'architecture', label: 'Architecture & Design (B.Arch / B.Des / M.Arch)' },
    { value: 'Others', label: 'Others (Specify Preferred Course)' }
  ],
  ug: [
    { value: 'all-ug', label: 'All UG Programs (Undergraduate)' },
    { value: 'btech', label: 'B.Tech / B.E (CSE, AI/ML, ECE, Mech, Data Science)' },
    { value: 'bca', label: 'BCA (Bachelor of Computer Applications - Cloud/Cyber)' },
    { value: 'bba', label: 'BBA / BMS (Finance, Marketing, Business Analytics)' },
    { value: 'bcom', label: 'B.Com / B.Com (Hons) (Accounting, Taxation & ACCA)' },
    { value: 'bsc', label: 'B.Sc (Computer Science, Biotechnology, Nursing)' },
    { value: 'ba', label: 'BA (Economics, Journalism, Psychology, English)' },
    { value: 'mbbs', label: 'MBBS / BDS (Medical & Dental Surgery)' },
    { value: 'bpharm', label: 'B.Pharm / Pharm.D / B.Sc Nursing' },
    { value: 'ballb', label: 'BA LLB / BBA LLB (Integrated 5-Year Law)' },
    { value: 'barch', label: 'B.Arch / B.Des (Architecture & Design)' },
    { value: 'Others', label: 'Others (Specify Preferred Course)' }
  ],
  pg: [
    { value: 'all-pg', label: 'All PG Programs (Postgraduate)' },
    { value: 'mba', label: 'MBA / PGDM (Finance, Marketing, Business Analytics, HR)' },
    { value: 'mca', label: 'MCA (Master of Computer Applications - AI & Full Stack)' },
    { value: 'mtech', label: 'M.Tech / M.E (Computer Science, AI, VLSI, Robotics)' },
    { value: 'mcom', label: 'M.Com (Accounting, Corporate Finance & Banking)' },
    { value: 'msc', label: 'M.Sc (Data Science, Artificial Intelligence, Biotech)' },
    { value: 'md-ms', label: 'MD / MS (Medical Post Graduation & Super-Specialty)' },
    { value: 'llm', label: 'LLM (Corporate Law, Intellectual Property, Constitutional)' },
    { value: 'mpharm', label: 'M.Pharm (Pharmaceutics, Pharmacology)' },
    { value: 'march', label: 'M.Arch / M.Des (Master of Architecture & Design)' },
    { value: 'ma', label: 'MA (Economics, Public Policy, Mass Communication)' },
    { value: 'Others', label: 'Others (Specify Preferred Course)' }
  ],
  schools: [
    { value: 'all-schools', label: 'All School Curriculums & Boards (144 Schools)' },
    { value: 'cbse', label: 'CBSE - Central Board of Secondary Education' },
    { value: 'icse-isc', label: 'ICSE & ISC - CISCE Board' },
    { value: 'igcse', label: 'IGCSE & Cambridge Assessment International' },
    { value: 'ib', label: 'IB - International Baccalaureate (PYP / MYP / DP)' },
    { value: 'state-board', label: 'Karnataka State Board & Pre-University (PUC)' },
    { value: 'pre-primary', label: 'Pre-Primary, Montessori & Nursery Admissions' },
    { value: 'Others', label: 'Others (Specify Preferred Board / Class)' }
  ]
};

// Aliases for user-specified uppercase formats: SCHOOL, UG, PG, OTHERS
PROGRAM_STREAM_DATA.school = PROGRAM_STREAM_DATA.schools;
PROGRAM_STREAM_DATA.SCHOOL = PROGRAM_STREAM_DATA.schools;
PROGRAM_STREAM_DATA.UG = PROGRAM_STREAM_DATA.ug;
PROGRAM_STREAM_DATA.PG = PROGRAM_STREAM_DATA.pg;
PROGRAM_STREAM_DATA.OTHERS = PROGRAM_STREAM_DATA.all;
PROGRAM_STREAM_DATA.others = PROGRAM_STREAM_DATA.all;

window.updateHeroCollegeOptions = function(stream, level) {
  const collegeSelect = document.getElementById('searchCollege');
  if (!collegeSelect) return;

  const currentLevel = (level || document.getElementById('searchProgramLevel')?.value || '').toLowerCase();
  const currentStream = (stream || document.getElementById('searchDiscipline')?.value || '').toLowerCase();

  const isSchool = currentLevel === 'school' || currentLevel === 'schools' ||
                   currentStream.includes('school') || currentStream === 'cbse' ||
                   currentStream === 'icse-isc' || currentStream === 'ib' ||
                   currentStream === 'igcse' || currentStream === 'state-board' ||
                   currentStream === 'pre-primary';

  const isCommerce = currentStream === 'commerce' || currentStream === 'bcom' || currentStream === 'mcom' ||
                     currentStream === 'management' || currentStream === 'bba' || currentStream === 'mba' ||
                     currentStream === 'ba' || currentStream === 'ma' || currentStream === 'law' ||
                     currentStream === 'ballb' || currentStream === 'llm';

  const isEngineering = currentStream === 'engineering' || currentStream === 'btech' || currentStream === 'mtech' ||
                        currentStream === 'computer-applications' || currentStream === 'bca' || currentStream === 'mca' ||
                        currentStream === 'architecture' || currentStream === 'barch' || currentStream === 'march';

  const isMedical = currentStream === 'medical' || currentStream === 'mbbs' || currentStream === 'bds' ||
                    currentStream === 'md-ms' || currentStream === 'pharmacy' || currentStream === 'bpharm' ||
                    currentStream === 'mpharm' || currentStream === 'science' || currentStream === 'bsc' ||
                    currentStream === 'msc';

  if (isSchool) {
    collegeSelect.innerHTML = `
      <option value="all">All Premier Bangalore Schools (144+ Schools)</option>
      <option value="St. Joseph's Boys' High School">St. Joseph's Boys' High School (Museum Road)</option>
      <option value="Bishop Cotton Boys' School">Bishop Cotton Boys' School (St. Mark's Road)</option>
      <option value="Bishop Cotton Girls' School">Bishop Cotton Girls' School (St. Mark's Road)</option>
      <option value="Canadian International School">Canadian International School (CIS Yelahanka)</option>
      <option value="Bangalore International School">Bangalore International School (BIS Hennur)</option>
      <option value="Greenwood High">Greenwood High International School (Sarjapur / Whitefield)</option>
      <option value="Indus International School">Indus International School (Sarjapur)</option>
      <option value="Inventure Academy">Inventure Academy (Whitefield - Sarjapur)</option>
      <option value="Mallya Aditi International School">Mallya Aditi International School (Yelahanka)</option>
      <option value="National Public School">National Public School (NPS Indiranagar / Koramangala / Rajajinagar / HSR)</option>
      <option value="The International School Bangalore">The International School Bangalore (TISB)</option>
      <option value="Stonehill International School">Stonehill International School (Jalahalli)</option>
      <option value="Vidyashilp Academy">Vidyashilp Academy (Jakkur)</option>
      <option value="Bethany High School">Bethany High School (Koramangala)</option>
      <option value="BGS National Public School">BGS National Public School (Hulimavu)</option>
      <option value="Christ Academy">Christ Academy ICSE School / Junior College</option>
      <option value="Chrysalis High">Chrysalis High (Varthur / Bannerghatta)</option>
      <option value="Clarence High School">Clarence High School (Richards Town)</option>
      <option value="Baldwin Boys' High School">Baldwin Boys' High School (Richmond Town)</option>
      <option value="Baldwin Girls' High School">Baldwin Girls' High School (Richmond Town)</option>
      <option value="Army Public School">Army Public School (Kamaraj Road)</option>
      <option value="Sri Kumaran Children's Home">Sri Kumaran Children's Home</option>
      <option value="Delhi Public School">Delhi Public School (DPS Bangalore South / North / East)</option>
      <option value="Others">Others (Specify Preferred School)</option>
    `;
    return;
  }

  if (isCommerce) {
    collegeSelect.innerHTML = `
      <option value="all">All Top Commerce &amp; Management Colleges</option>
      <option value="St. Joseph's College of Commerce (SJCC)">St. Joseph's College of Commerce (SJCC - Brigade Road)</option>
      <option value="St. Joseph's University">St. Joseph's University (SJU - Langford Road)</option>
      <option value="Christ University">Christ University (Central, BGR &amp; Yeshwanthpur)</option>
      <option value="Mount Carmel College">Mount Carmel College (MCC - Palace Road)</option>
      <option value="NMIMS Mumbai">NMIMS Deemed University (Mumbai &amp; Bengaluru Campus)</option>
      <option value="Symbiosis International">Symbiosis International University (SIU Bengaluru &amp; Pune)</option>
      <option value="Jain University">Jain University (CMS - Center for Management Studies)</option>
      <option value="Kristu Jayanti College">Kristu Jayanti College (KJC Autonomous)</option>
      <option value="Presidency College">Presidency College &amp; University</option>
      <option value="REVA University">REVA University (School of Commerce &amp; Management)</option>
      <option value="Dayananda Sagar">Dayananda Sagar College of Arts, Science &amp; Commerce</option>
      <option value="BMS College of Commerce">BMS College of Commerce &amp; Management (BMSCCM)</option>
      <option value="MES College">MES College of Arts, Commerce &amp; Science (Malleswaram)</option>
      <option value="Bishop Cotton Women's">Bishop Cotton Women's Christian College</option>
      <option value="Ramaiah College">Ramaiah College of Arts, Science &amp; Commerce (RCASC)</option>
      <option value="Acharya Institute">Acharya Institute of Graduate Studies (AIGS)</option>
      <option value="New Horizon College">New Horizon College (Kasturinagar / Marathahalli)</option>
      <option value="Others">Others (Specify Preferred Commerce College)</option>
    `;
    return;
  }

  if (isEngineering) {
    collegeSelect.innerHTML = `
      <option value="all">All Tier-1 Engineering &amp; Technology Colleges</option>
      <option value="RV College of Engineering">RV College of Engineering (RVCE - Mysore Road)</option>
      <option value="RV Institute of Technology">RV Institute of Technology &amp; Management (RVITM)</option>
      <option value="RV University">RV University (RVU)</option>
      <option value="BMS College of Engineering">BMS College of Engineering (BMSCE - Basavanagudi)</option>
      <option value="BMS Institute of Technology">BMS Institute of Technology &amp; Management (BMSIT)</option>
      <option value="PES University">PES University (Ring Road Campus &amp; Electronic City)</option>
      <option value="Ramaiah Institute">Ramaiah Institute of Technology (MSRIT - Mathikere)</option>
      <option value="Ramaiah University (RUAS)">Ramaiah University of Applied Sciences (RUAS Peenya)</option>
      <option value="Vellore Institute of Technology">Vellore Institute of Technology (VIT)</option>
      <option value="Dayananda Sagar">Dayananda Sagar College of Engineering (DSCE)</option>
      <option value="Dayananda Sagar Academy">Dayananda Sagar Academy of Technology (DSATM)</option>
      <option value="New Horizon College">New Horizon College of Engineering (NHCE)</option>
      <option value="Nitte Meenakshi">Nitte Meenakshi Institute of Technology (NMIT)</option>
      <option value="Sir M. Visvesvaraya">Sir M. Visvesvaraya Institute of Technology (SMVIT)</option>
      <option value="Presidency University">Presidency University (School of Engineering)</option>
      <option value="REVA University">REVA University (Faculty of Engineering)</option>
      <option value="Acharya Institute">Acharya Institute of Technology (AIT)</option>
      <option value="CMR Institute of Technology">CMR Institute of Technology (CMRIT)</option>
      <option value="Cambridge Institute">Cambridge Institute of Technology (CIT)</option>
      <option value="Global Academy">Global Academy of Technology (GAT)</option>
      <option value="RNS Institute of Technology">RNS Institute of Technology (RNSIT)</option>
      <option value="SJB Institute">SJB Institute of Technology (SJBIT)</option>
      <option value="East Point College">East Point College of Engineering &amp; Technology</option>
      <option value="HKBK College">HKBK College of Engineering (Nagawara)</option>
      <option value="Atria Institute">Atria Institute of Technology (Hebbal)</option>
      <option value="Christ University Engineering">Christ University Faculty of Engineering (Kengeri)</option>
      <option value="Jain University Engineering">Jain University Faculty of Engineering (FET)</option>
      <option value="Others">Others (Specify Preferred Engineering College)</option>
    `;
    return;
  }

  if (isMedical) {
    collegeSelect.innerHTML = `
      <option value="all">All Top Medical &amp; Healthcare Colleges</option>
      <option value="Bangalore Medical College">Bangalore Medical College and Research Institute (BMCRI)</option>
      <option value="Vydehi Institute">Vydehi Institute of Medical Sciences &amp; Research Centre</option>
      <option value="St. John's Medical College">St. John's Medical College (Koramangala)</option>
      <option value="Ramaiah Medical College">M.S. Ramaiah Medical College (MSRMC)</option>
      <option value="Kempegowda Institute">Kempegowda Institute of Medical Sciences (KIMS)</option>
      <option value="Dr. B.R. Ambedkar Medical">Dr. B.R. Ambedkar Medical College</option>
      <option value="RajaRajeswari Medical">RajaRajeswari Medical College &amp; Hospital (RRMCH)</option>
      <option value="East Point Medical">East Point College of Medical Sciences</option>
      <option value="Dayananda Sagar Medical">Dayananda Sagar College of Dental Sciences / Medical</option>
      <option value="Oxford Medical College">The Oxford Medical College, Hospital &amp; Research Centre</option>
      <option value="BGS Global Institute">BGS Global Institute of Medical Sciences</option>
      <option value="Sri Siddhartha Medical">Sri Siddhartha Medical College</option>
      <option value="The Oxford College of Pharmacy">The Oxford College of Pharmacy &amp; Nursing</option>
      <option value="Krupanidhi College">Krupanidhi College of Pharmacy &amp; Nursing</option>
      <option value="Others">Others (Specify Preferred Medical College)</option>
    `;
    return;
  }

  // Default: Comprehensive list with organized optgroups including St. Joseph's College of Commerce!
  collegeSelect.innerHTML = `
    <option value="all">All Premier Colleges (Bangalore &amp; India)</option>
    <optgroup label="Top Commerce &amp; Management Colleges">
      <option value="St. Joseph's College of Commerce (SJCC)">St. Joseph's College of Commerce (SJCC - Brigade Road)</option>
      <option value="St. Joseph's University">St. Joseph's University (SJU - Langford Road)</option>
      <option value="Christ University">Christ University (Central &amp; BGR Campus)</option>
      <option value="Mount Carmel College">Mount Carmel College (MCC - Palace Road)</option>
      <option value="NMIMS Mumbai">NMIMS Deemed University (Mumbai &amp; Bengaluru)</option>
      <option value="Symbiosis International">Symbiosis International (SIU Bengaluru &amp; Pune)</option>
      <option value="Jain University">Jain University (CMS / FET)</option>
      <option value="Kristu Jayanti College">Kristu Jayanti College (KJC Autonomous)</option>
      <option value="Presidency College">Presidency College &amp; University</option>
      <option value="Dayananda Sagar">Dayananda Sagar College of Commerce</option>
    </optgroup>
    <optgroup label="Tier-1 Autonomous Engineering">
      <option value="RV College of Engineering">RV College of Engineering (RVCE)</option>
      <option value="RV Institute of Technology">RV Institute of Technology &amp; Management (RVITM)</option>
      <option value="RV University">RV University (RVU)</option>
      <option value="BMS College of Engineering">BMS College of Engineering (BMSCE)</option>
      <option value="BMS Institute of Technology">BMS Institute of Technology (BMSIT)</option>
      <option value="PES University">PES University (Ring Road / EC)</option>
      <option value="Ramaiah Institute">Ramaiah Institute of Technology (MSRIT)</option>
      <option value="Ramaiah University (RUAS)">Ramaiah University (RUAS Peenya)</option>
      <option value="Vellore Institute of Technology">Vellore Institute of Technology (VIT)</option>
      <option value="Dayananda Sagar">Dayananda Sagar College (DSCE / DSATM)</option>
      <option value="New Horizon College">New Horizon College of Engg (NHCE)</option>
      <option value="Nitte Meenakshi">Nitte Meenakshi Institute (NMIT)</option>
      <option value="Sir M. Visvesvaraya">Sir M. Visvesvaraya Institute (SMVIT)</option>
    </optgroup>
    <optgroup label="Medical &amp; Allied Health Sciences">
      <option value="Bangalore Medical College">Bangalore Medical College (BMCRI)</option>
      <option value="Vydehi Institute">Vydehi Institute of Medical Sciences</option>
      <option value="St. John's Medical College">St. John's Medical College</option>
      <option value="Ramaiah Medical College">Ramaiah Medical College (MSRMC)</option>
      <option value="Kempegowda Institute">Kempegowda Institute (KIMS)</option>
    </optgroup>
    <optgroup label="Top Schools (Bangalore &amp; International)">
      <option value="St. Joseph's Boys' High School">St. Joseph's Boys' High School (Museum Road)</option>
      <option value="Bishop Cotton Boys' School">Bishop Cotton Boys' School</option>
      <option value="Canadian International School">Canadian International School (CIS)</option>
      <option value="Greenwood High">Greenwood High International School</option>
      <option value="Indus International School">Indus International School</option>
      <option value="National Public School">National Public School (NPS)</option>
    </optgroup>
    <option value="Others">Others (Specify Preferred College / School)</option>
  `;
};

window.handleProgramLevelChange = function(level) {
  const disciplineSelect = document.getElementById('searchDiscipline');
  const normLevel = (level || '').toLowerCase();

  if (disciplineSelect) {
    const data = PROGRAM_STREAM_DATA[level] || PROGRAM_STREAM_DATA[normLevel] || PROGRAM_STREAM_DATA.all;
    disciplineSelect.innerHTML = '';
    data.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.value;
      opt.textContent = item.label;
      disciplineSelect.appendChild(opt);
    });

    // Reset conditional course input if stream is reset away from Others
    const discWrap = document.getElementById('heroConditionalDisciplineOther');
    if (discWrap && disciplineSelect.value !== 'Others' && disciplineSelect.value !== 'OTHERS') {
      discWrap.classList.remove('is-visible');
      const input = discWrap.querySelector('input');
      if (input) {
        input.required = false;
        input.value = '';
      }
    }
  }

  // Update colleges based on the new program level and current stream
  window.updateHeroCollegeOptions(disciplineSelect ? disciplineSelect.value : '', level);
};

window.handleHeroQuickSearch = function(e) {
  if (e) e.preventDefault();
  const progLevelSelect = document.getElementById('searchProgramLevel');
  const discSelect = document.getElementById('searchDiscipline');
  const collegeSelect = document.getElementById('searchCollege');

  const progLevel = progLevelSelect?.value || 'all';
  const disc = discSelect?.value || 'all';
  const college = collegeSelect?.value || 'all';

  const otherProgInput = document.getElementById('heroOtherProgramLevel');
  const otherDiscInput = document.getElementById('heroOtherDiscipline');
  const otherCollegeInput = document.getElementById('heroOtherCollege');

  const isOtherProg = progLevel === 'Others' || progLevel === 'OTHERS' || progLevel.toLowerCase() === 'others';
  const isOtherDisc = disc === 'Others' || disc === 'OTHERS' || disc.toLowerCase() === 'others';
  const isOtherCollege = college === 'Others' || college === 'OTHERS' || college.toLowerCase() === 'others';

  const customProg = (isOtherProg && otherProgInput) ? otherProgInput.value.trim() : '';
  const customDisc = (isOtherDisc && otherDiscInput) ? otherDiscInput.value.trim() : '';
  const customCollege = (isOtherCollege && otherCollegeInput) ? otherCollegeInput.value.trim() : '';

  const effectiveCollege = customCollege || (!isOtherCollege && college !== 'all' ? college : '');
  const effectiveDisc = customDisc || (!isOtherDisc && disc !== 'all' && disc !== 'all-ug' && disc !== 'all-pg' ? disc : '');
  const effectiveProg = customProg || (!isOtherProg && progLevel !== 'all' ? progLevel : '');

  // If schools was chosen or a school was selected/typed
  const isSchoolSearch = progLevel === 'schools' || progLevel === 'SCHOOL' || progLevel.toLowerCase() === 'school' || (effectiveCollege && (window.DIRECTORY_SCHOOLS || []).some(s => s.name.toLowerCase().includes(effectiveCollege.toLowerCase())));
  if (isSchoolSearch) {
    window.switchDirectoryMode('schools');
    const dirEl = document.getElementById('directorySection');
    if (dirEl) dirEl.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      const cards = document.querySelectorAll('.directory-card');
      const searchTerms = (effectiveCollege || effectiveDisc).toLowerCase().split(' ').filter(t => t.length > 2);
      let matchedCount = 0;
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const matches = searchTerms.some(term => text.includes(term));
        if (matches) {
          matchedCount++;
          card.style.outline = '3px solid #f59e0b';
          card.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.45)';
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            card.style.transition = 'all 1s ease';
            card.style.outline = 'none';
          }, 3500);
        }
      });
      if (matchedCount === 0 && (customCollege || customDisc)) {
        window.openRegisterModal(customCollege || effectiveCollege, customDisc || 'School Admission');
      }
    }, 400);
    return;
  }

  // If a specific college was chosen or custom typed in Others
  if (effectiveCollege) {
    window.switchDirectoryMode('colleges');

    document.querySelectorAll('.filter-tag').forEach(p => {
      if (p.dataset.filter === 'all') p.classList.add('active');
      else p.classList.remove('active');
    });

    if (typeof renderDirectoryGrid === 'function') {
      renderDirectoryGrid();
    }

    const dirEl = document.getElementById('directorySection');
    if (dirEl) dirEl.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      const cards = document.querySelectorAll('.directory-card');
      const searchTerms = effectiveCollege.toLowerCase().split(' ').filter(t => t.length > 2);
      let matchedCount = 0;
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const matches = searchTerms.some(term => text.includes(term));
        if (matches) {
          matchedCount++;
          card.style.outline = '3px solid #f59e0b';
          card.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.45)';
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            card.style.transition = 'all 1s ease';
            card.style.outline = 'none';
          }, 3500);
        }
      });

      // If user typed a custom "Others" college and no card matched, assist directly via enquiry modal
      if (matchedCount === 0 && customCollege) {
        window.openRegisterModal(customCollege, effectiveDisc || effectiveProg);
      }
    }, 400);
    return;
  }

  // If a program level or stream was chosen or custom typed
  // Map stream/course to category filter
  let targetFilter = 'all';
  const streamLower = (effectiveDisc || '').toLowerCase();
  if (['engineering', 'btech', 'mtech', 'bca', 'mca', 'computer-applications', 'architecture', 'barch', 'march'].some(k => streamLower.includes(k))) {
    targetFilter = 'engineering';
  } else if (['commerce', 'bcom', 'mcom', 'management', 'bba', 'mba', 'law', 'ballb', 'llm', 'ba', 'ma'].some(k => streamLower.includes(k))) {
    targetFilter = 'commerce';
  } else if (['medical', 'mbbs', 'bds', 'md-ms', 'pharmacy', 'bpharm', 'mpharm', 'science', 'bsc', 'msc'].some(k => streamLower.includes(k))) {
    targetFilter = 'medical';
  }

  // Display matching colleges list for the chosen stream
  currentDirectoryMode = 'colleges';
  const modeCollegesBtn = document.getElementById('modeCollegesBtn');
  const modeProgramsBtn = document.getElementById('modeProgramsBtn');
  const modeSchoolsBtn = document.getElementById('modeSchoolsBtn');
  if (modeCollegesBtn) modeCollegesBtn.classList.add('active');
  if (modeProgramsBtn) modeProgramsBtn.classList.remove('active');
  if (modeSchoolsBtn) modeSchoolsBtn.classList.remove('active');

  currentCategoryFilter = targetFilter;
  document.querySelectorAll('.filter-tag').forEach(p => {
    if (p.dataset.filter === targetFilter) p.classList.add('active');
    else p.classList.remove('active');
  });

  if (typeof renderDirectoryGrid === 'function') {
    renderDirectoryGrid();
  }

  const dirEl = document.getElementById('directorySection');
  if (dirEl) dirEl.scrollIntoView({ behavior: 'smooth' });

  // If a specific course was selected or typed, highlight matching cards
  if (effectiveDisc) {
    setTimeout(() => {
      const cards = document.querySelectorAll('.directory-card');
      const searchTerm = effectiveDisc.toLowerCase();
      let matchedCount = 0;
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm) || (searchTerm === 'btech' && text.includes('b.tech')) || (searchTerm === 'mtech' && text.includes('m.tech')) || (searchTerm === 'bcom' && text.includes('b.com')) || (searchTerm === 'mcom' && text.includes('m.com')) || (searchTerm === 'bsc' && text.includes('b.sc')) || (searchTerm === 'msc' && text.includes('m.sc'))) {
          matchedCount++;
          card.style.outline = '3px solid #f59e0b';
          card.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.45)';
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            card.style.transition = 'all 1s ease';
            card.style.outline = 'none';
          }, 3500);
        }
      });

      // If user typed custom course and no card matched, assist directly via enquiry modal
      if (matchedCount === 0 && customDisc) {
        window.openRegisterModal('', customDisc);
      }
    }, 400);
  }
};

/* ==========================================================================
   STUDYLIFTER FAQ ACCORDION CONTROLLER
   ========================================================================== */
window.toggleFaqItem = function(headerBtn) {
  const item = headerBtn.closest('.accordion-item');
  if (!item) return;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.zAccordion-two .accordion-item').forEach(el => {
    el.classList.remove('open');
  });
  if (!isOpen) {
    item.classList.add('open');
  }
};

/* ==========================================================================
   HERO CITY WORD ROTATOR (Bangalore -> Mumbai -> Pune -> Abroad every 2s)
   ========================================================================== */
function initHeroWordFlip() {
  const wrap = document.getElementById('heroFlipWrap') || document.querySelector('.hero-flip-wrap');
  if (!wrap) return;

  const words = wrap.querySelectorAll('.hero-flip-word');
  if (words.length <= 1) return;

  let currentIndex = 0;

  setInterval(() => {
    const currentWord = words[currentIndex];
    currentWord.classList.remove('active');
    currentWord.classList.add('leave');

    currentIndex = (currentIndex + 1) % words.length;
    const nextWord = words[currentIndex];
    nextWord.classList.remove('leave');
    nextWord.classList.add('active');

    setTimeout(() => {
      currentWord.classList.remove('leave');
    }, 500);
  }, 2000);
}



