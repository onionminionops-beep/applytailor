import { NextRequest, NextResponse } from "next/server";
import { fetchJobText } from "@/lib/extract";
import { tailorResume } from "@/lib/tailor";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      jobUrl?: string;
      resumeText?: string;
    };

    const jobUrl = (body.jobUrl || "").trim();
    const resumeText = (body.resumeText || "").trim();

    if (!jobUrl || !resumeText) {
      return NextResponse.json(
        { error: "jobUrl and resumeText are required" },
        { status: 400 }
      );
    }

    let parsed: URL;
    try {
      parsed = new URL(jobUrl);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("bad protocol");
      }
    } catch {
      return NextResponse.json(
        { error: "jobUrl must be a valid http(s) URL" },
        { status: 400 }
      );
    }

    if (resumeText.length < 40) {
      return NextResponse.json(
        { error: "resumeText is too short" },
        { status: 400 }
      );
    }

    let jobText: string;
    try {
      jobText = await fetchJobText(parsed.toString());
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch job page";
      jobText = `Job URL: ${parsed.toString()}\n(Fetch note: ${message})\nPlease tailor generally for this posting.`;
    }

    const result = await tailorResume(jobText, resumeText);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
