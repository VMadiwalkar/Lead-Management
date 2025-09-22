import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/"); // redirect to login
  };

  return (
    <span
      onClick={handleLogout}
      className="text-red-500 cursor-pointer hover:underline"
    >
      Logout
    </span>
  );
};

export default LogoutButton;
