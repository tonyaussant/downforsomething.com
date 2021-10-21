import { useEffect } from 'react'
import useSwr from 'swr'

import fetcher from 'utils/fetcher'

const CreatePlanOnSubmitHook = ({
	setErrorMsg,
	name,
	planCode,
	setPlanCode,
}) => {
	useEffect(() => {
		if (name.trim() && !planCode) {
			;(async () => {
				const { data: planCodeCreate } = useSwr('api/planCode/create/', fetcher)

				if (planCodeCreate) setPlanCode(planCodeCreate.planCode)
			})()
		} else setErrorMsg('please enter a name')
	}, [name])
}

export default CreatePlanOnSubmitHook
