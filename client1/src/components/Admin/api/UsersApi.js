import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/jobs`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    return [];
  }
};

export const deleteUserById = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/jobs/${id}`);
  } catch (err) {
    console.error("Failed to delete job:", err);
  }
};
