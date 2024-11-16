import { Link } from "react-router-dom";
import Logout from "../loginRegister/Logout";

const Navigation = () => {
  return (
    <nav>
      <Link to="/dashboard">
        <button className="navButton">Home</button>
        <Link to="/review/all">
          <button className="navButton">My reviews</button>
        </Link>
        <Link to="/books/search">
          <button className="navButton">Add a book</button>
        </Link>
      </Link>
      <Logout />
    </nav>
  );
};

export default Navigation;
