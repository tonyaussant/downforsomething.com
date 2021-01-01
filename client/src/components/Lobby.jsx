import {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from './children/Header';
import UserName from './children/UserName';

class Lobby extends Component {
  state = {
    userNames: []
  }

  render() {
    const {user, planCode, name} = this.props.match.params;

    return(
      <div>
        <Header/>
        <section className='main lobby'>
          <div className='main__wrapper'>
            <h1 className='title lobby__title'>plan code: {planCode}</h1>
            <h2 className='sub-title lobby__title'>share your plan code with others, and press start when everyone has joined</h2>
  
            <ul className='demo'>
              <li className='text demo__link'>{`${name} has created a plan`}</li>
              {this.state.userNames.map((userName, index) => 
              <UserName key={index} name={userName}/>)}
            </ul>
  
            <Link className='button' to={`/directions/${user}/${planCode}/${name}`}>
              start
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default Lobby;