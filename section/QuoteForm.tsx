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
      <section className="snap-start min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="w-full max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-3 sm:mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed px-4">
              Your quote request has been submitted successfully. Our team will
              contact you within 24 hours to discuss your project requirements.
            </p>
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 mx-4 sm:mx-0">
              <p className="text-xs sm:text-sm text-gray-500">
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
    <section className="snap-start min-h-screen w-full bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light mb-3 sm:mb-4 text-black">
            Get a <span className="text-gray-400">Free Quote</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4 sm:px-0">
            Transform your space with our expert interior design services. Share
            your project details and receive a personalized quote within 24
            hours.
          </p>
        </div>

        <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 mx-2 sm:mx-0">
          <form onSubmit={handleSubmit} className="space-y-6 text-black">
            {/* Personal Information */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
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
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-sm sm:text-base ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.name}</p>
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
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-sm sm:text-base ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.phone}</p>
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
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-sm sm:text-base ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.email}</p>
              )}
            </motion.div>

            {/* Property Information */}
            <div className="border-t border-gray-200 pt-6">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
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
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-sm sm:text-base ${
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
                    <p className="mt-1 text-xs sm:text-sm text-red-500">
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
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-sm sm:text-base ${
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
                    <p className="mt-1 text-xs sm:text-sm text-red-500">
                      {errors.constructionStage}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Location Information */}
            <div className="border-t border-gray-200 pt-6">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
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
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-sm sm:text-base ${
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
                    <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.state}</p>
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
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-sm sm:text-base ${
                      errors.district ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your district"
                  />
                  {errors.district && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500">
                      {errors.district}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Budget Information */}
            <div className="border-t border-gray-200 pt-6">
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
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors text-sm sm:text-base ${
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
                  <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.budget}</p>
                )}
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              className="border-t border-gray-200 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors rounded-lg font-medium text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>GET FREE QUOTE</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 leading-relaxed">
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
