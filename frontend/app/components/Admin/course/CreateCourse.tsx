import React, { useState } from "react";
import CourseOptions from "./CourseOptions";
import CourseInformations from "./CourseInformations";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";

const CreateCourse = () => {
  const [active, setActive] = useState(2);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setcourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const handleCourseSubmit= async()=>{

  }
  return (
    <div className="w-full flex flex-col lg:flex-row min-h-screen max-w-screen-xl mx-auto">

      <div className="w-full lg:w-[80%] p-4">
        {active === 0 &&
          <CourseInformations
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />}
        {active === 1 &&
          <CourseData
          benefits={benefits}
          setBenefits={setBenefits}
          prerequisites={prerequisites}
          setPrerequisits={setPrerequisites}
          active={active}
          setActive={setActive}
          />}
        {active === 2 &&
          <CourseContent
          courseContentData={courseContentData}
          setcourseContentData={setcourseContentData}
          active={active}
          setActive={setActive}
          handleSubmit={handleCourseSubmit}
          />}
      </div>

      <div className="w-full lg:w-[23%] lg:fixed top-[100px] right-4 p-4">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
