import { useState } from "react";
import Menu from "../components/Menu";
import profile from "../assets/profilepic.png";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message!");
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 fixed top-0 left-0 h-full z-10">
        <Menu />
      </div>

      {/* Main Content */}
      <div className="ml-[20%] w-[80%] p-8 flex flex-row items-center justify-center">
        {/* Contact Card */}
        <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-2xl shadow-lime-700">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-lightgreen rounded-xl"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-lightgreen rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-lightgreen rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
                rows="6"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-lightgreen text-white text-lg font-semibold rounded-xl border-lightgreen"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Chat Section */}
        <div className="ml-[10%] space-y-12">
          <div className="chat chat-start">
            <div className="chat-image avatar mr-4">
              <div className="w-24 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={profile}
                />
              </div>
            </div>
            <div className="chat-header">We are here to help you!</div>
            <div className="chat-bubble">Find us on Instagram at @vino&vista</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar ml-4">
              <div className="w-24 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={profile}
                />
              </div>
            </div>
            <div className="chat-header">Any questions?</div>
            <div className="chat-bubble">
              Telephone: +351 976663322 <br />
              Email: vinovista@gmail.com
            </div>
            <div className="chat-footer opacity-50">Delivery</div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar mr-4">
              <div className="w-24 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={profile}
                />
              </div>
            </div>
            <div className="chat-header">Vino&Vista has a compromisse with you!</div>
            <div className="chat-bubble">
              You can search for your question in <br/>the  FAQ section of our website.
            </div>
            <div className="chat-footer opacity-50">Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
