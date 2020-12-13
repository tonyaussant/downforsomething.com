import {Link} from 'react-router-dom';
import Header from './children/Header';

function Initiate() {
  return(
    <div>
      <Header/>
      <div>Initiate</div>
      <Link to='/lobby'>
        Continue
      </Link>
    </div>
  );
}

export default Initiate;