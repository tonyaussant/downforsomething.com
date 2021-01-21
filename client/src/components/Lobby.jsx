import {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {io} from 'socket.io-client';
import Header from './children/elements/Header';
import Loading from './children/Loading';
import UserJoined from './children/elements/UserJoined';
const BACKEND_URL = process.env.NODE_ENV === "production"
? 'https://downforsomething.herokuapp.com' : process.env.REACT_APP_BACKEND_URL;

class Lobby extends Component {
  state = {
    users: [],
    startPlan: false
  }

  componentDidMount() {
    this.getUsers();
    const socket = io(`${BACKEND_URL}`);

    socket.emit('joinRoom', {
      planCode: this.props.match.params.planCode
    });

    socket.on('joinPlan', () => {
      this.getUsers();
    });

    socket.on('startPlan', () => {
      this.moveToPhase1();
    });
  }

  getUsers = () => {
    axios.get(`${BACKEND_URL}/api/plans/${this.props.match.params.planCode}/users`)
    .then((result) => {
      this.setState({
        users: result.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  startPlan = () => {
    const socket = io(`${BACKEND_URL}`);

    socket.emit('startPlan', {
      planCode: this.props.match.params.planCode
    });
  }

  moveToPhase1 = () => {
    this.setState({
      startPlan: true
    });
  }
  
  render() {
    const {planCode, name} = this.props.match.params;
    const {users, startPlan} = this.state;

    if(users[0]) {
      if(startPlan) {
        return(
          <Redirect to={`/phase1/${planCode}/${name}`}/>
        );
      } else {
        return(
          <div>
            <Header/>
            <section className='main lobby'>
              <div className='main__wrapper'>
                <h1 className='title lobby__title'>plan code: {planCode}</h1>
                <h2 className='sub-title lobby__title'>share your plan code with others, and press start when everyone has joined</h2>
      
                <ul className='demo'>
                  {users.map((user) => 
                  <UserJoined key={user.id} name={user.name}/>)}
                </ul>
      
                <button className='button' onClick={() => this.startPlan()}>start</button>
              </div>
            </section>
          </div>
        );
      } 
    } else {
      return(
        <Loading/>
      );
    }
  }
}

export default Lobby;