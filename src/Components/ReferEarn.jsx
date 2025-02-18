import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaUserPlus, FaGift, FaRegCheckCircle } from "react-icons/fa";
import axios from "axios";

const ReferEarn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    refereeName: "",
    refereeEmail: "",
    courseName: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/referrals", formData);
      const data = await res.json(); // Make use of 'res'
      console.log(data); // Use 'data' somewhere in the code
      console.log("res",res);
      alert("Referral submitted successfully!");

      setIsOpen(false);
    } catch (error) {
      alert("Failed to submit referral");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow">
        <h2 className="text-xl font-bold text-blue-700">accredian</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Explore</button>
      </nav>

      {/* Hero Section */}
      <div className="text-center bg-white shadow-lg p-6 mx-4 my-6 rounded-xl">
        <h1 className="text-2xl font-bold">Let's Learn & Earn</h1>
        <p className="text-gray-600 mt-2">Get a chance to win up to <span className="text-blue-600 font-semibold">Rs. 15,000</span></p>
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4">Refer Now</button>
      </div>

      {/* How It Works Section */}
      <div className="px-6">
        <h2 className="text-xl font-semibold mb-4">How Do I <span className="text-blue-600">Refer?</span></h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <FaUserPlus className="text-blue-600 text-3xl" />
            <p>Submit referrals only with active contact details.</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaGift className="text-blue-600 text-3xl" />
            <p>Earn rewards once your referred joins the program.</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaRegCheckCircle className="text-blue-600 text-3xl" />
            <p>Referee gets a discount on program enrollment.</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6">Refer Now</button>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-semibold text-center">Refer a Friend</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <input type="text" name="referrerName" placeholder="Your Name" required className="w-full p-2 border rounded" onChange={handleChange} />
              <input type="email" name="referrerEmail" placeholder="Your Email" required className="w-full p-2 border rounded" onChange={handleChange} />
              <input type="text" name="refereeName" placeholder="Friend's Name" required className="w-full p-2 border rounded" onChange={handleChange} />
              <input type="email" name="refereeEmail" placeholder="Friend's Email" required className="w-full p-2 border rounded" onChange={handleChange} />
              <input type="text" name="courseName" placeholder="Course Name" required className="w-full p-2 border rounded" onChange={handleChange} />
              <textarea name="message" placeholder="Message (Optional)" className="w-full p-2 border rounded" onChange={handleChange}></textarea>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Submit Referral</button>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ReferEarn