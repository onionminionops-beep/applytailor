import { NextRequest, NextResponse } from "next/server";
import { fetchJobText } from "@/lib/extract";
import { tailorResume } from "@/lib/tailor";

export const runtime = "nodejs";

const MAX_RESUME_LENGTH = 25000;
const MIN_RESUME_LENGTH = 40;
const ALLOWED_DOMAINS = [
  "greenhouse.io",
  "lever.co",
  "ashbyhq.com",
  "workable.com",
  "applytojob.com",
  "myworkdayjobs.com",
  "icims.com",
  "bamboohr.com",
  "smartrecruiters.com",
  "taleo.net",
  "jobvite.com",
  "recruitee.com",
  "breezy.hr",
  "jobs.jobvite.com",
];

function isDomainAllowed(url: URL): boolean {
  const hostname = url.hostname.toLowerCase();
  return (
    ALLOWED_DOMAINS.some((domain) => hostname.includes(domain)) ||
    hostname === "localhost" ||
    hostname.startsWith("127.0.0.1")
  );
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    let body: { jobUrl?: string; resumeText?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const jobUrl = (body.jobUrl || "").trim();
    const resumeText = (body.resumeText || "").trim();

    if (!jobUrl || !resumeText) {
      return NextResponse.json(
        {
          error:
            "Both jobUrl and resumeText are required. Please provide a valid job posting URL and your resume text.",
        },
        { status: 400 }
      );
    }

    let parsed: URL;
    try {
      parsed = new URL(jobUrl);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("Protocol must be http or https");
      }
    } catch {
      return NextResponse.json(
        {
          error:
            "Invalid job URL. Please provide a valid http:// or https:// URL to a job posting.",
        },
        { status: 400 }
      );
    }

    if (!isDomainAllowed(parsed)) {
      console.warn("Job URL domain not in allowed list", {
        url: jobUrl,
        hostname: parsed.hostname,
      });
    }

    if (resumeText.length < MIN_RESUME_LENGTH) {
      return NextResponse.json(
        {
          error: `Resume text is too short. Please provide at least ${MIN_RESUME_LENGTH} characters of your resume content.`,
        },
        { status: 400 }
      );
    }

    if (resumeText.length > MAX_RESUME_LENGTH) {
      return NextResponse.json(
        {
          error: `Resume text is too long. Please limit your resume to ${MAX_RESUME_LENGTH} characters.`,
        },
        { status: 400 }
      );
    }

    let jobText: string;
    try {
      jobText = await fetchJobText(parsed.toString());
      console.info("Job page fetched successfully", {
        url: jobUrl,
        textLength: jobText.length,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch job page";
      console.warn("Job page fetch failed, using fallback", {
        url: jobUrl,
        error: message,
      });
      jobText = `Job URL: ${parsed.toString()}\n(Fetch note: ${message})\nPlease tailor generally for this posting.`;
    }

    const result = await tailorResume(jobText, resumeText);

    const elapsed = Date.now() - startTime;
    console.info("Tailor request completed", {
      mode: result.mode,
      bulletCount: result.bullets.length,
      elapsedMs: elapsed,
    });

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    const elapsed = Date.now() - startTime;

    console.error("Tailor request failed", {
      error: message,
      elapsedMs: elapsed,
    });

    return NextResponse.json(
      {
        error:
          "Unable to generate tailored resume at this time. Please try again in a moment.",
        details: message,
      },
      { status: 500 }
    );
  }
}
