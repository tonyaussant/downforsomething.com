import { useState } from 'react'

import Header from './children/elements/Header'

const CreatePlanLayout = () => {
	const [planCode, setPlanCode] = useState(null)
	const [name, setName] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)

	// if(planCode) {
	//   return <Redirect to={`/lobby/${planCode}/${name}`}/>
	// } else {
	//   return(

	return (
		<div>
			<Header />
			<section className='main create-join'>
				<div className='main__wrapper'>
					<h1 className='title'>create a plan</h1>

					<form
						className='create-join__form'
						action='submit'
						onSubmit={(x) => setName(x?.name)}
					>
						<label className='text' htmlFor='name'>
							display name:
						</label>
						<div className='create-join__input-box'>
							<input
								className='input create-join__input'
								type='text'
								name='name'
							/>
							<p className='text create-join__error'>{errorMsg}</p>
						</div>

						<input
							className='button create-join__button'
							type='submit'
							value='create plan'
						/>
					</form>
				</div>
			</section>
		</div>
	)
}

export default CreatePlanLayout
