'use client';

import { useState } from "react";

export default function Career() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "Frontend Developer", // Default selection
    message: "",
    resume: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

 const submitForm = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("email", form.email);
  formData.append("position", form.position);
  formData.append("message", form.message);
  if (form.resume) formData.append("resume", form.resume);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/careers/`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    // ✅ IMPORTANT: check response status first
    if (!res.ok) {
      const errorText = await res.text(); // backend error (HTML or JSON)
      console.error("Backend error:", errorText);
      throw new Error("Failed to submit application");
    }

    const data = await res.json();
    alert(data.message || "Application submitted successfully!");
  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Join Our Team</h2>
          <p className="text-gray-500 mt-2">Submit your application and we'll be in touch.</p>
        </div>
        
        <form onSubmit={submitForm} className="space-y-5">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                name="name" 
                placeholder="Jane Doe" 
                onChange={handleChange} 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                name="email" 
                type="email"
                placeholder="jane@example.com" 
                onChange={handleChange} 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black bg-gray-50"
              />
            </div>
          </div>

          {/* Position Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Applying For</label>
            <select 
              name="position" 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black bg-gray-50"
            >
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>UI/UX Designer</option>
              <option>Product Manager</option>
            </select>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF/Doc)</label>
            <input 
              name="resume" 
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange} 
              required
              className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter / Message</label>
            <textarea 
              name="message" 
              placeholder="Tell us why you're a great fit..." 
              onChange={handleChange} 
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black bg-gray-50"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md disabled:opacity-50"
          >
            {loading ? "Processing..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );

}


