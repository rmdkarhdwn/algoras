import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Algoras — Interactive Algorithm Learning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0B0B",
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#D4AF37",
          }}
        >
          ALGORAS
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#A0A0A0",
            letterSpacing: "0.04em",
          }}
        >
          Interactive Algorithm &amp; Data Structure Learning
        </div>
      </div>
    ),
    { ...size },
  );
}
