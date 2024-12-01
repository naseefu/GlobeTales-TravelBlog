import React, { useEffect, useState } from "react";
import { FaBold, FaItalic, FaImage, FaMapMarkedAlt, FaClock, FaSun } from "react-icons/fa";
import AddEditor from "./AddEditor";
import Header from "../Commons/Header";
import ApiServices from "../../Service/ApiService";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'
import 'font-awesome/css/font-awesome.min.css';

const TravelBlogPost = () => {
  const [title, setTitle] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [content, setContent] = useState("");
  const [mustSeePlaces, setMustSeePlaces] = useState("");
  const [duration, setDuration] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const [selectedText, setSelectedText] = useState({ start: 0, end: 0 });
  const [captions,setCaptions] = useState([])

  const formdata  = new FormData();

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleAdditionalImages = (index, file, c) => {
    const newImages = [...additionalImages];
    newImages[index] = { file: file, caption: c };
    setAdditionalImages(newImages);
  };
  const {user} = useUser()
  const [addimg,setImg] = useState([])

  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const [error,setError] = useState('')
  
  const handlePublish=async()=>{
    setLoading(true)
    const newestImages = [...addimg];
    const newCaptions = []; // Clone the existing state
    additionalImages.forEach((item) => {
    newestImages.push(item.file);
    newCaptions.push(item.caption)
    });
  
  formdata.append("title",title);
  formdata.append("mainImage",mainImage);
  formdata.append("content",content);
  formdata.append("bestTime",bestTime);
  formdata.append("mustSee",mustSeePlaces);
  formdata.append("duration",duration);

    try{
      const response = await ApiServices.addBlog({title:title,mainImage:mainImage,content:content,bestTime:bestTime,mustSee:mustSeePlaces,duration:duration,galleries:newestImages,captions:newCaptions},user&&user.id)
      setLoading(false)
      navigate("/all-blogs/1")
    }
    catch(err){
      console.log(err)
      setError(err.response?.data?.message || "An error occured")
      setLoading(false)
    }
  }

  useEffect(()=>{

    if(error){
      const timer = setTimeout(() => {
        setError('')
      },5000)

      return ()=>clearTimeout(timer);
    }

  },[error])

  const [proc,setProc] = useState("processing")

  useEffect(()=>{

    if(loading){
      const timer = setTimeout(() => {
        setProc("Wait for a while...")
      },10000)

      return ()=>clearTimeout(timer)
    }

    if(loading){
      const timer = setTimeout(() => {
        setProc("Posting soon...")
      },20000)

      return ()=>clearTimeout(timer)
    }

  },[loading])

  return (
    <div className="bg-black">
      <div className="p-0" style={{backgroundColor:'rgba(255,255,255,0.07)'}}>
        <Header/>
      </div>
    <div className="min-h-screen bg-black text-gray-100 p-6 mt-7">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">Create Travel Blog Post</h1>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-950 border border-gray-900 rounded-lg p-3  focus:border-transparent"
            placeholder="Enter your blog title"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Main Image</label>
          <div className="border-2 border-dashed border-gray-900 rounded-lg p-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageUpload}
              className="hidden"
              id="mainImage"
            />
            <label
              htmlFor="mainImage"
              className="flex flex-col items-center cursor-pointer"
            >
              {mainImage ? (
                <img
                  src={URL.createObjectURL(mainImage)}
                  alt="Main blog"
                  className="max-h-60 object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <FaImage className="text-4xl mb-2" />
                  <span>Click to upload main image</span>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="space-y-2">
            <AddEditor content={content} setContent={setContent}/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium">
              <FaMapMarkedAlt className="mr-2" /> Must See Places
            </label>
            <input
              type="text"
              value={mustSeePlaces}
              onChange={(e) => setMustSeePlaces(e.target.value)}
              className="w-full bg-gray-950 border border-gray-900 rounded-lg p-3"
              placeholder="Must visit spots"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium">
              <FaClock className="mr-2" /> Trip Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-gray-950 border border-gray-900 rounded-lg p-3"
              placeholder="Duration of trip"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium">
              <FaSun className="mr-2" /> Best Time to Visit
            </label>
            <input
              type="text"
              value={bestTime}
              onChange={(e) => setBestTime(e.target.value)}
              className="w-full bg-gray-950 border border-gray-900 rounded-lg p-3"
              placeholder="Best season to visit"
            />
          </div>
        </div>

        <div className="space-y-2 pt-8">
          <label className="block text-sm font-medium mb-8">Additional Images with Captions (Max 4)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="border-2 border-dashed border-gray-900 rounded-lg p-4 space-y-2"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleAdditionalImages(index, file, "");
                    }
                  }}
                  className="hidden"
                  id={`additional-${index}`}
                />
                <label
                  htmlFor={`additional-${index}`}
                  className="flex flex-col items-center justify-center h-40 cursor-pointer"
                >
                  {additionalImages[index]?.file ? (
                    <img
                      src={URL.createObjectURL(additionalImages[index].file)}
                      alt={`Additional ${index + 1}`}
                      className="h-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <FaImage className="text-2xl mb-2" />
                      <span className="text-sm text-center">Upload Image</span>
                    </>
                  )}
                </label>
                <input
                  type="text"
                  placeholder="Add caption"
                  value={additionalImages[index]?.caption || ""}
                  onChange={(e) => {
                    if (additionalImages[index]) {
                      handleAdditionalImages(
                        index,
                        additionalImages[index].file,
                        e.target.value
                      );
                    }
                  }}
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg p-2 mt-2"
                />
              </div>
            ))}
          </div>
        </div>
        {error&&<motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{duration:1}}
        >
          <p className="text-red-600 text-[14px]">{error}</p>
        </motion.div>}
        {loading?<button className="buttonload w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-300 flex items-center gap-2 justify-center">
          <i className="fa fa-circle-o-notch fa-spin"></i> {proc}
        </button>:<button onClick={handlePublish} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-300">
          Publish Blog Post
        </button>}
      </div>
    </div></div>
  );
};

export default TravelBlogPost;
