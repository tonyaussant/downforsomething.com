import { useState } from 'react'

import useCreatePlanOnSubmit from 'hooks/createPlanOnSubmit'

import Header from 'design/elements/header'

const CreatePlan = () => {
	const [name, setName] = useState('')
	const [submit, setSubmit] = useState(false)
	const [planId, setPlanId] = useState(null)

	const { error: errorMsg } = useCreatePlanOnSubmit({
		name,
		planId,
		setPlanId,
		submit
	})

	return (
		<div>
			<Header />
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

						<div
							{...{
								className: 'button create-join__button',
								onClick: () => setSubmit(true)
							}}
						>
							create plan
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default CreatePlan
