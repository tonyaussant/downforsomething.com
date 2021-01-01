import {Link} from 'react-router-dom';
import Header from './children/Header';

function Directions(props) {
  const {user, planCode, name} = props.match.params;

  return (
    <div>
    <Header/>
    <section className='main'>
      <div className='main__wrapper'>
        <h1 className='sub-title paragraph'>{`hey ${name},`}</h1>
        <p className='sub-title paragraph'>you will now be given some options for what your group wants to do together</p>
        <p className='sub-title directions'>select "i'm in" for as many options that you are up for</p>

        <Link className='button' to={`/phase1/${user}/${planCode}/${name}`}>
          start
        </Link>
        </div>
      </section>
    </div>
  );
}

export default Directions;