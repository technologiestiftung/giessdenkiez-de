import React from "react";
import CloseIcon from "../components/icons/close-icon";
import { useErrorStore } from "./error-store";

interface ErrorToastProps {
  error: string;
}
const ErrorToast: React.FC<ErrorToastProps> = ({ error }) => {
  const clearErrors = useErrorStore().clearErrors;
  return (
    <div className="absolute bottom-5 left-0 right-0 z-[1000000] px-4 text-sm md:bottom-10 md:text-lg">
      <div className="relative flex w-full flex-row justify-center">
        <div className="bg-gdk-orange shadow-gdk-hard w-fit rounded-full px-8 py-4 text-gdk-white">
          <div className="flex flex-row items-center justify-between">
            <div>{error}</div>
            <button className="pl-8" onClick={clearErrors}>
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorToast;
