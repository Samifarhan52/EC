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
  initHeroWordFlip();
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

  // Hero search bar conditional pairs
  setupConditionalPair('searchProgramLevel', 'heroConditionalProgramLevelOther');
  setupConditionalPair('searchDiscipline', 'heroConditionalDisciplineOther');
  setupConditionalPair('searchCollege', 'heroConditionalCollegeOther');
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
  // Backwards compatibility proxy
  window.openEnhancedSuccessModal({
    fullName: applicantName,
    refId: 'TEC-' + Math.floor(100000 + Math.random() * 900000),
    course: 'Academic Program',
    college: 'Premier Institution',
    formType: actionType,
    waUrl1: 'https://wa.me/919845371459',
    waUrl2: 'https://wa.me/918884058214'
  });
};

window.openEnhancedSuccessModal = function(data) {
  closeAllModals();
  const modal = document.getElementById('successModal');
  if (!modal) return;

  const titleEl = document.getElementById('successApplicantTitle');
  const msgEl = document.getElementById('successApplicantMsg');

  if (titleEl) {
    titleEl.textContent = `Thank You, ${data.fullName}! Enquiry Received.`;
  }

  if (msgEl) {
    msgEl.innerHTML = `
      <div style="text-align: left; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; margin: 1.25rem 0;">
        <div style="display: flex; align-items: center; gap: 8px; color: #15803d; font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-circle-check" style="font-size: 1.1rem;"></i>
          <span>Enquiry Successfully Registered (Ref: ${data.refId})</span>
        </div>
        <p style="font-size: 0.88rem; color: #475569; margin-bottom: 0.75rem; line-height: 1.5;">
          Your admission enquiry for <strong>${data.course || 'Admissions 2027'}</strong> at <strong>${data.college || 'Bangalore Premier Colleges'}</strong> has been locked in our priority counseling desk.
        </p>

        <!-- Email & Call Status -->
        <div style="background: #ffffff; border-left: 3px solid #2563eb; padding: 10px 12px; border-radius: 6px; font-size: 0.82rem; color: #334155; margin-bottom: 1rem;">
          <i class="fa-solid fa-envelope" style="color: #2563eb; margin-right: 5px;"></i>
          <strong>Email Confirmation &amp; Alert:</strong> Notification dispatched to student and senior counselors. You will receive a callback shortly.
        </div>

        <!-- Dual WhatsApp Routing Box -->
        <div style="border-top: 1px dashed #cbd5e1; padding-top: 0.85rem;">
          <div style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 0.5rem;">
            Official Counselor WhatsApp Desks:
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <a href="${data.waUrl1}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: space-between; background: #22c55e; color: #ffffff; padding: 9px 14px; border-radius: 8px; font-weight: 700; font-size: 0.84rem; text-decoration: none; box-shadow: 0 2px 6px rgba(34, 197, 94, 0.25);">
              <span style="display: inline-flex; align-items: center; gap: 8px;">
                <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i>
                <span>Counselor 1 (Desk A): +91 98453 71459</span>
              </span>
              <span style="font-size: 0.72rem; background: rgba(0,0,0,0.15); padding: 3px 8px; border-radius: 4px;">Sent / Open</span>
            </a>

            <a href="${data.waUrl2}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: space-between; background: #15803d; color: #ffffff; padding: 9px 14px; border-radius: 8px; font-weight: 700; font-size: 0.84rem; text-decoration: none; box-shadow: 0 2px 6px rgba(21, 128, 61, 0.25);">
              <span style="display: inline-flex; align-items: center; gap: 8px;">
                <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i>
                <span>Counselor 2 (Desk B): +91 88840 58214</span>
              </span>
              <span style="font-size: 0.72rem; background: #fbbf24; color: #0f172a; font-weight: 800; padding: 3px 8px; border-radius: 4px;">Send Also &rarr;</span>
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
 * 3. Formats message and triggers dual WhatsApp (919845371459 & 918884058214)
 */
window.handleAdmissionFormSubmit = function(formElement, formType = 'registration') {
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
  const programLevel = (course && (course.includes('M.') || course.includes('MBA') || course.includes('MCA') || course.includes('MS'))) ? 'PG' : 'UG';

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

  // 2B. Also forward to /api/submit-enquiry
  try {
    fetch('/api/submit-enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...leadRecord, googleScriptUrl })
    }).catch(e => console.warn('API background submit:', e));
  } catch (e) {}

  // 3. Formulate structured WhatsApp text for both Counselors
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
  const waUrl2 = `https://wa.me/918884058214?text=${waEncoded}`;

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

  // Open the enhanced success modal with dual-WhatsApp dispatch buttons & email confirmation note
  window.openEnhancedSuccessModal({
    fullName,
    phone,
    email,
    college,
    course,
    refId,
    formType,
    waUrl1,
    waUrl2
  });

  formElement.reset();
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
  ]
};

window.handleProgramLevelChange = function(level) {
  const disciplineSelect = document.getElementById('searchDiscipline');
  if (!disciplineSelect) return;

  const data = PROGRAM_STREAM_DATA[level] || PROGRAM_STREAM_DATA.all;
  disciplineSelect.innerHTML = '';
  data.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.value;
    opt.textContent = item.label;
    disciplineSelect.appendChild(opt);
  });

  // Reset conditional course input if stream is reset away from Others
  const discWrap = document.getElementById('heroConditionalDisciplineOther');
  if (discWrap && disciplineSelect.value !== 'Others') {
    discWrap.classList.remove('is-visible');
    const input = discWrap.querySelector('input');
    if (input) {
      input.required = false;
      input.value = '';
    }
  }
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

  const customProg = (progLevel === 'Others' && otherProgInput) ? otherProgInput.value.trim() : '';
  const customDisc = (disc === 'Others' && otherDiscInput) ? otherDiscInput.value.trim() : '';
  const customCollege = (college === 'Others' && otherCollegeInput) ? otherCollegeInput.value.trim() : '';

  const effectiveCollege = customCollege || (college !== 'Others' && college !== 'all' ? college : '');
  const effectiveDisc = customDisc || (disc !== 'Others' && disc !== 'all' && disc !== 'all-ug' && disc !== 'all-pg' ? disc : '');
  const effectiveProg = customProg || (progLevel !== 'Others' && progLevel !== 'all' ? progLevel : '');

  // If a specific college was chosen or custom typed in Others
  if (effectiveCollege) {
    currentDirectoryMode = 'colleges';
    currentCategoryFilter = 'all';
    const modeCollegesBtn = document.getElementById('modeCollegesBtn');
    const modeProgramsBtn = document.getElementById('modeProgramsBtn');
    if (modeCollegesBtn) modeCollegesBtn.classList.add('active');
    if (modeProgramsBtn) modeProgramsBtn.classList.remove('active');

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
  currentDirectoryMode = 'programs';
  const modeCollegesBtn = document.getElementById('modeCollegesBtn');
  const modeProgramsBtn = document.getElementById('modeProgramsBtn');
  if (modeProgramsBtn) modeProgramsBtn.classList.add('active');
  if (modeCollegesBtn) modeCollegesBtn.classList.remove('active');

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



