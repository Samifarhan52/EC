/**
 * THE EDU CONSULTANT - CORE CLIENT APPLICATION
 * High-performance, zero-bloat vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initCollegeFlipper();
  initCollegesAndProgramsDirectory();
  initConditionalFormFields();
  initModalControllers();
  initFormSubmissions();
  initMobileNavigation();
  initScrollHeader();
  initEnquiryPillButtons();
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
  }
];

let currentDirectoryMode = 'colleges'; // 'colleges' | 'programs'
let currentCategoryFilter = 'all';

function initCollegesAndProgramsDirectory() {
  const modeCollegesBtn = document.getElementById('modeCollegesBtn');
  const modeProgramsBtn = document.getElementById('modeProgramsBtn');
  const filterPills = document.querySelectorAll('.filter-tag');

  if (modeCollegesBtn && modeProgramsBtn) {
    modeCollegesBtn.addEventListener('click', () => {
      currentDirectoryMode = 'colleges';
      modeCollegesBtn.classList.add('active');
      modeProgramsBtn.classList.remove('active');
      renderDirectoryGrid();
    });

    modeProgramsBtn.addEventListener('click', () => {
      currentDirectoryMode = 'programs';
      modeProgramsBtn.classList.add('active');
      modeCollegesBtn.classList.remove('active');
      renderDirectoryGrid();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategoryFilter = pill.dataset.filter || 'all';
      renderDirectoryGrid();
    });
  });

  renderDirectoryGrid();
}

window.switchDirectoryMode = function(mode) {
  const modeCollegesBtn = document.getElementById('modeCollegesBtn');
  const modeProgramsBtn = document.getElementById('modeProgramsBtn');
  if (mode === 'programs') {
    currentDirectoryMode = 'programs';
    if (modeProgramsBtn) modeProgramsBtn.classList.add('active');
    if (modeCollegesBtn) modeCollegesBtn.classList.remove('active');
  } else {
    currentDirectoryMode = 'colleges';
    if (modeCollegesBtn) modeCollegesBtn.classList.add('active');
    if (modeProgramsBtn) modeProgramsBtn.classList.remove('active');
  }
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
            <button class="btn-card-apply" onclick="openRegisterModal('${col.name.replace(/'/g, "\\'")}')">
              <i class="fa-solid fa-file-pen"></i> Direct Apply
            </button>
            <button class="btn-card-fee" onclick="openFeeModal('${col.name.replace(/'/g, "\\'")}', '')">
              <i class="fa-solid fa-download"></i> Fee Matrix
            </button>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });
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
            <button class="btn-card-apply" onclick="openRegisterModal('', '${prog.name.replace(/'/g, "\\'")}')">
              <i class="fa-solid fa-file-signature"></i> Apply Quota
            </button>
            <button class="btn-card-fee" onclick="openFeeModal('', '${prog.name.replace(/'/g, "\\'")}')">
              <i class="fa-solid fa-download"></i> Fee Matrix
            </button>
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
  setupConditionalPair('formCourseSelect', 'conditionalCourseOther');
  setupConditionalPair('formCollegeSelect', 'conditionalCollegeOther');

  // Modal form pairs
  setupConditionalPair('modalCourseSelect', 'modalConditionalCourseOther');
  setupConditionalPair('modalCollegeSelect', 'modalConditionalCollegeOther');

  // Fee modal pairs
  setupConditionalPair('feeModalCourseSelect', 'feeConditionalCourseOther');
  setupConditionalPair('feeModalCollegeSelect', 'feeConditionalCollegeOther');

  // Standalone enquiry page pairs
  setupConditionalPair('enquiryCourseSelect', 'enquiryConditionalCourseOther');
  setupConditionalPair('enquiryCollegeSelect', 'enquiryConditionalCollegeOther');
}

function setupConditionalPair(selectId, conditionalWrapId) {
  const selectEl = document.getElementById(selectId);
  const wrapEl = document.getElementById(conditionalWrapId);
  if (!selectEl || !wrapEl) return;

  selectEl.addEventListener('change', () => {
    if (selectEl.value === 'Others') {
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
  });
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
  closeAllModals();
  const modal = document.getElementById('successModal');
  if (!modal) return;

  const titleEl = document.getElementById('successApplicantTitle');
  const msgEl = document.getElementById('successApplicantMsg');

  if (titleEl) {
    titleEl.textContent = `Thank You, ${applicantName}! Application Received.`;
  }

  if (msgEl) {
    if (actionType === 'fee') {
      msgEl.innerHTML = `Your Official Fee Structure & Prospectus breakdown is downloading.<br><strong>Our Senior Academic Counselor will contact you shortly</strong> to guide you through seat quota allocation and merit grants.`;
    } else {
      msgEl.innerHTML = `Your details have been successfully submitted.<br><strong>Our Senior Academic Counselor will contact you shortly</strong> to guide you through direct admission formalities.`;
    }
  }

  modal.classList.add('is-active');
};

/* ==========================================================================
   5. FORM SUBMISSION HANDLERS & PDF DOWNLOAD GENERATOR
   ========================================================================== */
function initFormSubmissions() {
  // On-page form
  const onPageForm = document.getElementById('mainAdmissionsForm');
  if (onPageForm) {
    onPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = onPageForm.querySelector('input[name="fullName"]')?.value || 'Student';
      window.openSuccessModal(name, 'registration');
      onPageForm.reset();
    });
  }

  // Modal register form
  const modalRegisterForm = document.getElementById('modalRegisterForm');
  if (modalRegisterForm) {
    modalRegisterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = modalRegisterForm.querySelector('input[name="fullName"]')?.value || 'Student';
      window.openSuccessModal(name, 'registration');
      modalRegisterForm.reset();
    });
  }

  // Download Fee Structure Form
  const downloadFeeForm = document.getElementById('downloadFeeForm');
  if (downloadFeeForm) {
    downloadFeeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = downloadFeeForm.querySelector('input[name="fullName"]')?.value || 'Applicant';
      const college = downloadFeeForm.querySelector('select[name="college"]')?.value || 'Premier Institution';
      const course = downloadFeeForm.querySelector('select[name="course"]')?.value || 'Academic Program';

      // Trigger automatic generated fee breakdown file download
      triggerFeeDocumentDownload(name, college, course);

      // Open Success popup with StudentEntrance.com recommendation
      window.openSuccessModal(name, 'fee');
      downloadFeeForm.reset();
    });
  }

  // Standalone enquiry page form
  const standaloneEnquiryForm = document.getElementById('standaloneEnquiryForm');
  if (standaloneEnquiryForm) {
    standaloneEnquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = standaloneEnquiryForm.querySelector('input[name="fullName"]')?.value || 'Student';
      const enquiryType = standaloneEnquiryForm.querySelector('input[name="enquiryType"]')?.value || 'admission-enquiry';
      if (enquiryType === 'fee-structure') {
        const college = standaloneEnquiryForm.querySelector('select[name="college"]')?.value || 'Premier Institution';
        const course = standaloneEnquiryForm.querySelector('select[name="course"]')?.value || 'Academic Program';
        triggerFeeDocumentDownload(name, college, course);
        window.openSuccessModal(name, 'fee');
      } else {
        window.openSuccessModal(name, 'registration');
      }
      standaloneEnquiryForm.reset();
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

Helpline: +91-9845371459 | Website: https://theeduconsultant.in/
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

  toggleBtn.addEventListener('click', () => {
    const isShown = navMenu.style.display === 'flex';
    navMenu.style.display = isShown ? 'none' : 'flex';
    if (!isShown) {
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.background = '#060d17';
      navMenu.style.padding = '1.5rem';
      navMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
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
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
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
        }
      });
    }

    const courseParam = urlParams.get('course') || urlParams.get('stream');
    if (courseParam) {
      document.querySelectorAll('select[name="course"]').forEach(sel => {
        const match = Array.from(sel.options).find(o => o.value.toLowerCase().includes(courseParam.toLowerCase()));
        if (match) {
          sel.value = match.value;
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

window.handleHeroQuickSearch = function(e) {
  if (e) e.preventDefault();
  const disc = document.getElementById('searchDiscipline')?.value || 'all';
  const college = document.getElementById('searchCollege')?.value || 'all';
  
  // Update directory category filter pill
  const filterPills = document.querySelectorAll('.filter-tag');
  filterPills.forEach(p => {
    if (p.dataset.filter === disc) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  currentCategoryFilter = disc;
  currentDirectoryMode = 'colleges';
  const modeCollegesBtn = document.getElementById('modeCollegesBtn');
  const modeProgramsBtn = document.getElementById('modeProgramsBtn');
  if (modeCollegesBtn) modeCollegesBtn.classList.add('active');
  if (modeProgramsBtn) modeProgramsBtn.classList.remove('active');
  
  if (typeof renderDirectoryGrid === 'function') {
    renderDirectoryGrid();
  }

  const dirEl = document.getElementById('directorySection');
  if (dirEl) {
    dirEl.scrollIntoView({ behavior: 'smooth' });
  }

  // If a specific college was chosen, highlight its card
  if (college !== 'all') {
    setTimeout(() => {
      const cards = document.querySelectorAll('.directory-card');
      const searchTerms = college.toLowerCase().split(' ');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const matches = searchTerms.some(term => term.length > 2 && text.includes(term));
        if (matches) {
          card.style.outline = '3px solid #f59e0b';
          card.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.45)';
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            card.style.transition = 'all 1s ease';
            card.style.outline = 'none';
          }, 3500);
        }
      });
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



