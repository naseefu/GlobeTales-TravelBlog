import React, { useState, useEffect, useRef } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaSearch, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import './home.css'
import Footer from "../Commons/Footer";
import Header from "../Commons/Header";
import { useNavigate } from "react-router-dom";

const TravelBlog = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const destinations = [
    {
      id: 1,
      title: "Santorini, Greece",
      image: "https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Experience the stunning white architecture and breathtaking sunsets of Santorini.",
      url:"/blog-page/1"
    },
    {
      id: 2,
      title: "Bali, Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
      description: "Discover tropical paradise with ancient temples and pristine beaches.",
      url:"/blog-page/11"
    },
    {
      id: 3,
      title: "Machu Picchu, Peru",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1",
      description: "Explore the mysterious ancient Incan citadel in the Andes Mountains.",
      url:"/blog-page/12"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 5,
      comment: "The travel recommendations were spot on! Had the best vacation ever!"
    },
    {
      id: 2,
      name: "Mike Williams",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      rating: 5,
      comment: "Incredible insights and beautiful destinations. Can't wait for my next trip!"
    },
    {
      id: 3,
      name: "Emily Davis",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      rating: 5,
      comment: "The blog helped me plan my dream vacation. Thank you!"
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Hidden Gems in Southeast Asia",
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526",
      date: "June 15, 2023",
      summary: "Discover lesser-known destinations that will take your breath away.",
      url:"/blog-page/13"
    },
    {
      id: 2,
      title: "Ultimate Guide to Budget Travel",
      image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81",
      date: "June 10, 2023",
      summary: "Learn how to explore the world without breaking the bank.",
      url:"/blog-page/14"
    },
    {
      id: 3,
      title: "Best Street Food Around the World",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      date: "June 5, 2023",
      summary: "A culinary journey through the world's most delicious street food scenes.",
      url:"/blog-page/15"
    }
  ];

    const sectionsRef = useRef([])

    useEffect(() => {
    const options = {
      threshold: 0.5,
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


  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate()

  return (
    <div>
      <div className="" style={{position:"relative",zIndex:'50'}}>
        <Header/>
      </div>
    <div className="homemain min-h-screen bg-black">
      <div
        className="relative min-h-[400px] h-screen bg-cover bg-center"
      >
        <video src="https://videos.pexels.com/video-files/3135808/3135808-hd_1920_1080_24fps.mp4" autoPlay muted loop playsInline className="w-screen h-[85vh]  pointer-events-none" style={{objectFit:'cover',zIndex:"10"}}/>
        <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none" >
          <div className="hero flex flex-col p-5 items-center justify-center h-full text-center text-white" >
            <h1 ref={(el) => sectionsRef.current[0] = el} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-10">Explore the World, Discover Your Next Adventure</h1>
            <button ref={(el) => sectionsRef.current[1] = el} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-[14px] md:text-[17px] font-semibold transition duration-300" style={{cursor:'pointer'}}>Start Your Journey</button>
          </div>
        </div>
      </div>

      <section className="featured container mx-auto mt-4 px-6 py-16 pt-0 md:pt-20 pb-20 md:w-[80%]" style={{margin:"0 auto"}}>
        <h2 ref={(el) => sectionsRef.current[2] = el} className="text-4xl md:text-7xl font-bold text-left mb-12">Featured Destinations</h2>
        <div className="flex flex-col gap-8 mt-4 md:mt-[80px] mb-[100px]">
          {destinations.map((destination,index) => (
            <div ref={(el) => sectionsRef.current[3+index] = el} key={destination.id} style={{}} className={`${index>0&&"mt-10"} destination bg-black flex flex-col ${destination.id%2===0?"md:flex-row-reverse":"md:flex-row"} text-left ${destination.id%2===0?"md:text-right":"md:text-left"} flex items-center cursor-pointer overflow-hidden border border-gray-800 md:border-none shadow-lg transition duration-300 transform hover:-translate-y-2`}>
              <div className="w-full">
                <img src={destination.image} className="lg:h-[400px] h-[300px] object-cover md:min-w-[40vw] w-full opacity-20" alt="article"/>
              </div>
              <div className={`p-6 ${destination.id%2===0?"md:-mr-[20%]":"md:-ml-[20%]"} w-full`} style={{zIndex:'9999'}}>
                <h3 className="md:text-[3vw] text-[20px] font-bold mb-2">{destination.title}</h3>
                <p className="text-gray-500 mb-4">{destination.description}</p>
                <button onClick={()=>navigate(`${destination.url}`)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition duration-300">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div
        className="discover h-[400px] md:bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/29289204/pexels-photo-29289204/free-photo-of-hot-air-balloons-over-cappadocia-at-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
          backgroundColor:"rgba(0,0,0,0.8)",backgroundBlendMode:'overlay'
        }}
      >
        <h2 ref={(el) => sectionsRef.current[6] = el} className="text-3xl md:text-4xl lg:text-6xl font-bold text-white text-center px-4 z-10 relative">Discover Amazing Places</h2>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>


      <section className="articles bg-black py-16 pt-20 pb-20">
        <div className="container mx-auto px-6 lg:w-[80%]" style={{margin:'0 auto'}}>
          <h2 ref={(el) => sectionsRef.current[7] = el} className="text-5xl md:text-7xl font-bold text-left mb-12">Latest Articles</h2>
          <div className="flex flex-col gap-10 mt-4 md:mt-[70px] mb-[100px]">
            {blogPosts.map((post,index) => (
              <div onClick={()=>navigate(`${post.url}`)}  ref={(el) => sectionsRef.current[8+index] = el} key={post.id} style={{ zIndex:'1'}} className={`post flex flex-col bg-black ${post.id%2===0?"md:flex-row-reverse":"md:flex-row"} text-start ${post.id%2===0?"md:text-right":"md:text-left"} border border-gray-800 md:border-none  md:mt-10 items-center gap-6 overflow-hidden transition duration-300 transform hover:-translate-y-2`}>
                <div className="w-full md:w-[auto]" style={{zIndex:'3'}}>
                  <img src={post.image} className="lg:h-[400px] h-[300px] w-[100%] md:w-[auto] object-cover opacity-20 " style={{zIndex:'2'}} alt="article"/>
                </div>
                <div className={`p-6 pl-5 pr-5 ${post.id%2===0?"md:-mr-[20%]":"md:-ml-[20%]"} w-[100%] md:w-[auto]`}>
                  <div className="text-gray-500 text-sm mb-2 " style={{zIndex:'999'}}>{post.date}</div>
                  <h3 className="md:text-[3vw] text-[20px] font-bold mb-2" style={{zIndex:'99999'}}>{post.title}</h3>
                  <p className="text-gray-500 mb-4" style={{zIndex:'99999'}}>{post.summary}</p>
                  <button className="text-blue-500 hover:text-blue-700 font-semibold" onClick={()=>navigate(`${post.url}`)} style={{zIndex:'99999'}}>Read More →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className="md:bg-fixed bg-cover bg-center py-16 px-6 relative"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1516483638261-f4dbaf036963)`,
          backgroundColor:"rgba(0,0,0,0.4)",backgroundBlendMode:'overlay'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="max-w-4xl mx-auto bg-gray-950 bg-opacity-80 rounded-lg py-12 px-6 md:px-12 text-center text-white relative z-10">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-8">Get exclusive travel tips and updates delivered straight to your inbox!</p>
          <div className="max-w-xl mx-auto flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-1 rounded-full text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-gray-950 px-5 py-1 rounded-full font-semibold hover:bg-gray-700 hover:text-white transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">What Travelers Say</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-black rounded-lg p-8 border border-gray-700 shadow-lg">
              <div className="flex items-center mb-6">
                <img
                  src={`${testimonials[testimonialIndex].image}`}
                  alt={testimonials[testimonialIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-bold text-lg">{testimonials[testimonialIndex].name}</div>
                  <div className="flex mt-2">
                    {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                      <FaStar className="text-gray-600" key={i} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-lg italic">"{testimonials[testimonialIndex].comment}"</p>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Footer/>
      </div>
    </div></div>
  );
};

export default TravelBlog;
