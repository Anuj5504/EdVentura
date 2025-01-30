import Image from 'next/image';
import React, { useState } from 'react';
import { HiSearch, HiAcademicCap, HiUserGroup, HiClock } from 'react-icons/hi';

type Props = {};

const Hero = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const popularSearches = ['Web Development', 'Mobile Apps', 'UI/UX Design', 'Data Science'];

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center items-center pt-20 lg:pt-0 overflow-hidden">
      <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center gap-10 lg:gap-36 px-5 max-w-7xl mx-auto">
        
        {/* Left Section */}
        <div className="flex flex-col gap-8 text-center lg:text-left items-center lg:items-start p-8 lg:p-16">
          {/* Status Badge */}
          <div className="mb-4 flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
            <span className="animate-pulse text-green-500">●</span>
            <span className="text-gray-600 dark:text-gray-300">2000+ Students Learning Now</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
            Transform Your Future with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-500 text-transparent bg-clip-text">
              Smart Learning
            </span>
          </h1>

          {/* Search Section */}
          <div className="w-full max-w-2xl space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="What do you want to learn today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-gray-100 placeholder-gray-500 shadow-lg"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors">
                <HiSearch className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Section with Icons */}
          <div className="grid grid-cols-3 gap-8 mt-8 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                <HiAcademicCap className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">50+</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Expert Courses</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-violet-500/10 text-violet-500">
                <HiUserGroup className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">10k+</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Active Students</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-orange-500/10 text-orange-500">
                <HiClock className="w-6 h-6" />
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">24/7</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Support</span>
            </div>
          </div>
        </div>

       
      </div>

      {/* Horizontal Line */}
      <div className="max-w-7xl mx-auto px-5">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
