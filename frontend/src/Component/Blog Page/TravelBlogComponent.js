import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaRegClock, FaMapMarkerAlt, FaRegCalendarAlt, FaRegComment, FaRegCommentDots } from "react-icons/fa";
import Header from "../Commons/Header";
import './blog.css'
import ApiServices from "../../Service/ApiService";
import { useParams } from "react-router-dom";
import EachBlogLoader from "../Commons/EachBlogLoader";
import { IoMdBrush } from "react-icons/io";

const TravelBlogComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const id = useParams()

  const [blogData,setBlogData] = useState();
   const [comments, setComments] = useState([]);
   const [newComment, setNewComment] = useState({ name: "", comment: "" });

   const [error,setError] = useState('')

   const [loaded,setLoaded] = useState(false)

    const handleAddComment = async() => {
      
      try{

        const response = await ApiServices.addCommentsToBlog(newComment,id&&id.id);
        console.log(response)
        window.location.reload()

      }
      catch(err){

        setError(err.response?.data?.message|| "An error occured")
        console.log(err)

      }

  };


  useEffect(()=>{

    const fetchEachBlog=async()=>{
      setLoaded(false)
      try{
        const response = await ApiServices.getEachBlog(id&&id.id)
        setBlogData(response.blogger2)
        setLoaded(true)

      }
      catch(err){
        console.log(err.response?.data?.message|| "An error occured")
      }

    }

    fetchEachBlog();

  },[id])

  useEffect(()=>{

    if(error){
      const timer = setTimeout(()=>{
        setError('')
      },5000)

      return ()=>clearTimeout(timer)
    }

  },[error])

  const [loading,setLoading] = useState(false)

  const [summary,setSummary] = useState("")
  const [isSum,setIsSum] = useState(false)

  const handleSummarize=async()=>{
    setLoading(true)
    try{
      const data = blogData?.title+" : "+blogData?.description;
      const response = await ApiServices.getAiSummarize({data})
      setSummary(response.generatedContent)
      setLoading(false)
      setIsSum(true)
      return response

    }
    catch(err){
      console.log(err)
      setError(err.response?.data?.message|| "An error occured")
      setLoading(false)
    }

  }


  return (
    <div className="min-h-screen bg-black ">
      {/* Header Image */}
      <Header/>
      {loaded?blogData&&<div>
      <div className="heroblog  relative h-[70vh] w-full max-w-7xl mx-auto overflow-hidden">
        
        <img 
          src={`${blogData.image}`}
          alt="Swiss Alps"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1531400158697-004a3a06fd3f";
            e.target.alt = "Fallback image";
          }}
          style={{opacity:'40%'}}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-[100px]"
          >
            {blogData.title}
          </h1>
          <div className="blogdata flex items-center space-x-4 text-gray-200">
            <span>{blogData.date1}</span>
            <span>•</span>
            <span>{blogData.author}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="prose lg:prose-xl">
          <div className="blogcontent">
          <p className="text-gray-300 text-left text-lg leading-relaxed" 
            dangerouslySetInnerHTML={{
          __html: isSum?summary:blogData.description.replace(/\n/g, '<br />')
          }}
          ></p></div>
          <div>
            <p className={`flex items-center gap-3 mt-4 border border-gray-800 ${loading&&"bg-gray-800"} justify-start w-[fit-content] px-2 py-2 cursor-pointer hover:bg-gray-800 transition duration-300`} onClick={!loading&&handleSummarize}>{loading?"proceeding...":"Summarize Blog"}<span><IoMdBrush /></span></p>
          </div>

          {/* Highlights Section */}
          <div className="blogdatamap grid md:grid-cols-3 gap-8 my-12">
              {blogData.bestTime&&<motion.div
                className="blogh bg-black p-6 rounded-lg shadow-lg" style={{border:'1px solid rgba(255,255,255,0.1)'}}
              >
                <div className="blogicon text-emerald-600 text-2xl mb-4"><FaRegCalendarAlt /></div>
                  <h3 className="font-bold text-xl mb-2">Best Time to Visit</h3>
                  <p className="text-gray-600">{blogData.bestTime}</p>
              </motion.div>}

              {blogData.mustSee&&<motion.div
                className="blogh bg-black p-6 rounded-lg shadow-lg" style={{border:'1px solid rgba(255,255,255,0.1)'}}
              >
                <div className="blogicon text-emerald-600 text-2xl mb-4"><FaMapMarkerAlt /></div>
                <h3 className="font-bold text-xl mb-2">Must-See Attractions</h3>
                <p className="text-gray-600">{blogData.mustSee}</p>
              </motion.div>}

              {blogData.duration&&<motion.div
                className="blogh bg-black p-6 rounded-lg shadow-lg" style={{border:'1px solid rgba(255,255,255,0.1)'}}
              >
                <div className="blogicon text-emerald-600 text-2xl mb-4"><FaRegClock /></div>
                <h3 className="font-bold text-xl mb-2">Duration</h3>
                <p className="text-gray-600">{blogData.duration}</p>
              </motion.div>}
          </div>

          {/* Gallery Section */}
          {blogData.gallery.length>0&&<div className="my-12">
            <h2 className="text-3xl font-bold mb-8">Photo Gallery</h2>
            <div className="gallery grid md:grid-cols-2 gap-4">
              {blogData.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  // initial={{ opacity: 0 }}
                  // animate={{ opacity: 1 }}
                  // transition={{ delay: index * 0.1 }}
                  className="pics relative cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={`${image.url}`}
                    alt={image.caption}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4";
                      e.target.alt = "Fallback image";
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg">
                    <p className="text-white opacity-0 group-hover:opacity-100 absolute bottom-4 left-4">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>}

          {/* Social Share */}
          <div className="flex items-center space-x-4 my-8">
            <span className="font-semibold">Share:</span>
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
          {blogData.comments.length>0&&<div className="mt-12">
            <h2 className="text-3xl font-bold mb-8">Comments</h2>
            <div className="space-y-6">
              {blogData.comments.map((comment, index) => (
                <div style={{border:'1px solid rgba(255,255,255,0.1)'}} key={index} className="bg-black p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold flex items-start gap-3">{comment.name} <span><FaRegCommentDots /></span></h4>
                    <span className="text-gray-500 text-sm">{comment.date.split("T")[0]}</span>
                  </div>
                  <div className="text-center justify-center flex items-start gap-4">
                    
                    <p className="text-gray-500">{comment.comment}
                  </p></div>
                </div>
              ))}
            </div>
          </div>}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-white">Add a Comment</h3>
              <div className="space-y-4">
                <input
                      type="text"
                      placeholder="Your Name"
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-gray-950 text-white border border-gray-900 focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                      placeholder="Your Comment"
                      value={newComment.comment}
                      onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-gray-950 text-white border border-gray-900 focus:outline-none focus:border-blue-500 h-24 resize-none"
                    />
                    {error&&<div>
                        <p className="text-[13px] text-red-500">{error}</p>
                      </div>}
                    <button
                      onClick={handleAddComment}
                      className="bg-blue-800 text-[14px] text-white px-3 py-1 rounded-lg hover:bg-blue-900 transition duration-200"
                    >
                      Add Comment
                    </button>
                  </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={`${selectedImage.url}`}
              alt={selectedImage.caption}
              className="w-full h-full rounded-lg"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4";
                e.target.alt = "Fallback image";
              }}
            />
            <p className="text-white text-center mt-4">{selectedImage.caption}</p>
          </div>
        </div>
      )}
      </div>:<EachBlogLoader/>}
    </div>
  );
};

export default TravelBlogComponent;
