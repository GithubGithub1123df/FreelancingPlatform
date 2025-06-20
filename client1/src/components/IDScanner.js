import { useState } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const IDScanner = ({ userId }) => {
  const [image, setImage] = useState(null);
  const [idNumber, setIdNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setIdNumber("");
      setError("");
      setSuccess("");
    }
  };

  const scanImage = () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const timeout = setTimeout(() => {
      setLoading(false);
      setError("Scanning took too long. Please try again.");
    }, 15000); // 15-second timeout

    Tesseract.recognize(image, "eng")
      .then(({ data: { text } }) => {
        clearTimeout(timeout);
        setLoading(false);

        const match = text.match(
          /(FCN|FAN)?\s*(\d{4})\s*(\d{4})\s*(\d{4})\s*(\d{4})/
        );

        if (match) {
          const extractedNumber = match.slice(2).filter(Boolean).join("");
          if (extractedNumber.length === 16) {
            setIdNumber(extractedNumber);
            updateUserProfile(extractedNumber);
          } else {
            setError("Extracted number is not a valid 16-digit national ID.");
          }
        } else {
          setError("Could not find a valid national ID in the image.");
        }
      })
      .catch(() => {
        clearTimeout(timeout);
        setLoading(false);
        setError("Error scanning image. Please try again.");
      });
  };

  const updateUserProfile = async (id) => {
    try {
      if (!userId) {
        setError("User ID is not available.");
        return;
      }

      const response = await axios.put(`${apiUrl}/IDScanner/${userId}`, {
        nationalId: id,
      });

      if (response.status === 200) {
        setSuccess("Your profile was updated with the scanned ID!");
      } else {
        setError("Server error. Could not update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Make sure backend is running.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">ID Scanner</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="form-control mb-3"
      />
      <div className="d-flex align-items-center justify-content-center">
        {image && (
          <img
            src={image}
            alt="Uploaded ID"
            className="img-fluid form-control  mb-3"
            style={{ maxWidth: "300px" }}
          />
        )}
      </div>

      <button
        onClick={scanImage}
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? "Scanning..." : "Scan ID"}
      </button>

      <p className="text-danger mt-3">
        Make sure the image is clear and readable.
        <br />
        Do not store an id scanned by other App! it might fetch incorrect data
        <br />
        Capture the ID picure and upload here
      </p>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}
      {idNumber && (
        <div className="alert alert-info mt-3">
          <strong>Extracted ID:</strong> {idNumber}
        </div>
      )}
    </div>
  );
};

export default IDScanner;
