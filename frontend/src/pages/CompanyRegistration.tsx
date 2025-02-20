import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/CompanyRegistration.css";
import RegistrationImg1 from "../assets/companyReg0.png";
import RegistrationImg2 from "../assets/companyReg1.png";
import RegistrationImg3 from "../assets/companyReg2.png";
import RegistrationImg4 from "../assets/companyReg3.png";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";

const slides = [
  {
    image: RegistrationImg1,
    title: "Welcome to Enterprise Solution",
    text: "Managing and sharing passwords securely across your company has never been easier.",
  },
  {
    image: RegistrationImg2,
    title: "Set Up Your Company",
    text: "Register your company and invite team members with secure access control.",
  },
  {
    image: RegistrationImg4,
    title: "Define User Roles & Permissions",
    text: "Ensure secure access with role-based permissions and encrypted storage.",
  },
  {
    image: RegistrationImg3,
    title: "Share Passwords Effortlessly",
    text: "Share passwords with team members and access them from any device.",
  },
];

const CompanyRegistration = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };
  const navigate = useNavigate(); // Initialize useNavigate

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  return (
    <div className="company_registration_page">
      <div className="company_registration_container" {...handlers}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            className="company_registration_screen"
            initial={{ opacity: 0, x: direction * 100 }} // Move from right for next, left for prev
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }} // Move opposite to previous
            transition={{ duration: 0.3 }}
          >
            <div className="company_registration_screen_image">
              <img src={slides[currentIndex].image} alt="Step" />
            </div>
            <h3 className="company_registration_screen_title">
              {slides[currentIndex].title}
            </h3>
            <p className="company_registration_screen_text">
              {slides[currentIndex].text}
            </p>
            {/* Show button only on the last slide */}
            {currentIndex === slides.length - 1 && (
              <button
                className="company_registration_finish_btn"
                onClick={() => navigate(ROUTES.COMPANYREGISTRATIONFORM)} // Change path as needed
              >
                Register Now
              </button>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="company_registration_navigator">
          <span
            className={`company_registration_navigator_btn ${
              currentIndex === 0 ? "disabled" : ""
            }`}
            onClick={prevSlide}
          >
            Back
          </span>
          <div className="company_registration_dots">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`company_registration_dot ${
                  index === currentIndex ? "active" : ""
                }`}
              ></div>
            ))}
          </div>
          <span
            className={`company_registration_navigator_btn ${
              currentIndex === slides.length - 1 ? "disabled" : ""
            }`}
            onClick={nextSlide}
          >
            Next
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;
