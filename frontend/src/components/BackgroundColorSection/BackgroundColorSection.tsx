import { ReactNode } from "react";
import "./BackgroundColorSection.css";

const BackgroundColorSection = ({
  bgColor = "#fff",
  children,
}: {
  bgColor?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className="section"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundColorSection;
