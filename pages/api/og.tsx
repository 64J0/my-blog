import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const SITE_NAME = "64J0's Blog";
const MAX_TITLE_LENGTH = 140;

export default function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? SITE_NAME).slice(0, MAX_TITLE_LENGTH);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "80px",
          backgroundColor: "#121212",
          color: "#e5e5e5",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 32,
            color: "#4da3ff",
          }}
        >
          {SITE_NAME}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
