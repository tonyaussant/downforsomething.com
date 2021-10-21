import { useEffect, useState } from 'react'

import fetcher from 'utils/fetcher'

const CreatePlanOnSubmitHook = ({
	name,
	planId,
	setPlanId,
	submit,
	setSubmit
}) => {
	const [errorMsg, setErrorMsg] = useState(null)

	console.log(name)

	useEffect(() => {
		if (submit) {
			if (name?.trim() && !planId) {
				;(async () => {
					const { data: planCreate, error: planCreateError } = await fetcher(
						'/api/plan/create/',
						{
							name: name?.trim()
						}
					)

					if (planCreateError) console.error(planCreateError)

					if (planCreate) setPlanId(planCreate.planId)
				})()
			} else {
				setSubmit(false)

				setErrorMsg('please enter a name')
			}
		}
	}, [submit])

	return { error: errorMsg }
}

export default CreatePlanOnSubmitHook
