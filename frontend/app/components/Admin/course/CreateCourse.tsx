import React, { useState } from "react";
import CourseOptions from "./CourseOptions";

const CreateCourse = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-10">
      <CourseOptions currentStep={currentStep} />
      <div className="mt-6">
        <button
          onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 3))}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
