import {Link} from 'react-router-dom';
import Hero from './children/Hero';

function LandingPage() {
  return(
    <div>
      <Hero/>
      <Link to='/initiate'>
        Initiate
      </Link>
      <Link to='/join'>
        Join
      </Link>
    </div>
  );
}

export default LandingPage;