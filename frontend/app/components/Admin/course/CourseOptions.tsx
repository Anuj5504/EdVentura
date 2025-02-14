import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const steps = [
  "Course Information",
  "Course Options",
  "Course Content",
  "Course Preview",
];

const CourseOptions = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg w-64">
      {steps.map((step, index) => (
        <div key={index} className="relative flex items-center space-x-4">
          {/* Step Number / Check Icon */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold text-sm transition-all duration-300 ${
              index <= currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            {index < currentStep ? <FaCheckCircle size={16} /> : index + 1}
          </div>

          {/* Step Title */}
          <span
            className={`text-sm font-medium transition-all ${
              index <= currentStep ? "text-white" : "text-gray-400"
            }`}
          >
            {step}
          </span>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div className="absolute left-4 top-8 w-[2px] h-6 bg-gray-600"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
