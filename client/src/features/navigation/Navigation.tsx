import { Link } from "react-router-dom";
import Logout from "../loginRegister/Logout";

const Navigation = () => {
  return (
    <nav>
      <Link to="/dashboard">
        <button className="navButton">Home</button>
      </Link>
      <Logout />
    </nav>
  );
};

export default Navigation;
