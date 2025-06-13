import React from "react";

const Landing = () => {
  return (
    <div className="position-relative d-flex align-items-center justify-content-center w-screen vh-100 overflow-hidden text-white bg-dark">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1676311396794-f14881e9daaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero"
        className="position-absolute top-0 left-0 vw-100 vh-100 object-cover z-[-1] pointer-events-none select-none"
        style={{ zIndex: "", opacity: "0.2" }}
      />

      {/* Hero content */}
      <div className="relative flex flex-col items-center justify-center h-screen text-white text-center px-4">
        <h1 className="text-14xl sm:text-15xl md:text-16xl lg:text-17xl font-extrabold drop-shadow-lg">
          Connect Services
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg">
          Empower Your Freelance Journey
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl">
          Discover top freelancers, hire with confidence, and grow your business
          faster than ever.
        </p>
      </div>
    </div>
  );
};

export default Landing;
