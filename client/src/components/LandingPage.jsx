import {Link} from 'react-router-dom';
import logo from '../logo/logo.svg';

function LandingPage() {
  return(
    <div className='landing-page'>
      <img className='landing-page__logo' src={logo} alt='down for something logo'/>
      <h2 className='title landing-page__tagline'>a way to simplify making plans with groups</h2>

      <Link className='button landing-page__button' to='/createplan'>
        create a plan
      </Link>
      <Link className='button landing-page__button' to='/joinplan'>
        join a plan
      </Link>
    </div>
  );
}

export default LandingPage;