import { promises as fs } from "fs";
import path from "path";
import yaml from "yaml";
import MarkdownIt from "markdown-it";
import {
  CVData,
  CVExperienceRawEntry,
  CVFormattedEntry,
  CVSectionGroup,
} from "../types/cv";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const monthNames: Record<string, string> = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "Aug",
  "09": "Sept",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

export function formatSingleDate(dateStr: string): string {
  if (!dateStr) return "";
  const trimmed = String(dateStr).trim();
  if (trimmed.toLowerCase() === "present") return "Present";

  const match = trimmed.match(/^(\d{4})-(\d{2})$/);
  if (match) {
    const [, year, month] = match;
    const monthName = monthNames[month] || month;
    return `${monthName} ${year}`;
  }

  return trimmed;
}

export function formatCVDateRange(start: string, end: string): string {
  const formattedStart = formatSingleDate(start);
  const formattedEnd = formatSingleDate(end);
  if (!formattedStart && !formattedEnd) return "";
  if (!formattedEnd) return formattedStart;
  if (!formattedStart) return formattedEnd;
  return `${formattedStart} – ${formattedEnd}`;
}

export function renderHighlightsToHTML(highlights: string[]): string {
  if (!highlights || highlights.length === 0) return "";
  const markdown = highlights.map((h) => `- ${h}`).join("\n");
  return md.render(markdown);
}

export function mapRawEntryToFormatted(
  entry: CVExperienceRawEntry,
): CVFormattedEntry {
  let title = "";
  if (entry.position) {
    title = entry.position;
  } else if (entry.degree && entry.area) {
    title = `${entry.degree} in ${entry.area}`;
  } else if (entry.degree) {
    title = entry.degree;
  } else if (entry.area) {
    title = entry.area;
  } else {
    title = entry.company || entry.institution || "";
  }

  const subtitle = entry.company || entry.institution || "";
  const date = formatCVDateRange(entry.start_date, entry.end_date);
  const highlights = entry.highlights || [];
  const contentHTML = renderHighlightsToHTML(highlights);

  return {
    title,
    subtitle,
    date,
    location: entry.location ?? undefined,
    highlights,
    contentHTML,
  };
}

export async function getCVExperienceData(): Promise<CVSectionGroup[]> {
  try {
    const filePath = path.join(process.cwd(), "content/cv.yaml");
    const rawContent = await fs.readFile(filePath, "utf8");
    const parsed = yaml.parse(rawContent) as CVData;
    const sections = parsed?.cv?.sections;

    if (!sections) return [];

    const groups: CVSectionGroup[] = [
      {
        id: "professional",
        title: "Professional Experience",
        entries: (sections.professional_experience || []).map(
          mapRawEntryToFormatted,
        ),
      },
      {
        id: "freelance",
        title: "Freelance Experience",
        entries: (sections.freelance_experience || []).map(
          mapRawEntryToFormatted,
        ),
      },
      {
        id: "internships",
        title: "Internships & Initiatives",
        entries: (sections.internships_and_initiatives || []).map(
          mapRawEntryToFormatted,
        ),
      },
      {
        id: "education",
        title: "Education",
        entries: (sections.education || []).map(mapRawEntryToFormatted),
      },
    ];

    return groups.filter((g) => g.entries.length > 0);
  } catch (error) {
    console.error("Error loading CV experience data:", error);
    return [];
  }
}
