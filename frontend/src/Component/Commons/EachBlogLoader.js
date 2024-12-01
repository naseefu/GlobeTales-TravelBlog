import React, { useState, useEffect } from "react";
import "./loading.css"; // Add your CSS styles here
import {motion} from 'framer-motion'
import { FaArrowRight, FaCalendar, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPinterest, FaRegCalendarAlt, FaRegClock, FaRegCommentDots, FaTwitter, FaUser } from "react-icons/fa";

const EachBlogLoader = () => {
  return (
    <div className="product-container1 flex flex-col justify-center items-center align-center mx-auto">
      { Array(1)
            .fill(0)
            .map((_, index) => (
              <div>
      <div className="heroblog relative h-[70vh] min-w-full overflow-hidden">
        
        <div
          className="imager w-full h-full object-cover bg-gray-400 w-full min-w-[100vw]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-[100px] bg-gray-400 w-[80%] mx-[auto] h-[100px]"
          >
            
          </h1>
          <div className="blogdata flex items-center space-x-4 text-gray-200">
            <span className="bg-gray-400 w-[60px] h-[10px]"></span>
            <span className="bg-gray-400 w-[10px] rounded-xl h-[10px]"></span>
            <span className="bg-gray-400 w-[60px] h-[10px]"></span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose lg:prose-xl">
          <div className="blogcontent flex flex-col gap-2">
          <p className="text-gray-300 text-left text-lg leading-relaxed bg-gray-400 w-[100%] h-[15px]"></p>
          <p className="text-gray-300 text-left text-lg leading-relaxed bg-gray-400 w-[100%] h-[15px]"></p>
          <p className="text-gray-300 text-left text-lg leading-relaxed bg-gray-400 w-[100%] h-[15px]"></p></div>
          

          {/* Highlights Section */}
          <div className="blogdatamap grid md:grid-cols-3 gap-8 my-12">
              <motion.div
                className="blogh bg-black p-6 rounded-lg shadow-lg" style={{border:'1px solid rgba(255,255,255,0.1)'}}
              >
                <div className="blogicon text-emerald-600 text-2xl mb-4"><FaRegCalendarAlt /></div>
                  <h3 className="text-gray-600 w-[50%] mx-[auto] pt-3 mt-5 h-[10px] bg-gray-400"></h3>
                  <p className="text-gray-600 w-[100%] pt-3 mt-5 h-[10px] bg-gray-400"></p>
              </motion.div>

              <motion.div
                className="blogh bg-black p-6 rounded-lg shadow-lg" style={{border:'1px solid rgba(255,255,255,0.1)'}}
              >
                <div className="blogicon text-emerald-600 text-2xl mb-4"><FaMapMarkerAlt /></div>
                <h3 className="text-gray-600 w-[50%] mx-[auto] pt-3 mt-5 h-[10px] bg-gray-400"></h3>
                <p className="text-gray-600 w-[100%] pt-3 mt-5 h-[10px] bg-gray-400"></p>
              </motion.div>

              <motion.div
                className="blogh bg-black p-6 rounded-lg shadow-lg" style={{border:'1px solid rgba(255,255,255,0.1)'}}
              >
                <div className="blogicon text-emerald-600 text-2xl mb-4"><FaRegClock /></div>
                <h3 className="text-gray-600 w-[50%] mx-[auto] pt-3 mt-5 h-[10px] bg-gray-400"></h3>
                <p className="text-gray-600 w-[100%] pt-3 mt-5 h-[10px] bg-gray-400"></p>
              </motion.div>
          </div>

          {/* Gallery Section */}
          <div className="my-12">
            <h2 className="text-3xl font-bold mb-8">Photo Gallery</h2>
            <div className="gallery grid md:grid-cols-2 gap-4">
                {Array(4).fill(0).map(()=><motion.div
                 
                  // initial={{ opacity: 0 }}
                  // animate={{ opacity: 1 }}
                  // transition={{ delay: index * 0.1 }}
                  className="pics relative cursor-pointer group"
                >
                  <img
                    className="w-full h-64 object-cover bg-gray-300 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg">
                    <p className="text-white opacity-0 group-hover:opacity-100 absolute bottom-4 left-4"></p>
                  </div>
                </motion.div>)}
              
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center space-x-4 my-8">
            <span className="font-semibold" style={{animation:"none"}}>Share:</span>
            {[FaFacebook, FaTwitter, FaInstagram, FaPinterest].map((Icon, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                className="text-gray-600 hover:text-emerald-600 text-xl"
              >
                <Icon />
              </motion.button>
            ))}
          </div>

          {/* Comments Section */}
            <div className="mt-12">
            <h2 className="text-3xl font-bold mb-8">Comments</h2>
            <div className="space-y-6">
                <div style={{border:'1px solid rgba(255,255,255,0.1)'}} className="bg-black p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold flex items-start gap-3"> <span style={{animation:"none"}}><FaRegCommentDots /></span><p className="bg-gray-400 w-[60px] h-[10px]"></p></h4>
                    <span className="text-gray-500 text-sm bg-gray-400 w-[60px] h-[10px]"></span>
                  </div>
                  <div className="text-center justify-center flex items-start gap-4">
                    
                    <p className="text-gray-500 bg-gray-400 w-[50%] h-[15px]">
                  </p></div>
                </div>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-white">Add a Comment</h3>
              <div className="space-y-4">
                <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-2 rounded-lg bg-gray-950 text-white border border-gray-900 focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                      placeholder="Your Comment"
                      className="w-full px-4 py-2 rounded-lg bg-gray-950 text-white border border-gray-900 focus:outline-none focus:border-blue-500 h-24 resize-none"
                    />
                    <button
                      className="bg-blue-800 text-[14px] text-white px-3 py-1 rounded-lg hover:bg-blue-900 transition duration-200"
                    >
                      Add Comment
                    </button>
                  </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      </div>
            ))
     }
    </div>
  );
};

export default EachBlogLoader;
