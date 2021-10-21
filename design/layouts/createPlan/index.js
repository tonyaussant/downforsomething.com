import { useState } from 'react'

import { useAppContext } from 'contexts'
import useCreatePlanOnSubmit from 'hooks/createPlanOnSubmit'

const CreatePlan = () => {
	const { name, setName } = useAppContext()

	const [submit, setSubmit] = useState(false)

	const { error: errorMsg } = useCreatePlanOnSubmit({
		submit,
		setSubmit
	})

	return (
		<section className='main create-join'>
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
								onChange: (x) => setName(x?.target?.value),
								name: 'name',
								type: 'text',
								value: name
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
		</section>
	)
}

export default CreatePlan
