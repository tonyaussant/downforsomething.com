import {Link} from 'react-router-dom';
import logo from '../../logo/logo.svg';

function Header() {
  return(
    <div>
      <img className="header__logo" src={logo} alt="down for something logo"/>
      <Link to='/'>
        Home
      </Link>
    </div>
  );
}

export default Header;