import fs from "node:fs/promises";
import path from "node:path";
import yaml from "yaml";
import MarkdownIt from "markdown-it";
import type {
  CVData,
  CVExperienceRawEntry,
  CVFormattedEntry,
  CVSectionGroup,
} from "../types/cv";

const md = new MarkdownIt({ html: true, linkify: true, breaks: false });

export function formatCVDate(dateStr?: string): string {
  if (!dateStr) return "";
  const trimmed = String(dateStr).trim();
  if (trimmed.toLowerCase() === "present") return "Present";

  const parts = trimmed.split("-");
  if (parts.length === 2) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${months[monthIndex]} ${year}`;
    }
  }
  return trimmed;
}

export function formatDateRange(start?: string, end?: string): string {
  const formattedStart = formatCVDate(start);
  const formattedEnd = formatCVDate(end);
  if (formattedStart && formattedEnd) return `${formattedStart} - ${formattedEnd}`;
  if (formattedStart) return formattedStart;
  if (formattedEnd) return formattedEnd;
  return "";
}

export function renderHighlightsHTML(highlights?: string[]): string {
  if (!highlights || highlights.length === 0) return "";
  const markdownText = highlights.map((h) => `- ${h}`).join("\n");
  return md.render(markdownText);
}

export async function getCVExperienceData(): Promise<CVSectionGroup[]> {
  const filePath = path.join(process.cwd(), "content", "cv.yaml");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const data = yaml.parse(fileContent) as CVData;
  const sections = data?.cv?.sections || {};

  const mapEntries = (
    entries: CVExperienceRawEntry[] = [],
    isEducation = false,
  ): CVFormattedEntry[] => {
    return entries.map((entry) => {
      const title = isEducation
        ? entry.degree && entry.area
          ? `${entry.degree} in ${entry.area}`
          : entry.area || entry.degree || entry.institution || ""
        : entry.position || entry.company || "";
      const subtitle = isEducation
        ? entry.institution || ""
        : entry.company || "";
      const date = formatDateRange(entry.start_date, entry.end_date);
      const contentHTML = renderHighlightsHTML(entry.highlights);

      return {
        title,
        subtitle,
        date,
        location: entry.location ?? undefined,
        highlights: entry.highlights || [],
        contentHTML,
        raw: entry,
      };
    });
  };

  const groups: CVSectionGroup[] = [
    {
      id: "professional",
      title: "Professional Experience",
      entries: mapEntries(
        (sections.professional_experience as CVExperienceRawEntry[]) ||
          (sections["experience"] as CVExperienceRawEntry[]) ||
          [],
      ),
    },
    {
      id: "freelance",
      title: "Freelance Experience",
      entries: mapEntries(
        (sections.freelance_experience as CVExperienceRawEntry[]) ||
          (sections["freelance"] as CVExperienceRawEntry[]) ||
          [],
      ),
    },
    {
      id: "internships",
      title: "Internships & Initiatives",
      entries: mapEntries(
        (sections.internships_and_initiatives as CVExperienceRawEntry[]) ||
          (sections["internships"] as CVExperienceRawEntry[]) ||
          [],
      ),
    },
    {
      id: "education",
      title: "Education",
      entries: mapEntries(
        (sections.education as CVExperienceRawEntry[]) || [],
        true,
      ),
    },
  ];

  return groups.filter((g) => g.entries.length > 0);
}
