import React from 'react';
import { Link} from 'react-router-dom';
import Logo from './Logo';
import '../Sass/Navbar.scss';
import { FaUserCircle,FaUsers } from 'react-icons/fa';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-section logo-section">
      <Link to="/home" className="link">
        <Logo />
        </Link>
      </div>
      <div className="navbar-section">
      <Link to="/friend" className="link">
        <FaUsers className="profile-icon" />
      </Link>
      <Link to="/profile" className="link">
      <FaUserCircle className="profile-icon" />
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;

