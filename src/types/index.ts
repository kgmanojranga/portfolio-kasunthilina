export interface ContactInfo {
  fullName?: string;
  email: string;
  mobile: string;
  whatsapp?: string;
  address?: string;
  birthday?: string;
  linkedin: string;
  location?: string;
  openToRelocate?: string;
}

export interface WorkExperience {
  id: string;
  projectName: string;
  role: string;
  period: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EmploymentRecord {
  period: string;
  role: string;
  company: string;
  location: string;
  note?: string;
}

export interface TechnologyCategory {
  category: string;
  items: string[];
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  faculty: string;
  period: string;
  status?: string;
}

export interface Certification {
  title: string;
  issuedDate: string;
  licenseNo?: string;
  verifyUrl?: string;
  issuer: string;
}

export interface AcademicProject {
  title: string;
  program: string;
  description: string;
}

export interface ExtracurricularActivity {
  title: string;
  details: string[];
}

export interface Reference {
  name: string;
  title: string;
  phone: string;
  email: string;
}

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  summaryPoints?: string[];
  yearsOfExperience: string;
  contact: ContactInfo;
  workExperiences: WorkExperience[];
  employmentHistory: EmploymentRecord[];
  technologies: TechnologyCategory[];
  education: Education[];
  certifications: Certification[];
  academicProjects: AcademicProject[];
  extracurricular: ExtracurricularActivity[];
  references: Reference[];
}
