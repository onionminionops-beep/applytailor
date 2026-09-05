export type TailorResult = {
  mode: "openai" | "demo";
  bullets: string[];
  coverNote: string;
  jobSummary: string;
};

function demoResult(jobText: string, resumeText: string): TailorResult {
  const firstLine =
    jobText.split("\n").find((l) => l.trim().length > 20)?.trim().slice(0, 120) ||
    "the target role";
  const resumeHint =
    resumeText.split("\n").find((l) => l.trim().length > 15)?.trim().slice(0, 80) ||
    "your background";

  return {
    mode: "demo",
    jobSummary: `DEMO summary based on fetched posting (starts with: "${firstLine}…")`,
    bullets: [
      `Aligned delivery with role needs around ${firstLine.toLowerCase().slice(0, 60)}…, translating requirements into measurable outcomes.`,
      `Leveraged ${resumeHint} to ship cross-functional work that maps directly to the posting's stated priorities.`,
      "Owned end-to-end execution: scoped work, partnered with stakeholders, and shipped on a clear timeline.",
      "Quantified impact with metrics (conversion, latency, retention, or revenue) tailored to the job's success criteria.",
      "Communicated tradeoffs clearly and iterated from feedback—ready to contribute from week one.",
    ],
    coverNote:
      "I'm excited about this role and have tailored my experience to the posting's priorities. I'd welcome a chance to share how I can contribute quickly and measurably. (DEMO — set OPENAI_API_KEY for live generation.)",
  };
}

export async function tailorResume(
  jobText: string,
  resumeText: string
): Promise<TailorResult> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return demoResult(jobText, resumeText);
  }

  try {
    const OpenAI = (await import("openai")).default;
    const client = new OpenAI({ apiKey });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You tailor resumes for a single job application. Return JSON with keys: jobSummary (1-2 sentences), bullets (array of 5 strong resume bullets rewritten for this job), coverNote (2-4 sentences). No markdown. Be specific and truthful to the resume; do not invent employers.",
        },
        {
          role: "user",
          content: `JOB POSTING TEXT:\n${jobText.slice(0, 8000)}\n\nRESUME TEXT:\n${resumeText.slice(0, 8000)}`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(raw) as {
      jobSummary?: string;
      bullets?: string[];
      coverNote?: string;
    };

    const bullets = Array.isArray(parsed.bullets)
      ? parsed.bullets.map(String).filter(Boolean).slice(0, 8)
      : [];

    if (bullets.length < 3 || !parsed.coverNote) {
      return demoResult(jobText, resumeText);
    }

    return {
      mode: "openai",
      jobSummary: String(parsed.jobSummary || "Role matched to your resume."),
      bullets,
      coverNote: String(parsed.coverNote),
    };
  } catch {
    const fallback = demoResult(jobText, resumeText);
    return {
      ...fallback,
      jobSummary: `${fallback.jobSummary} (OpenAI unavailable — DEMO fallback)`,
    };
  }
}
