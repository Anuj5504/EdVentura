import React from 'react';

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="h-[100%]">
      <div className="flex flex-col lg:flex-row justify-center items-center h-auto lg:h-[70vh] gap-10 lg:gap-36 px-5">
        {/* Left Section */}
        <div className="flex flex-col gap-6 text-center lg:text-left md:ml-16 ">
          <div className="Left w-full lg:w-[40vw] text-3xl md:text-6xl font-bold">
            Achieve your career goals with EdVentura.
          </div>
          <div className="Left w-full lg:w-[40vw] text-base md:text-lg">
            Everything you need in one course to become a beginner to expert-level mobile app developer.
          </div>
          <button className="bg-blue-500 border-none rounded-3xl p-3 text-white w-48 mx-auto lg:mx-0 hover:bg-blue-400">
            Explore Now
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[50vw] flex justify-center">
          <img src="images/image.png" className="h-[40vh] md:h-[50vh] object-contain" alt="EdVentura illustration" />
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="Line bg-gray-600 h-[1px] lg:w-[80vw] mx-auto mt-5"></div>
    </div>
  );
};

export default Hero;
