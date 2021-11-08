import { useState } from 'react'

import useCreatePlanOnSubmit from 'hooks/api/createPlanOnSubmit'

const CreatePlanLayout = () => {
	const [displayName, setDisplayName] = useState('')
	const [submit, setSubmit] = useState(false)

	const { error: errorMsg } = useCreatePlanOnSubmit({
		displayName,
		submit,
		setSubmit
	})

	return (
		<main>
			<div className='main__wrapper'>
				<h1 className='title'>create a plan</h1>

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

						<p className='text create-join__error'>{errorMsg}</p>
					</div>

					<button
						{...{
							className: 'button create-join__button',
							onClick: () => setSubmit(true)
						}}
					>
						create plan
					</button>
				</div>
			</div>
		</main>
	)
}

export default CreatePlanLayout
