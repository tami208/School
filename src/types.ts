export interface AcademicProgram {
  id: string;
  name: string;
  ageRange: string;
  overview: string;
  curriculum: string[];
  objectives: string[];
  extracurriculars: string[];
  developmentOpportunities: string[];
  imageUrl: string;
}

export interface NewsAnnouncement {
  id: string;
  title: string;
  category: 'Event' | 'Announcement' | 'Academic' | 'Admission';
  date: string;
  excerpt: string;
  content: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Parent' | 'Student' | 'Alumni';
  relationship: string;
  quote: string;
  avatarUrl: string;
}

export interface SchoolStat {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Sports' | 'Academic' | 'Arts' | 'Events';
  imageUrl: string;
  isVideo?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  bio: string;
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Academics' | 'General' | 'Student Life';
}

export interface FeeItem {
  program: string;
  tuition: string;
  developmentFee: string;
  materials: string;
  total: string;
  category?: 'Early Years' | 'Primary School' | 'Junior Secondary' | 'Senior Secondary';
  boardingFee?: string;
  boardingTotal?: string;
  tuitionNum?: number;
  devNum?: number;
  materialsNum?: number;
  boardingNum?: number;
}
