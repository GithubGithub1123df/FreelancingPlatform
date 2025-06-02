import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem("userType");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-danger text-white fw-bold"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
