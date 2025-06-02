import axios from "axios";

export const getAllUsers = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/jobs");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    return [];
  }
};

export const deleteUserById = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/api/jobs/${id}`);
  } catch (err) {
    console.error("Failed to delete job:", err);
  }
};
