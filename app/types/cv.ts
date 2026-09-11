export interface CVExperienceRawEntry {
  company?: string;
  institution?: string;
  position?: string;
  area?: string;
  degree?: string;
  start_date: string;
  end_date: string;
  location?: string;
  summary?: string;
  highlights?: string[];
}

export interface CVFormattedEntry {
  title: string;
  subtitle: string;
  date: string;
  location?: string;
  highlights: string[];
  contentHTML: string;
}

export interface CVSectionGroup {
  id: string;
  title: string;
  entries: CVFormattedEntry[];
}

export interface CVData {
  cv: {
    name: string;
    headline: string;
    location?: string;
    email?: string;
    phone?: string;
    website?: string;
    sections: {
      summary?: string[];
      professional_experience?: CVExperienceRawEntry[];
      freelance_experience?: CVExperienceRawEntry[];
      internships_and_initiatives?: CVExperienceRawEntry[];
      education?: CVExperienceRawEntry[];
      core_competencies?: Array<{ label: string; details: string }>;
    };
  };
}
