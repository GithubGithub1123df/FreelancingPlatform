const Freelancer = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return <h2 className="text-center">Welcome Freelancer {user.username}</h2>;
};

export default Freelancer;
