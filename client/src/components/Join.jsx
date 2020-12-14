import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Header from './children/Header';

class Join extends Component {
  state = {
    roomCode: '',
    displayName: ''
  }

  joinRoom = event => {
    event.preventDefault();
    const displayName = event.target.name.value;
    const roomCode = event.target.room.value;
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
          <div>Join Room</div>
          <form action="submit" onSubmit={this.joinRoom}>
            <label htmlFor="name">Display Name:</label>
            <input type="text" name="name"/>
            <label htmlFor="name">Room Code:</label>
            <input type="text" name="room"/>
            <input type="submit" value="Join Room"/>
          </form>
        </div>
      );
    }
  }
}

export default Join;