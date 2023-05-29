import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip?: string;
  className?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, tooltip }) => {
  return (
    <button
      onClick={onClick}
      className="p-1 border rounded-full text-center flex items-center justify-center bg-white hover:border-blue-500 hover:text-blue-500 transition-all"
    >
      {icon}
    </button>
  );
};

export default IconButton;
