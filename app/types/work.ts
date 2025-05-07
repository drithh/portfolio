export interface Work {
  title: string;
  company: string;
  date: string;
  icon: "code" | "graduation";
  type: "work" | "education";
  body: {
    code: string;
  };
  slug: string;
}

export type Works = Work[];
