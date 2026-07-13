export interface SubGradeDetail {
  id: string;
  name: string;
  ageRange: string;
  overview: string;
  curriculum: string[];
  objectives: string[];
}

export const PRIMARY_GRADES: SubGradeDetail[] = [
  {
    id: 'primary-1',
    name: 'Primary 1',
    ageRange: '6 Years',
    overview: 'Primary 1 serves as the crucial transition from early childhood blocks to structured academic standards. Students develop fluid literacy and double-digit number confidence.',
    curriculum: [
      'Interactive phonics reading, word blends, and sight vocabulary.',
      'Introduction to place value, mental addition, and simple subtraction sets.',
      'Physical science basics: Identifying living things, weather forms, and natural cycles.',
      'Beginning coding: Sequential instruction games, building early logical pathways.',
      'Civic norms: Showing respect for elders, community rules, and classmates.'
    ],
    objectives: [
      'Construct complete four-to-five-word sentences during writing tasks.',
      'Perform quick single and double-digit math calculations confidently.',
      'Develop strong neatness, pencil grip, and structured workbook habits.',
      'Exhibit polite interpersonal playground and classroom team etiquette.'
    ]
  },
  {
    id: 'primary-2',
    name: 'Primary 2',
    ageRange: '7 Years',
    overview: 'In Primary 2, we strengthen the foundation of reading comprehension, basic arithmetic formulas, and experimental science cycles.',
    curriculum: [
      'Comprehensive reading, storytelling paragraphs, and core spelling frameworks.',
      'Multiplication tables (1x to 5x), division layouts, and 3D shapes classification.',
      'Social and nature studies: Water cycles, plant growth, and animal adaptations.',
      'Computer systems structure: Inputs, outputs, keyboard mastery, and paint tool activities.',
      'Creative arts and local Nigerian craft weaving.'
    ],
    objectives: [
      'Understand and retell short stories with perfect grammatical comprehension.',
      'Solve multiple-step word problems involving simple additions and subtractions.',
      'Identify critical safety protocols for electrical boards and local environments.',
      'Participate in classroom team tasks and simple peer coordination roles.'
    ]
  },
  {
    id: 'primary-3',
    name: 'Primary 3',
    ageRange: '8 Years',
    overview: 'Primary 3 sparks curious self-learning, introducing advanced paragraph essays, fractions, and intermediate computational concepts.',
    curriculum: [
      'Parts of speech (pronouns, adverbs, conjunctions) and short letter writing.',
      'Introduction to fractions, multiplication tables (6x to 12x), and measurements (meters & grams).',
      'Applied science: Energy sources, light reflection, soil classifications, and crop seasons.',
      'Introductory algorithms: Direct block coding exercises on Scratch blocks.',
      'Civic awareness: National symbols, leadership definitions, and honest traits.'
    ],
    objectives: [
      'Draft a coherent three-paragraph formal or informal letter independently.',
      'Measure, add, and compare values involving metric weight and length values.',
      'Develop initial independent inquiry habits and research journal keeping.',
      'Practice cooperative play, leadership roles, and group problem solving.'
    ]
  },
  {
    id: 'primary-4',
    name: 'Primary 4',
    ageRange: '9 Years',
    overview: 'Primary 4 transitions students into advanced critical thinking, tackling complex science lab concepts and logical problem formulas.',
    curriculum: [
      'Expository essays, comprehension reviews, and advanced English vocabulary lists.',
      'Decimal calculations, long division, basic percentages, and geometric angle measures.',
      'Human body system structures (skeletal, digestive) and basic ecosystem cycles.',
      'Vocal and instrumental basics: Recorder playing, staff notation reading, and choral arts.',
      'Variables and conditional coding paths using block-based game building.'
    ],
    objectives: [
      'Express analytical critiques of stories and write formal compositions.',
      'Compute multiplication and divisions on triple-digit numbers with precision.',
      'Diagram essential human organ pathways and physical forces.',
      'Demonstrate mature conflict resolution skills during teamwork.'
    ]
  },
  {
    id: 'primary-5',
    name: 'Primary 5',
    ageRange: '10 Years',
    overview: 'Primary 5 is designed as the gateway for leadership preparations, focusing on pre-algebra, structured research, and civic accountability.',
    curriculum: [
      'Persuasive speaking debates, speech scripting, and complex grammar guidelines.',
      'Pre-algebra equations, multi-step ratio solutions, speed, volume, and area formulas.',
      'Physical sciences: Static electricity, simple machines, sound wave frequencies, and water safety.',
      'Web fundamentals: Early markup concepts (HTML / CSS grids) and online research protocols.',
      'Nigerian history: Traditional pre-colonial civilizations and cultural evolution.'
    ],
    objectives: [
      'Organize and present a logical 3-minute debate speech on current matters.',
      'Analyze, set up, and calculate speed, distance, and ratio problems.',
      'Outline basic working processes of simple machines inside modern homes.',
      'Perform responsible student helper duties, guiding junior primary classes.'
    ]
  },
  {
    id: 'primary-6',
    name: 'Primary 6',
    ageRange: '11 Years',
    overview: 'Primary 6 provides crucial preparatory learning targeting high-stakes entrance exams and secondary school readiness.',
    curriculum: [
      'Creative storytelling novels reading, and advanced comprehension structures.',
      'Comprehensive mathematics: Integers, percentages, simple interest, graphics, and averages.',
      'Environmental conservation, electrical circuit building, and human health modules.',
      'Applied IT tools: Spreadsheet tables, presentation slides, and intermediate logical coding.',
      'Leadership ethics: Personal budgets, goal settings, time discipline, and peer representation.'
    ],
    objectives: [
      'Succeed in junior high school cognitive entrance tests and screening trials.',
      'Resolve real-life banking math structures like simple interest and discounts.',
      'Assemble fully functional low-voltage series and parallel electric circuits.',
      'Direct primary school assemblies, clubs, and sports programs responsibly.'
    ]
  }
];

export const JUNIOR_SECONDARY_GRADES: SubGradeDetail[] = [
  {
    id: 'jss-1',
    name: 'JSS 1',
    ageRange: '11 - 12 Years',
    overview: 'Transitioning into secondary structures by deploying core laboratory science, multi-variable algebra, and business accounting disciplines.',
    curriculum: [
      'Basic science: Matter, living systems, security, and lab tools.',
      'Mathematics: Factors, indices, binary operations, and algebraic expressions.',
      'Business studies: Double-entry booking bookkeeping, cashbooks, and office rules.',
      'Social studies: Culture, socialization, relationships, and human rights.',
      'Information technology: OS systems, coding logic, and file management.'
    ],
    objectives: [
      'Establish a solid, organized study routine across advanced subjects.',
      'Solve multiple-variable equations and represent values logically.',
      'Manage school lockers, timetables, and classroom transitions independently.',
      'Exhibit impeccable character and respect for school policies.'
    ]
  },
  {
    id: 'jss-2',
    name: 'JSS 2',
    ageRange: '12 - 13 Years',
    overview: 'Consolidating secondary learning with intensive laboratory practicals, deep-dive business tracking, and structural digital coding.',
    curriculum: [
      'Basic science: Kinetic theory of gases, chemical reactions, and thermal energy.',
      'Mathematics: Pythogoras theorem, angles, linear equations, and volume.',
      'Business studies: Ledger systems, trail balances, trades, and markets.',
      'National values: Civic concepts, Nigerian constitution, and law enforcement.',
      'Database basics: Intro to spreadsheets, query concepts, and algorithmic coding.'
    ],
    objectives: [
      'Apply scientific principles to explain complex energetic transformations.',
      'Prove and employ geometric triangles and advanced trigonometric ratios.',
      'Draft complete balanced ledger accounts with professional ledger rules.',
      'Initiate small community-focused projects or volunteer assignments.'
    ]
  },
  {
    id: 'jss-3',
    name: 'JSS 3',
    ageRange: '13 - 14 Years',
    overview: 'Terminal junior secondary stage focused on exam bootcamps and successful achievement in the Basic Education Certificate Examination (BECE).',
    curriculum: [
      'Comprehensive science: Radioactivity, electrical systems, and chemical properties.',
      'Mathematics: Quadratic graphs, statistics, probability, and geometry scale drawings.',
      'Business studies: Petty cash, final accounts, business setup, and communication logs.',
      'Social sciences: Global relations, national conflicts, and conflict resolutions.',
      'Terminal exam preparation: 10-year BECE past questions bootcamps.'
    ],
    objectives: [
      'Clinch premium distinctions across all written BECE exam topics.',
      'Synthesize, research, and defend an independent tech/science project layout.',
      'Exhibit mature career guidance, and choose senior academic divisions confidently.',
      'Guide junior classes through active peer mentoring and team leadership.'
    ]
  }
];

export const SENIOR_SECONDARY_GRADES: SubGradeDetail[] = [
  {
    id: 'ss-1',
    name: 'SS 1',
    ageRange: '14 - 15 Years',
    overview: 'Academic specialization begins! Secondary scholars split into science, commercial, or humanities tracks while mastering core college entry curricula.',
    curriculum: [
      'Science track: Physics (kinematics), Chemistry (atoms), Biology (cells), Further Maths.',
      'Commercial track: Financial Accounting (double entry), Commerce, Economics, Government.',
      'Humanities track: Literature-in-English, Nigerian History, Government, Visual Arts.',
      'Core compulsory: English Language, Mathematics, Civic Education, Computer Science.'
    ],
    objectives: [
      'Adapt quickly to rigorous, high-density academic tracking requirements.',
      'Demonstrate deep research writing skills in specialized projects of choice.',
      'Acknowledge and respect peer diversity in academic and athletic tracks.',
      'Build long-term university goals and complete initial career assessments.'
    ]
  },
  {
    id: 'ss-2',
    name: 'SS 2',
    ageRange: '15 - 16 Years',
    overview: 'Deepening specialized fields, executing extensive laboratory experiments, and starting preparatory tracks for SAT, IELTS, and UTME exams.',
    curriculum: [
      'Science track: Heat/light energy, chemical thermodynamics, organ systems, coordinate geometry.',
      'Commercial track: Partnership accounts, company operations, international trades, banking theory.',
      'Humanities track: Creative poetry analysis, pre-colonial history, public administration, sculpting.',
      'Core compulsory: Advanced essay styles, statistics, digital web structures (JavaScript basics).'
    ],
    objectives: [
      'Conduct and document standard laboratory experiments with standard scientific notations.',
      'Excel in pre-WAEC and mock examination metrics with A-grade targets.',
      'Achieve high baseline scores in practice UTME/SAT/ACT diagnostic exams.',
      'Assume executive roles in academic clubs, sports events, and prefect boards.'
    ]
  },
  {
    id: 'ss-3',
    name: 'SS 3',
    ageRange: '16 - 17 Years',
    overview: 'The final year focus details extreme pre-WAEC bootcamp sessions, UTME revisions, elite research papers, and prestigious graduation transition models.',
    curriculum: [
      'All tracks: Extensive 15-year WAEC, NECO, and UTME past questions revision drills.',
      'Core revisions: Calculus, advanced statistics, syntax structures, structural essays.',
      'Mock exam bootcamps: Bi-weekly timed trial tests replicating major exam centers.',
      'Applied leadership tasks: Management of school assemblies, events, and graduation diaries.'
    ],
    objectives: [
      'Inscribe outstanding straight-A distinctions in WAEC, NECO, and UTME outcomes.',
      'Secure top-tier admissions and scholarships into prestigious local and global universities.',
      'Graduate with standard leadership, personal integrity, and global citizenship ready.',
      'Establish robust alumni networks to empower peers and future cohorts.'
    ]
  }
];
