import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto sticky-footer">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-3 mb-md-0">
          <h5 className="fw-bold">Connect Services</h5>
          <p className="mb-1">
            Building a Comprehensive Web Platform that Provides Services to
            Clients
          </p>
          <small>
            &copy; {new Date().getFullYear()} Connect Services. All rights
            reserved.
          </small>
        </div>

        <div>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-white me-3 fs-5"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-white me-3 fs-5"
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-white me-3 fs-5"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-white fs-5"
          >
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
