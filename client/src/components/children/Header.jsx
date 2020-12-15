import {Link} from 'react-router-dom';
import logo from '../../logo/logo.svg';

function Header(props) {

  if(props.roomCode) {
    return(
      <header className='header'>
        <div className='header__wrapper'>
          <img className='header__logo' src={logo} alt='down for something logo'/>

          <nav>
            <Link className='button button--header' to={`/lobby/${props.roomCode}/${props.displayName}`}>
              Restart
            </Link>

            <Link className='button button--header' to='/'>
              Home
            </Link>
          </nav>
        </div>
      </header>
    );
  } else {
    return(
      <header className='header'>
        <div className='header__wrapper'>
          <img className='header__logo' src={logo} alt='down for something logo'/>

          <nav>
            <Link className='button button--header' to='/'>
              Home
            </Link>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;