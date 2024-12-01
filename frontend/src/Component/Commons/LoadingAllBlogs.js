import React, { useState, useEffect } from "react";
import "./loading.css"; // Add your CSS styles here
import {motion} from 'framer-motion'
import { FaArrowRight, FaCalendar, FaUser } from "react-icons/fa";

const LoadingAllBlogs = () => {
  return (
    <div className="product-container flex flex-col gap-4 justify-center items-center align-center mx-auto my-10">
      { Array(3)
            .fill(0)
            .map((_, index) => (
              <motion.div 
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{duration:1}}
              // ref={(el)=>sectionsRef.current[1+index]=el}
              style={{border:"1px solid rgba(255,255,255,0.1)"}}
              className="w-[100%] md:w-[auto] blogs bg-black rounded-lg shadow-md overflow-hidden flex flex-col text-left md:flex-row transition-transform duration-300 hover:shadow-xl"
            >
              <div className="min-w-[80%] md:min-w-[250px] md:max-w-[250px] min-h-[200px] max-h-[300px] relative">
                <img
                  className="w-full h-64 md:h-full object-cover bg-gray-400"
                />
              </div>
              
              <div className="min-w-[200px] md:min-w-[500px] md:max-w-[500px] p-6 md:p-8 ">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <div className="flex items-center mr-6">
                    <FaUser className="mr-2" />
                    <p className="w-[60px] h-[10px] bg-gray-300"></p>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2" />
                    <p className="w-[60px] h-[10px] bg-gray-300"></p>
                  </div>
                </div>
                
                <h2 className="text-2xl pt-7 mt-5 font-bold text-white mb-4 w-[80%] md:w-[300px] bg-gray-300"></h2>
                
                <p className="text-gray-400 mb-6 w-[80%] md:w-[300px] h-[10px] bg-gray-300"></p>
                
                <button className="inline-flex items-center w-[40px] h-[10px] bg-gray-300 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  
                  {/* <FaArrowRight className="ml-2" /> */}
                </button>
              </div>
            </motion.div>
            ))
     }
    </div>
  );
};

export default LoadingAllBlogs;
