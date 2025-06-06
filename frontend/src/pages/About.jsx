import React from 'react'
import { FaStore, FaShippingFast, FaSmile } from "react-icons/fa";


const About = () => {
  return (
    <>
    <section className="min-h-screen bg-white py-12 px-6 md:px-12 mt-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6">
          About Every Day Special
        </h1>
        <p className="text-gray-600 text-lg mb-12">
          Welcome to <span className="font-semibold">Every Day Special</span>, your one-stop destination for quality products at the best prices.
          We aim to deliver an exceptional shopping experience to every customer.
        </p>

        {/* Highlights Section */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <FaStore className="text-4xl text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Trusted Online Store</h3>
            <p className="text-gray-700">
              We bring top brands and curated collections right to your fingertips.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <FaShippingFast className="text-4xl text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-700">
              Enjoy fast and reliable shipping across India, with real-time tracking.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <FaSmile className="text-4xl text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Customer Happiness</h3>
            <p className="text-gray-700">
              Our support team is available 24/7 to help you with anything you need.
            </p>
          </div>
        </div>

        {/* Team or Mission Statement */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-4 text-yellow-400">Our Mission</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            We believe that online shopping should be fast, easy, and affordable.
            Our mission is to make high-quality products accessible to everyone, no matter where they are.
          </p>
        </div>
      </div>
    </section>
    
    </>
  )
}

export default About