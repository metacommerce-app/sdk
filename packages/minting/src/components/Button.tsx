import React, { useState } from "react";
import { connect } from "@wagmi/core";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import DisplayIf from "@components/conditionals/DIsplayIf";
import { LoadingOutlined } from "@ant-design/icons";

interface ButtonProps {
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => Promise<void> | void;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "primary" | "secondary" | "default";
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, icon, className, loading = false, type = "default" }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async () => {
    setIsClicked(true);

    if (onClick) return onClick();
  };

  const getColor = () => {
    switch (type) {
      case "primary":
        return "bg-blue-500 hover:bg-blue-700 text-white";
      case "secondary":
        return "bg-gray-500 hover:bg-gray-700 text-white";
      case "default":
        return "border hover:border-blue-700 hover:text-blue-700 bg-white text-gray-700";
      default:
        return "border bg-white hover:bg-gray-200 text-gray-700";
    }
  };

  return (
    <button
      onClick={handleClick}
      onAnimationEnd={() => setIsClicked(false)}
      className={`px-4 py-2 ${getColor()} rounded-lg font-semibold shadow-md transition-colors duration-200 focus:outline-none ${
        isClicked ? "animate-wiggle" : ""
      } ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        <DisplayIf condition={() => loading}>
          <LoadingOutlined />
        </DisplayIf>
        <DisplayIf condition={() => Boolean(icon && !loading)}>{icon}</DisplayIf>
        {children}
      </div>
    </button>
  );
};

export default Button;
