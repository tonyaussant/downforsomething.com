import { useEffect } from 'react'

import fetcher from 'utils/fetcher'

const CreatePlanOnSubmitHook = ({
	setErrorMsg,
	name,
	planCode,
	setPlanCode
}) => {
	useEffect(() => {
		if (name.trim() && !planCode) {
			;(async () => {
				const { data: planCodeCreate } = await fetcher('api/planCode/create/', {
					name
				})

				if (planCodeCreate) setPlanCode(planCodeCreate.planCode)
			})()
		} else setErrorMsg('please enter a name')
	}, [name])
}

export default CreatePlanOnSubmitHook
