import {Link} from 'react-router-dom';
import logo from '../../logo/logo.svg';

function Header() {
  return(
    <header className='header'>
      <div className='header__wrapper'>
        <img className='header__logo' src={logo} alt='down for something logo'/>

        <nav>
          <Link className='button header__button' to='/'>
            home
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;