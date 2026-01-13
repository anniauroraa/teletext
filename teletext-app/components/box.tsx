import { ReactNode } from "react";
import "@/styles/layout.css";

type BoxProps = {
  children: ReactNode;
  className?: string;
  gap?: number;       // optional, inline override
  direction?: "row" | "column";
  justify?: "center" | "flex-start" | "space-between";
};

const Box = ({
  children,
  className = "",
  gap,
  direction,
  justify,
}: BoxProps) => {
  return (
    <div
      className={`box ${className}`}
      style={{
        flexDirection: direction,
        justifyContent: justify,
        gap: gap,
      }}
    >
      {children}
    </div>
  );
};

export default Box;
