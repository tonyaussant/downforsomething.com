import {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {io} from 'socket.io-client';
import Header from './children/Header';
import UserName from './children/UserName';

class Lobby extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios.get(`http://localhost:8080/plans/${this.props.match.params.planCode}/users`)
    .then((result) => {
      this.setState({
        users: result.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const {user, planCode, name} = this.props.match.params;
    const {users} = this.state;
    const socket = io('http://localhost:8080');

    socket.emit('joinRoom', {
      planCode: planCode,
    });
    socket.on('userCreated', () => {
      this.getUsers();
    });

    if(users[0]) {
      return(
        <div>
          <Header/>
          <section className='main lobby'>
            <div className='main__wrapper'>
              <h1 className='title lobby__title'>plan code: {planCode}</h1>
              <h2 className='sub-title lobby__title'>share your plan code with others, and press start when everyone has joined</h2>
    
              <ul className='demo'>
                {users.map((user) => 
                <UserName key={user.socketID} name={user.name}/>)}
              </ul>
    
              <Link className='button' to={`/directions/${user}/${planCode}/${name}`}>
                start
              </Link>
            </div>
          </section>
        </div>
      );
    } else {
      return(
        <div>
          <Header/>

          <div className='main'>
            <h1 className='title main__wrapper'>loading</h1>
          </div>
        </div>
      );
    }
  }
}

export default Lobby;