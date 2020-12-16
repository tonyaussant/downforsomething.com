import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import randomize from 'randomatic';
import Header from './children/Header';

class CreatePlan extends Component {
  state = {
    planCode: '',
    name: ''
  }

  createPlan = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const planCode = randomize('aA0', 6);
    this.setState({
      planCode: planCode,
      name: name
    });
  }

  render() {
    if(this.state.planCode) {
      return <Redirect to={`/lobby/${this.state.planCode}/${this.state.name}`}/>
    } else {
      return(
        <div>
          <Header/>
          <section className='main create-join'>
            <div className='main__wrapper'>
              <h1 className='title'>create a plan</h1>

              <form className='create-join__form' action='submit' onSubmit={this.createPlan}>
                <label className='text' htmlFor='name'>display name:</label>
                <input className='input create-join__input' type='text' name='name'/>

                <input className='button create-join__button' type='submit' value='create plan'/>
              </form>
            </div>
          </section>
        </div>
      );
    }
  }
}

export default CreatePlan;