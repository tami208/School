import { 
  AcademicProgram, 
  NewsAnnouncement, 
  Testimonial, 
  SchoolStat, 
  GalleryItem, 
  StaffMember, 
  FAQItem,
  FeeItem
} from './types';

// Let's reference our generated high quality image assets as primary, and fallback or high-quality UNsplash for others
export const IMAGES = {
  hero: '/src/assets/images/school_hero_1782138857558.jpg',
  kindergarten: '/src/assets/images/kindergarten_learning_1782138874303.jpg',
  scienceLab: '/src/assets/images/science_lab_1782138889928.jpg',
  sportsClubs: '/src/assets/images/student_clubs_1782138906348.jpg',
};

export const SCHOOL_INFO = {
  name: 'Seed Academy',
  slogan: 'Nurturing Intellect, Refining Character, Leading Change',
  established: '2005',
  address: '12 Seed Academic Way, Royal Estate, Suite A, Lagos, Nigeria',
  emergencyPhone: '+234 (0) 803 111 2222',
  generalPhone: '08147180263',
  inquiryEmail: 'admissions@seed.edu.ng',
  adminEmail: 'info@seed.edu.ng',
  socials: {
    facebook: 'https://facebook.com/seedacademy',
    twitter: 'https://twitter.com/seed_academy',
    instagram: 'https://instagram.com/seedacademy',
    linkedin: 'https://linkedin.com/school/seed-academy'
  },
  mission: 'To provide a world-class, rigorous, and holistic educational experience that equips young learners with critical thinking, ethical grounding, and leadership skills to excel globally.',
  vision: 'To be the continent’s premier educational beacon, where intellectual curiosity and moral uprightness converge to raise the leaders of tomorrow.',
  values: [
    { title: 'Intellectual Excellence', description: 'Upholding rigorous and deep core academic standards.' },
    { title: 'Incredible Character', description: 'Cultivating honesty, empathy, dignity, and high integrity.' },
    { title: 'Disciplined Leadership', description: 'Taking responsibility for guiding peers and initiating social impact.' },
    { title: 'Global Outlook', description: 'Developing cultural awareness, bilingual foundations, and digital mastery.' }
  ],
  history: 'Founded in 2005, Seed Academy began as a visionary dream of leading educationists who wanted to revolutionize the local private schooling system. Over two decades, we expanded from initially running a single Kindergarten block to a massive, state-of-the-art campus spanning Nursery, Primary, Junior and Senior Secondary schools. With an unyielding commitment to combining international curriculum frameworks with native cultural standards, our graduates have successfully gained admissions to Ivy League, Russell Group, and prestigious domestic universities around the world.'
};

export const STATS: SchoolStat[] = [
  { id: 'stat-1', value: '98%', label: 'University Intake Rate', iconName: 'GraduationCap' },
  { id: 'stat-2', value: '1,200+', label: 'Active Students', iconName: 'Users' },
  { id: 'stat-3', value: '100%', label: 'Certified Teachers', iconName: 'Award' },
  { id: 'stat-4', value: '25+', label: 'Years of Excellence', iconName: 'Calendar' },
];

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: 'kindergarten',
    name: 'Kindergarten',
    ageRange: '2 – 4 Years',
    overview: 'Our Kindergarten program focuses on early socialization, sensory integration, and sensory-motor development in a safe, warm environment.',
    curriculum: [
      'Early Literacy & Phonics (Letter sounds & recognition)',
      'Basic Numeracy (Counting, shapes & patterns)',
      'Creative Expressions & Play (Dramatisation & painting)',
      'Sensory-Motor Exploration (Fine motor coordination & clay modeling)'
    ],
    objectives: [
      'Develop initial language abilities and confident communication.',
      'Refine motor skills through curated interactive learning and active play.',
      'Foster emotional resilience and teamwork amongst children.'
    ],
    extracurriculars: [
      'Toddlers’ Gardening & Mini Farmers Club',
      'Rhythmic Dance & Musical Movements Group',
      'Art Studio & Finger Painting'
    ],
    developmentOpportunities: [
      'Independent toilet training and eating guidelines.',
      'Active physical coordinate exercises in a secure indoor play area.'
    ],
    imageUrl: IMAGES.kindergarten
  },
  {
    id: 'nursery',
    name: 'Nursery',
    ageRange: '4 – 5 Years',
    overview: 'Nursery deepens sensory cognitive abilities, prepping children for systematic learning through playful exploration, numeracy, and active phonetic reading.',
    curriculum: [
      'Advanced Phonics (Word blends, visual reading prompts)',
      'Introductory Mathematics (Addition, subtraction models via objects)',
      'Scientific Understanding (My body, plants, weather elements)',
      'Bilingual Introduction (Basic French and local language greetings)'
    ],
    objectives: [
      'Read short words and construct coherent verbal paragraphs.',
      'Understand basic mathematical groups and logical reasoning.',
      'Show positive classroom etiquette and self-organization.'
    ],
    extracurriculars: [
      'Scribble-and-Sketch Creative Arts',
      'Kids Choir & Percussion Band',
      'Introductory Swimming & Gymnastics Safeguard'
    ],
    developmentOpportunities: [
      'Structured leadership-assigned classroom chores (e.g., book hand-outs).',
      'Biannual community puppet-show presentation hosting.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'primary',
    name: 'Primary School',
    ageRange: '6 – 11 Years (Levels Primary 1 to 6)',
    overview: 'Primary School builds a rigorous academic foundation with focus on stem education, comprehensive language arts, critical reasoning, and cultural studies.',
    curriculum: [
      'English Language Arts & Creative Essay Writing',
      'Mathematics (Fractions, decimals, geometries)',
      'General & Applied Science (Living organisms, light, matter, and forces)',
      'Information & Communication Technology (Coding logic & typing)'
    ],
    objectives: [
      'Develop fluid research skills and high-level arithmetic accuracy.',
      'Grasp fundamentals of logical coding, computer basics, and software tools.',
      'Cultivate high-level social justice, community values, and emotional maturity.'
    ],
    extracurriculars: [
      'Young Inventors STEM Club',
      'The Debate & Spelling Bee Union',
      'Inter-house Sports League (Athletics, Table Tennis, Swim team)'
    ],
    developmentOpportunities: [
      'Class Prefectship allocations and student representative councils.',
      'Annual science exhibition presentation hosting.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jss',
    name: 'Junior Secondary School (JSS1 – JSS3)',
    ageRange: '11 – 13 Years',
    overview: 'Preparing students for senior-level academic tracking by establishing rigorous research, analytical science, computing, and social studies paradigms.',
    curriculum: [
      'Basic Science, Technology & Chemistry Fundamentals',
      'Pre-Algebra, Advanced Geometry, and Data Records',
      'Business Studies, Financial Accounting Basics',
      'National Values, Citizenship Education and Civic Awareness'
    ],
    objectives: [
      'Qualify for the Junior Secondary School Certificate Examination (Basic Education Certificate Exam).',
      'Demonstrate deep structural analytical thinking in computing algorithms and design.',
      'Foster advanced personal hygiene, public speaking, and code-of-conduct compliance.'
    ],
    extracurriculars: [
      'Robotics and Artificial Intelligence Enthusiasts Club',
      'The Young Executives Young Farmers League',
      'Model United Nations (MUN) Junior Assembly'
    ],
    developmentOpportunities: [
      'Prefect Board and Community Volunteer Projects.',
      'Mandatory physical survival and camping field trip certificates.'
    ],
    imageUrl: IMAGES.scienceLab
  },
  {
    id: 'sss',
    name: 'Senior Secondary School (SS1 – SS3)',
    ageRange: '14 – 17 Years',
    overview: 'With scientific, commercial, and humanities specializations, our students prepare extensively to break state and global exam records (WAEC, NECO, SAT, IELTS, TOEFL).',
    curriculum: [
      'STEM/Sci: Physics, Chemistry, Biology, Further Mathematics, Technical Drawing',
      'Commercial: Financial Accounting, Commerce, Advanced economics, Government',
      'Humanities: Literature-in-English, History, Visual Arts, Music',
      'Core Compulsory: English Language, Mathematics, Civic Education'
    ],
    objectives: [
      'Attain premium A-grade parallel scores in West African Senior School Certificate Examinations (WASSCE).',
      'Acquire global college preparation, critical research essay skills, and SAT scores.',
      'Implement a highly structured social entrepreneurship enterprise project in communities.'
    ],
    extracurriculars: [
      'Press Club & Seed Editorial Magazine Board',
      'The Elite Coding Group & App Development Syndicate',
      'Varsity Athletics & Basketball Elite Squad'
    ],
    developmentOpportunities: [
      'Head Boy, Head Girl, and Games Captain high responsibilities.',
      'Direct peer tutoring tutoring assistants assignments.',
    ],
    imageUrl: IMAGES.sportsClubs
  }
];

export const LEADERSHIP: StaffMember[] = [
  {
    id: 'std-1',
    name: 'Dr. David',
    role: 'Founder & Proprietor',
    qualification: 'Ph.D. in Educational Administration (University of Ibadan), M.Ed (Harvard Graduate School of Education)',
    bio: 'An educator with 30+ years of experience, passionate about global-level curricula customized to breed impactful African change-makers.',
    imageUrl: 'https://imgur.com/1TNrErb.png'
  },
  {
    id: 'std-2',
    name: 'Mr. Bamidele',
    role: 'Head of Senior Secondary Academic Projects',
    qualification: 'M.Sc. in STEM Pedagogy (Stanford University)',
    bio: 'A former British International School dean focusing on practical physics methodologies, tech exploration, and Ivy League coaching.',
    imageUrl: 'https://imgur.com/2bX1uLL.png'
  },
  {
    id: 'std-3',
    name: 'Mr. Shege',
    role: 'Head of Early Years & Foundational Studies',
    qualification: 'B.Ed. Childhood Education (UNN), Montessori Diploma (MCI UK)',
    bio: 'Dedicated to dynamic phonics learning paradigms and child cognitive safety, aligning standard Montessori play principles.',
    imageUrl: 'https://imgur.com/EmGieGQ.png'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Engr. & Mrs. Adebayo Alao',
    role: 'Parent',
    relationship: 'Parents of Tolu (SS3) & Tobi (JSS1)',
    quote: 'Sending our children to Seed Academy remains the single best investment we have made. The high-powered STEM classes and focus on discipline transformed our son into a coding champion!',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-2',
    name: 'Amina Danjuma',
    role: 'Alumni',
    relationship: 'Class of 2023, currently studying Medicine at UCL',
    quote: 'The WAEC prep bootcamps at Seed and constant mock examinations did not just help me score straight As, they built my mental endurance for the heavy workload of college medical studies.',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-3',
    name: 'Chief Dr. Kenneth Ndukwe',
    role: 'Parent',
    relationship: 'Parent of Somto (Primary 5)',
    quote: 'The music program, swimming lessons and bilingual classes are fantastic. The teachers do not just teach; they take a deep personal interest in grooming every child’s individual strong suites.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
];

export const NEWS: NewsAnnouncement[] = [
  {
    id: 'news-1',
    title: 'Seed Robogroup Clinches First Place in National STEM Olympiad',
    category: 'Event',
    date: 'June 18, 2026',
    excerpt: 'Our Junior Secondary robotics squad beats 45 schools to win the national innovation trophy in automatic drone guidance algorithms.',
    content: 'On the 15th of June, the Seed Academy Robotics group displayed state-of-the-art programming skills by designing a fully autonomous drone capable of dodging physical obstacles and executing micro-deliveries. Coached by Mr. David Sterling, the boys and girls took home the gold cup, demonstrating our world-class hands-on science and technology edge.'
  },
  {
    id: 'news-2',
    title: 'Admissions Open for the 2026/2027 Academic Session',
    category: 'Admission',
    date: 'June 10, 2026',
    excerpt: 'Parents and prospective families are invited to secure enrollment slots. Intake spots for Kindergarten and JSS1 are filling fast.',
    content: 'We are pleased to announce that the admission cycle for the Autumn semester has officially opened. Inquiries for interactive classroom tours and online entry assessments can be filled directly inside our application portal. Entrance exams for senior divisions scheduled for middle July.'
  },
  {
    id: 'news-3',
    title: 'New Virtual Reality Science Suite Commissioned',
    category: 'Academic',
    date: 'May 28, 2025',
    excerpt: 'Investing in students’ core visualization abilities with a fully immersive library of biology, physics, and geology VR headsets.',
    content: 'In line with our constant technology upgrades, the Board of Governors commissioned 30 ultra-high-definition interactive VR workstations. Students can now travel inside human cells, dissect virtual molecular compounds, and inspect live planetary systems in 3D.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Admissions',
    question: 'How do we schedule a physical school tour and info session?',
    answer: 'You can submit the Online Admission Inquiry form on our Admissions tab, call our office desk, or use the quick floating WhatsApp chat. Our admissions registrar will coordinate an assessment walkthrough.'
  },
  {
    id: 'faq-2',
    category: 'Admissions',
    question: 'Is there a sibling discount available on fees?',
    answer: 'Yes! Seed Academy offers a 10% discount on the tuition fee component for the second child, and 15% for the third and subsequent children enrolled simultaneously.'
  },
  {
    id: 'faq-3',
    category: 'Academics',
    question: 'Which examination bodies do you prepare secondary students for?',
    answer: 'We prepare senior students for domestic examinations (WAEC, NECO) as well as global tracks including the Cambridge IGCSE, College Board SATs, IELTS, and TOEFL depending on custom choice.'
  },
  {
    id: 'faq-4',
    category: 'General',
    question: 'Are school bus ride systems and meal plans available?',
    answer: 'Yes, we operate secure, air-conditioned bus routes covering major zones. We also offer fully-supervised, hot gourmet lunches cooked organically inside our state-of-the-art, hygienic school cafeteria.'
  },
  {
    id: 'faq-5',
    category: 'Student Life',
    question: 'What sports options do students have at Seed?',
    answer: 'Our sports infrastructure includes a standard Olympic swimming pool, synthetic grass soccer field, basketball courts, and indoor arenas for table tennis, gymnastics, and dynamic martial arts programs.'
  }
];

export const TUITION_FEES: FeeItem[] = [
  // Early Years
  {
    program: 'Kindergarten (Ages 2–3)',
    category: 'Early Years',
    tuition: '₦ 350,000',
    developmentFee: '₦ 50,000',
    materials: '₦ 40,000',
    total: '₦ 440,000',
    boardingFee: 'Not Available',
    boardingTotal: 'N/A',
    tuitionNum: 350000,
    devNum: 50000,
    materialsNum: 40000,
    boardingNum: 0
  },
  {
    program: 'Pre-Nursery (Ages 3–4)',
    category: 'Early Years',
    tuition: '₦ 360,000',
    developmentFee: '₦ 50,000',
    materials: '₦ 40,000',
    total: '₦ 450,000',
    boardingFee: 'Not Available',
    boardingTotal: 'N/A',
    tuitionNum: 360000,
    devNum: 50000,
    materialsNum: 40000,
    boardingNum: 0
  },
  {
    program: 'Nursery 1 (Age 4)',
    category: 'Early Years',
    tuition: '₦ 380,000',
    developmentFee: '₦ 50,000',
    materials: '₦ 45,000',
    total: '₦ 475,000',
    boardingFee: 'Not Available',
    boardingTotal: 'N/A',
    tuitionNum: 380000,
    devNum: 50000,
    materialsNum: 45000,
    boardingNum: 0
  },
  {
    program: 'Nursery 2 (Age 5)',
    category: 'Early Years',
    tuition: '₦ 380,000',
    developmentFee: '₦ 50,000',
    materials: '₦ 45,000',
    total: '₦ 475,000',
    boardingFee: 'Not Available',
    boardingTotal: 'N/A',
    tuitionNum: 380000,
    devNum: 50000,
    materialsNum: 45000,
    boardingNum: 0
  },
  // Primary School
  {
    program: 'Primary 1 (Age 6)',
    category: 'Primary School',
    tuition: '₦ 440,000',
    developmentFee: '₦ 60,000',
    materials: '₦ 60,000',
    total: '₦ 560,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,010,000',
    tuitionNum: 440000,
    devNum: 60000,
    materialsNum: 60000,
    boardingNum: 450000
  },
  {
    program: 'Primary 2 (Age 7)',
    category: 'Primary School',
    tuition: '₦ 440,000',
    developmentFee: '₦ 60,000',
    materials: '₦ 60,000',
    total: '₦ 560,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,010,000',
    tuitionNum: 440000,
    devNum: 60000,
    materialsNum: 60000,
    boardingNum: 450000
  },
  {
    program: 'Primary 3 (Age 8)',
    category: 'Primary School',
    tuition: '₦ 440,000',
    developmentFee: '₦ 60,000',
    materials: '₦ 60,000',
    total: '₦ 560,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,010,000',
    tuitionNum: 440000,
    devNum: 60000,
    materialsNum: 60000,
    boardingNum: 450000
  },
  {
    program: 'Primary 4 (Age 9)',
    category: 'Primary School',
    tuition: '₦ 460,000',
    developmentFee: '₦ 60,000',
    materials: '₦ 70,000',
    total: '₦ 590,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,040,000',
    tuitionNum: 460000,
    devNum: 60000,
    materialsNum: 70000,
    boardingNum: 450000
  },
  {
    program: 'Primary 5 (Age 10)',
    category: 'Primary School',
    tuition: '₦ 460,000',
    developmentFee: '₦ 60,000',
    materials: '₦ 70,000',
    total: '₦ 590,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,040,000',
    tuitionNum: 460000,
    devNum: 60000,
    materialsNum: 70000,
    boardingNum: 450000
  },
  {
    program: 'Primary 6 (Age 11)',
    category: 'Primary School',
    tuition: '₦ 460,000',
    developmentFee: '₦ 60,000',
    materials: '₦ 70,000',
    total: '₦ 590,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,040,000',
    tuitionNum: 460000,
    devNum: 60000,
    materialsNum: 70000,
    boardingNum: 450000
  },
  // Junior Secondary School
  {
    program: 'JSS 1 (Junior Secondary 1)',
    category: 'Junior Secondary',
    tuition: '₦ 550,000',
    developmentFee: '₦ 80,000',
    materials: '₦ 90,000',
    total: '₦ 720,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,170,000',
    tuitionNum: 550000,
    devNum: 80000,
    materialsNum: 90000,
    boardingNum: 450000
  },
  {
    program: 'JSS 2 (Junior Secondary 2)',
    category: 'Junior Secondary',
    tuition: '₦ 550,000',
    developmentFee: '₦ 80,000',
    materials: '₦ 90,000',
    total: '₦ 720,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,170,000',
    tuitionNum: 550000,
    devNum: 80000,
    materialsNum: 90000,
    boardingNum: 450000
  },
  {
    program: 'JSS 3 (Junior Secondary 3)',
    category: 'Junior Secondary',
    tuition: '₦ 550,000',
    developmentFee: '₦ 80,000',
    materials: '₦ 90,000',
    total: '₦ 720,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,170,000',
    tuitionNum: 550000,
    devNum: 80000,
    materialsNum: 90000,
    boardingNum: 450000
  },
  // Senior Secondary School
  {
    program: 'SS 1 (Senior Secondary 1)',
    category: 'Senior Secondary',
    tuition: '₦ 650,000',
    developmentFee: '₦ 80,000',
    materials: '₦ 120,000',
    total: '₦ 850,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,300,000',
    tuitionNum: 650000,
    devNum: 80000,
    materialsNum: 120000,
    boardingNum: 450000
  },
  {
    program: 'SS 2 (Senior Secondary 2)',
    category: 'Senior Secondary',
    tuition: '₦ 650,000',
    developmentFee: '₦ 80,000',
    materials: '₦ 120,000',
    total: '₦ 850,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,300,000',
    tuitionNum: 650000,
    devNum: 80000,
    materialsNum: 120000,
    boardingNum: 450000
  },
  {
    program: 'SS 3 (Senior Secondary 3)',
    category: 'Senior Secondary',
    tuition: '₦ 680,000',
    developmentFee: '₦ 80,000',
    materials: '₦ 130,000',
    total: '₦ 890,000',
    boardingFee: '₦ 450,000',
    boardingTotal: '₦ 1,340,000',
    tuitionNum: 680000,
    devNum: 80000,
    materialsNum: 130000,
    boardingNum: 450000
  }
];

export const GALLERY_PHOTOS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Advanced Science Laboratory Physics Class',
    category: 'Academic',
    imageUrl: IMAGES.scienceLab
  },
  {
    id: 'gal-2',
    title: 'Interhouse Sports Relay Finalists Celebration',
    category: 'Sports',
    imageUrl: IMAGES.sportsClubs
  },
  {
    id: 'gal-3',
    title: 'Montessori Kindergarten Discovery Center',
    category: 'Campus',
    imageUrl: IMAGES.kindergarten
  },
  {
    id: 'gal-4',
    title: 'Primary Grade 4 Coding & Robotics Workspace',
    category: 'Academic',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-4ab90860b943?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-5',
    title: 'High School Debate and Mock Trial Court',
    category: 'Arts',
    imageUrl: 'https://images.unsplash.com/photo-1541829011-55822076d4ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-6',
    title: 'The Propheteress Dr. Adeniran Hosting Annual Speech Day',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80'
  }
];
