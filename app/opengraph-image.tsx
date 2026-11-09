import { ImageResponse } from "next/og";
import { FULL_NAME, JOB_TITLE } from "@/lib/config";

export const alt = `${FULL_NAME}, ${JOB_TITLE}, Buea, Cameroon`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0c1222 0%, #0f2a43 100%)",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#38bdf8",
          }}
        >
          {JOB_TITLE} · Buea, Cameroon
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {FULL_NAME}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 30,
            color: "#a1a1aa",
          }}
        >
          Next.js · TypeScript · React · Flutter · Supabase · Firebase · AI
        </div>
      </div>
    ),
    { ...size },
  );
}
