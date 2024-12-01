import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  
  return (
    <footer className="bg-gray-950 text-white py-12 text-left">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TravelBlog</h3>
              <p className="text-gray-400">Inspiring adventurous souls to explore the world.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Destinations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Travel Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <FaFacebook className="text-gray-400 hover:text-white cursor-pointer" />
                <FaTwitter className="text-gray-400 hover:text-white cursor-pointer" />
                <FaInstagram className="text-gray-400 hover:text-white cursor-pointer" />
                <FaLinkedin className="text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <address className="text-gray-400 not-italic">
                <p>1234 Travel Lane</p>
                <p>Adventure City, AC 12345</p>
                <p>Email: hello@travelblog.com</p>
                <p>Phone: (555) 123-4567</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-900 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 TravelBlog. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
