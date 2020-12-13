import {Link} from 'react-router-dom';
import Header from './children/Header';

function Join() {
  return(
    <div>
      <Header/>
      <div>Join</div>
      <Link to='/lobby'>
        Continue
      </Link>
    </div>
  );
}

export default Join;