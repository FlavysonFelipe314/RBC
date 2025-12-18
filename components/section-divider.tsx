"use client";

interface SectionDividerProps {
  type?: "wave" | "diagonal" | "curve";
  flip?: boolean;
  color?: string;
}

export default function SectionDivider({ 
  type = "wave", 
  flip = false,
  color = "#f9fafb" 
}: SectionDividerProps) {
  const transform = flip ? "rotate(180deg)" : "none";

  if (type === "wave") {
    return (
      <div className="wave-divider" style={{ transform, height: "100px" }}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: "100%", width: "100%" }}
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }

  if (type === "diagonal") {
    return (
      <div className="wave-divider" style={{ transform, height: "80px" }}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: "100%", width: "100%" }}
        >
          <path
            d="M0,0 L1200,60 L1200,120 L0,120 Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }

  // curve
  return (
    <div className="wave-divider" style={{ transform, height: "80px" }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ height: "100%", width: "100%" }}
      >
        <path
          d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
