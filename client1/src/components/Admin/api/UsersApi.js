import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
export const getAllUsers = async () => {
  try {
    const res = await axios.get(
      "https://freelancingplatform.onrender.com:3001/api/jobs"
    );
    return res.data;
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    return [];
  }
};

export const deleteUserById = async (id) => {
  try {
    await axios.delete(`${apiUrl}/api/jobs/${id}`);
  } catch (err) {
    console.error("Failed to delete job:", err);
  }
};
