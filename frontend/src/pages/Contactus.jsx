import React from 'react'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";


const Contactus = () => {
    return (
   <section className="h-[65%] bg-gray-50 py-12 px-4 flex justify-center items-start mt-20">
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-[85%]  p-8">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
          Contact Our Support
        </h1>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 text-gray-700 mb-10">
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-yellow-400 text-2xl mt-1" />
            <div>
              <h2 className="font-semibold text-lg">Visit Us</h2>
              <p>Anand nagar, Bhopal, India</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaPhoneAlt className="text-yellow-400 text-2xl mt-1" />
            <div>
              <h2 className="font-semibold text-lg">Call Us</h2>
              <p>+91 9754584581</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaEnvelope className="text-yellow-400 text-2xl mt-1" />
            <div>
              <h2 className="font-semibold text-lg">Email Us</h2>
              <p>everydayspecial2005@gmail.com.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded"
          >
            Submit Request
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contactus