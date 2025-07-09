"use client";

import type React from "react";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  state: string;
  district: string;
  constructionStage: string;
  budget: string;
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    state: "",
    district: "",
    constructionStage: "",
    budget: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const propertyTypes = [
    "Select Property Type",
    "Apartment",
    "Villa",
    "Independent House",
    "Duplex",
    "Penthouse",
    "Studio",
    "Commercial Space",
  ];

  const constructionStages = [
    "Select Construction Stage",
    "Planning Phase",
    "Foundation Complete",
    "Structure Complete",
    "Interior Work Started",
    "Near Completion",
    "Ready to Move",
  ];

  const budgetRanges = [
    "Select Budget Range",
    "Under ₹5 Lakhs",
    "₹5 - ₹10 Lakhs",
    "₹10 - ₹20 Lakhs",
    "₹20 - ₹50 Lakhs",
    "₹50 Lakhs - ₹1 Crore",
    "Above ₹1 Crore",
  ];

  const indianStates = [
    "Select State",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (
      !formData.propertyType ||
      formData.propertyType === "Select Property Type"
    ) {
      newErrors.propertyType = "Please select a property type";
    }
    if (!formData.state || formData.state === "Select State") {
      newErrors.state = "Please select a state";
    }
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (
      !formData.constructionStage ||
      formData.constructionStage === "Select Construction Stage"
    ) {
      newErrors.constructionStage = "Please select construction stage";
    }
    if (!formData.budget || formData.budget === "Select Budget Range") {
      newErrors.budget = "Please select a budget range";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          propertyType: "",
          state: "",
          district: "",
          constructionStage: "",
          budget: "",
        });
      }, 2000);
      setErrors({});
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-20 snap-start h-screen flex items-center bg-gray-50">
        <motion.div
          className="container mx-auto px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-light mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-8">
              Your quote request has been submitted successfully. Our team will
              contact you within 24 hours to discuss your project requirements.
            </p>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">
                Reference ID:{" "}
                <span className="font-medium text-black">
                  MN-{Date.now().toString().slice(-6)}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-12 snap-start bg-gray-50 md:h-screen min-h-screen px-8">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="text-center mb-6 flex md:flex-row flex-col justify-between">
          <h2 className="text-4xl lg:text-5xl font-light mb-4 text-black">
            Get a <span className="text-gray-400">Free Quote</span>
          </h2>
          <p className="text-gray-600 max-w-2xl md:text-right leading-relaxed">
            Transform your space with our expert interior design services. Share
            your project details and receive a personalized quote within 24
            hours.
          </p>
        </div>

        <div className="bg-white shadow-sm border text-black border-gray-100 p-8 ">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Information */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </motion.div>

            {/* Property Information */}
            <div className="border-t border-gray-200 pt-4">
              {/* <h3 className="text-lg font-medium text-gray-900 mb-4">
              Property Information
            </h3> */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div>
                  <label
                    htmlFor="propertyType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Property Type *
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                      errors.propertyType ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.propertyType && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.propertyType}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="constructionStage"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Construction Stage *
                  </label>
                  <select
                    id="constructionStage"
                    name="constructionStage"
                    value={formData.constructionStage}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                      errors.constructionStage
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {constructionStages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                  {errors.constructionStage && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.constructionStage}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Location Information */}
            <div className="border-t border-gray-200 pt-4">
              {/* <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3> */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    State *
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {indianStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="district"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    District *
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                      errors.district ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your district"
                  />
                  {errors.district && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.district}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Budget Information */}
            <div className="border-t border-gray-200 pt-4">
              {/* <h3 className="text-lg font-medium text-gray-900 mb-4">Budget</h3> */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Budget Range *
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                    errors.budget ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
                )}
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              className="border-t border-gray-200 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-black text-white px-8 py-4 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span className="font-medium">GET FREE QUOTE</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="mt-4 text-sm text-gray-500">
                By submitting this form, you agree to our terms of service and
                privacy policy. We'll contact you within 24 hours.
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
