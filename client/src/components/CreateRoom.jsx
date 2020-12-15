import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import randomize from 'randomatic';
import Header from './children/Header';

class CreateRoom extends Component {
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
          <section className='main create-join'>
          <h1 className='title'>create a plan</h1>
            <form className='create-join__form' action="submit" onSubmit={this.createRoom}>
              <label className='text' htmlFor="name">display name:</label>
              <input className='input create-join__input' type="text" name="name"/>
              <input className='button button--body create-join__button' type="submit" value="Create Room"/>
            </form>
          </section>
        </div>
      );
    }
  }
}

export default CreateRoom;