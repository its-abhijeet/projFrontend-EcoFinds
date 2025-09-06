import React from "react";
import { AlertCircle, CheckCircle2, XCircle, Info } from "lucide-react";

interface PopupProps {
  isOpen: boolean;
  title?: string;
  message: string;
  rightLabel?: string;
  leftLabel?: string;
  onright: () => void;
  onleft?: () => void;
  leftButtonColor?: "red" | "green" | "gray";
  rightButtonColor?: "red" | "green" | "gray";
  type?: "success" | "error" | "warning" | "info" | "confirm";
  showLeftButton?: boolean;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  title = "Action",
  message,
  rightLabel = "OK",
  leftLabel = "Cancel",
  onright,
  onleft,
  leftButtonColor = "gray",
  rightButtonColor = "green",
  type = "info",
  showLeftButton = true,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-8 h-8 text-green-500" />;
      case "error":
        return <XCircle className="w-8 h-8 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      default:
        return <Info className="w-8 h-8 text-blue-500" />;
    }
  };

  const getButtonClasses = (color: string) => {
    const baseClasses =
      "px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm";
    switch (color) {
      case "red":
        return `${baseClasses} bg-red-600 hover:bg-red-700 text-white focus:ring-red-500`;
      case "green":
        return `${baseClasses} bg-green-600 hover:bg-green-700 text-white focus:ring-green-500`;
      default:
        return `${baseClasses} bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500`;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onleft}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      aria-describedby="popup-message"
    >
      <div
        className="bg-white w-11/12 max-w-md rounded-xl shadow-2xl p-8 space-y-6 animate-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center gap-4">
          {getIcon()}
          {title && (
            <h3
              id="popup-title"
              className="text-xl font-semibold text-gray-900"
            >
              {title}
            </h3>
          )}
          <p id="popup-message" className="text-gray-600 leading-relaxed">
            {message}
          </p>
        </div>

        <div
          className={`flex justify-center gap-3 pt-2 ${
            !showLeftButton ? "mt-4" : ""
          }`}
        >
          {showLeftButton && (
            <button
              onClick={onleft}
              className={getButtonClasses(leftButtonColor)}
            >
              {leftLabel}
            </button>
          )}
          <button
            onClick={onright}
            className={getButtonClasses(rightButtonColor)}
            autoFocus
          >
            {rightLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
