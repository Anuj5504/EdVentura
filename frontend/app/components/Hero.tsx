import Image from 'next/image';
import React from 'react';

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row justify-center items-center h-auto lg:h-[70vh] gap-10 lg:gap-36 px-5">
        {/* Left Section */}
        <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start p-16">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Achieve Your <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">Dream Career</span> <br /> with <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">EdVentura</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Master mobile app development from beginner to expert, all in one place.
          </p>
          <button
            className="mt-4 bg-blue-600 text-white w-48 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-500 hover:shadow-blue-500/50 transition-all"
            onClick={(e) => e.preventDefault()}
          >
            Get Started 🚀
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[50vw] flex justify-center">
          <Image
            src={require("../../public/images/image.png")}
            alt="EdVentura illustration"
            width={500} 
            height={500}
            priority 
            loading="eager"
          />
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="Line bg-gray-600 h-[1px] lg:w-[80vw] mx-auto mt-5"></div>
      <div className="h-[100vh]"></div>
    </div>
  );
};

export default Hero;
