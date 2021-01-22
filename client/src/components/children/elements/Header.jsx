import {Link} from 'react-router-dom';
import logo from '../../../logo/logo.svg';

function Header(props) {
  const {phase, restartPhase} = props;

  if(phase) {
    return(
      <header className='header'>
        <div className='header__wrapper'>
          <img className='header__logo' src={logo} alt='down for something logo'/>
  
          <nav>
            <button className='button header__button header__button--restart' onClick={() => restartPhase(phase)}>restart</button>
            <Link className='button header__button' to='/'>
              main
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
            <Link className='button header__button' to='/'>
              main
            </Link>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;