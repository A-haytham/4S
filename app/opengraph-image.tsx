import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
          color: "#020617",
          fontFamily: "Arial, sans-serif",
          padding: 72,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid #dbeafe",
            borderRadius: 36,
            background: "#ffffff",
            padding: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                width: 88,
                height: 88,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 24,
                background: "#0F4C81",
                color: "#ffffff",
                fontSize: 42,
                fontWeight: 800,
              }}
            >
              4S
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 44, fontWeight: 800 }}>4S Systems</div>
              <div style={{ color: "#0F4C81", fontSize: 26, fontWeight: 700 }}>
                ERP & Digital Solutions
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                maxWidth: 900,
                fontSize: 64,
                lineHeight: 1.05,
                fontWeight: 800,
              }}
            >
              ERP Solutions That Fit Your Business
            </div>
            <div style={{ maxWidth: 780, color: "#334155", fontSize: 30, lineHeight: 1.4 }}>
              Implementation, customization, and support with real-time visibility and control.
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
