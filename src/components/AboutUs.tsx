// src/pages/AboutUs.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          About Us
        </h2>

        <p className="text-gray-700 leading-relaxed text-lg text-center max-w-3xl mx-auto mb-10">
          At Buddy Bike, we believe in the power of clean, sustainable
          transportation. Our goal is to make high-quality, eco-friendly bikes
          accessible for everyone — whether you're commuting to work, exploring
          the city, or heading out for a weekend adventure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              To provide convenient and affordable bike rental services while
              promoting environmental awareness and healthy living.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Why Choose Us?</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Wide range of high-quality bikes</li>
              <li>Affordable daily and weekly rental plans</li>
              <li>24/7 customer support</li>
              <li>Easy online booking and tracking</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
