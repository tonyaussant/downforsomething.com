import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import randomize from 'randomatic';
import Header from './children/Header';

class Initiate extends Component {
  state = {
    roomCode: '',
    displayName: ''
  }

  createRoom = event => {
    event.preventDefault();
    const displayName = event.target.name.value;
    const roomCode = randomize('aA0', 6);
    this.setState({
      roomCode: roomCode,
      displayName: displayName
    });
  }

  render() {
    if(this.state.roomCode) {
      return <Redirect to={`/lobby/${this.state.roomCode}/${this.state.displayName}`}/>
    } else {
      return(
        <div>
          <Header/>
          <div>Create New Room</div>
          <form action="submit" onSubmit={this.createRoom}>
            <label htmlFor="name">Display Name:</label>
            <input type="text" name="name"/>
            <input type="submit" value="Create Room"/>
          </form>
        </div>
      );
    }
  }
}

export default Initiate;