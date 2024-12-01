import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaCalendar, FaArrowRight, FaPlus } from "react-icons/fa";
import Header from "../Commons/Header";
import {motion} from 'framer-motion'
import { useNavigate, useParams } from "react-router-dom";
import './blog.css'
import ApiServices from "../../Service/ApiService";
import LoadingAllBlogs from "../Commons/LoadingAllBlogs";
import { useUser } from "../Context/UserContext";

const FullBlog = () => {

  const [blogs,setBlogs] = useState([]);

  const [hid,setHid] = useState(false)

  const navigate = useNavigate()

  const {num} = useParams()
  const size =6;

  const sectionsRef = useRef([])

    useEffect(() => {
    const options = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-section');
        } else {
          // entry.target.classList.remove('show-section');
        }
      });
    }, options);

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      // Cleanup the observer on component unmount
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          if (section) {
            observer.unobserve(section);
          }
        });
      }
    };
  }, []);

  const [totalPages,setTotalPages] = useState([]);

  const [loading,setLoading] = useState(false)

  useEffect(()=>{

    const fetchAllBlogs=async()=>{
      setLoading(false)
      try{

        const response = await ApiServices.getAllBlog(num&&parseInt(num),size&&size)
        setBlogs(response.blogger)
        const t = response.totalNumOfBlogs
        const m = Math.ceil((t)/size)

        const pages = []

        for (let index = Math.max(0, num - 3); index < m; index++) {

          pages.push(index+1)
          
        }

        setTotalPages(pages)
        setLoading(true)

      }
      catch(err){
        console.log(err)
        setLoading(true)
      }

    }
    fetchAllBlogs()

  },[num,size])

  const {user} = useUser()

  return (
    <div className="relative">
    <div className="p-0" style={{backgroundColor:"rgba(255,255,255,0.05)"}}>
      <Header/>
    </div>
    {user&&<div className="absolute flex flex-col items-end gap-3" style={{bottom:"30px",right:'30px',position:'fixed',zIndex:'10'}}>
      {hid&&<motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:1}}
        className="bg-gray-800 px-4 py-4 rounded-lg text-left">
          <p className="cursor-pointer text-[13px]" onClick={()=>navigate("/add-blog")}>Add Blog</p>
        </motion.div>}
      <p className="text-white bg-blue-500 px-4 py-4 rounded-[30px] hover:bg-blue-600 cursor-pointer transition duration-300 ease" onClick={()=>setHid(!hid)}><FaPlus color="white" /></p>
    </div>}
    <div className="fullblog bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 ref={(el)=>sectionsRef.current[0]=el} className="text-4xl font-bold text-center text-white mb-12">Travel Adventures</h1>
        
        <div className="space-y-8">
          {loading?blogs&&blogs.map((blog,index) => (
            <motion.div 
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{duration:1}}
              // ref={(el)=>sectionsRef.current[1+index]=el}
              style={{border:"1px solid rgba(255,255,255,0.1)"}}
              key={blog.id} 
              className="blogs bg-black rounded-lg shadow-md overflow-hidden flex flex-col text-left md:flex-row transition-transform duration-300 hover:shadow-xl"
            >
              <div className="md:w-1/3 max-h-[300px] relative">
                <img
                  src={`${blog.image}`}
                  alt={blog.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              
              <div className="md:w-2/3 p-6 md:p-8 ">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <div className="flex items-center mr-6">
                    <FaUser className="mr-2" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2" />
                    <span>{blog.date}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl pt-7 font-bold text-white mb-4">{blog.title}</h2>
                
                <p className="text-gray-400 mb-6">{blog.description.slice(0,100)}{blog.description.length>100&&"..."}</p>
                
                <button onClick={()=>navigate(`/blog-page/${blog.id}`)} className="inline-flex items-center px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Read More
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </motion.div>
          )):<LoadingAllBlogs/>}
        </div>
      </div>
    </div>
    {totalPages&&totalPages.length>1&&<div className="p-5 flex items-center gap-6 justify-center mb-10">
        {totalPages.map((m,index)=>(
          <div key={index} >
            {<p className={`bg-gray-800 w-[22px] rounded-md cursor-pointer ${num&&parseInt(num)===m&&'bg-gray-500'}`} onClick={()=>navigate(`/all-blogs/${m}`)}>{index<5&&m}</p>}
          </div>
        ))}
      </div>}
    </div>
  );
};

export default FullBlog;