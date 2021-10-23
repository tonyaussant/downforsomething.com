import { useState } from 'react'

import useJoinPlanOnSubmit from 'hooks/joinPlanOnSubmit'

const JoinPlanLayout = () => {
	const [displayName, setDisplayName] = useState('')
	const [planId, setPlanId] = useState('')
	const [submit, setSubmit] = useState(false)

	const { nameError: nameErrorMsg, planError: planErrorMsg } =
		useJoinPlanOnSubmit({
			displayName,
			planId,
			submit,
			setSubmit
		})

	return (
		<section className='main create-join'>
			<div className='main__wrapper'>
				<h1 className='title'>join a plan</h1>

				<div className='create-join__wrapper'>
					<label className='text' htmlFor='name'>
						display name:
					</label>

					<div className='create-join__input-box'>
						<input
							{...{
								className: 'input create-join__input',
								onChange: (x) => setDisplayName(x?.target?.value),
								name: 'name',
								type: 'text',
								value: displayName
							}}
						/>

						<p className='text create-join__error'>{nameErrorMsg}</p>
					</div>

					<label className='text' htmlFor='name'>
						plan code:
					</label>

					<div className='create-join__input-box'>
						<input
							{...{
								className: 'input create-join__input',
								onChange: (x) => setPlanId(x?.target?.value),
								name: 'planId',
								type: 'text',
								value: planId
							}}
						/>

						<p className='text create-join__error'>{planErrorMsg}</p>
					</div>

					<button
						{...{
							className: 'button create-join__button',
							onClick: () => setSubmit(true)
						}}
					>
						join plan
					</button>
				</div>
			</div>
		</section>
	)
}

export default JoinPlanLayout
