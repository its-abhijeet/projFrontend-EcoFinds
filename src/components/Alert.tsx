import React from "react";

interface AlertProps {
  isOpen: boolean;
  title?: string;
  message: string;
  buttonLabel?: string;
  onClose: () => void;
  buttonColor?: string;
}

const Alert: React.FC<AlertProps> = ({
  isOpen,
  title = "Alert",
  message,
  buttonLabel = "OK",
  onClose,
}) => {
  if (!isOpen) return null;

  const buttonClasses = `px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-11/12 max-w-sm rounded-lg shadow-xl p-6 space-y-6 animate-fade-in">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        )}
        <p className="text-gray-700 leading-relaxed">{message}</p>
        <div className="flex justify-end pt-2">
          <button onClick={onClose} className={buttonClasses}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
