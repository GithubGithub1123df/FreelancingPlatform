import { useState } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";

const IDScanner = ({ userId }) => {
  const [image, setImage] = useState(null);
  const [idNumber, setIdNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setIdNumber("");
      setError("");
    }
  };

  const scanImage = () => {
    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");

    const timeout = setTimeout(() => {
      setLoading(false);
      setError("Scanning took too long. Please try again.");
    }, 7000);

    Tesseract.recognize(image, "eng")
      .then(({ data: { text } }) => {
        clearTimeout(timeout);
        setLoading(false);

        const match = text.match(
          /(FCN|FAN)\s*(\d{4})\s*(\d{4})\s*(\d{4})\s*(\d{4})|\s*(\d{8})\s*(\d{8})|\s*(\d{8})\s*(\d{4})\s*(\d{4})|\s*(\d{4})\s*(\d{4})\s*(\d{8})/i
        );

        if (match) {
          const extractedNumber = match.slice(2).filter(Boolean).join("");
          if (extractedNumber.length === 16) {
            setIdNumber(extractedNumber);
            updateUserProfile(extractedNumber);
          } else {
            setError("Please provide a valid national ID!");
          }
        } else {
          setError("Please provide a valid national ID!");
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
      const response = await axios.put(
        `http://localhost:3001/IDScanner/${userId}`,
        { nationalId: id }
      );
      if (response.status === 200) {
        alert("Your profile was updated with the scanned ID!");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>ID Scanner</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="form-control mb-3"
      />
      {image && (
        <img
          src={image}
          alt="Uploaded"
          className="img-fluid mb-3"
          style={{ maxWidth: "300px" }}
        />
      )}
      <button
        onClick={scanImage}
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? "Scanning..." : "Scan ID"}
      </button>

      <p className="text-danger mt-3">
        Image must be clear, close to camera, and easy to read!
      </p>
      <p className="text-primary">
        Crop the image so the ID fills the frame, and hold it upright.
      </p>

      {error && <p className="alert alert-danger mt-2">{error}</p>}
      {idNumber && (
        <div className="alert alert-success mt-2">
          <strong>ID Number:</strong> {idNumber}
        </div>
      )}
    </div>
  );
};

export default IDScanner;
