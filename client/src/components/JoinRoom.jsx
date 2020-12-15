import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Header from './children/Header';

class JoinRoom extends Component {
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
          <section className='main create-join'>
            <h1 className='title'>join a plan</h1>
            <form className='create-join__form' action='submit' onSubmit={this.joinRoom}>
              <label className='text' htmlFor='name'>display name:</label>
              <input className='input create-join__input' type='text' name='name'/>
              <label className='text' htmlFor='name'>plan code:</label>
              <input className='input create-join__input' type='text' name='room'/>
              <input className='button button--body create-join__button' type='submit' value='join plan'/>
            </form>
          </section>
        </div>
      );
    }
  }
}

export default JoinRoom;