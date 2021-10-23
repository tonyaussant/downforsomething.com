import { useEffect, useState } from 'react'
import { dequal } from 'dequal'

const UpdatePlanDataHook = ({ planGet }) => {
	const [planData, setPlanData] = useState(null)
	const [initialData, setInitialData] = useState(null)

	useEffect(() => {
		console.log('hello')

		if (!initialData || !dequal(planGet, initialData)) {
			console.log('there')

			setInitialData(planGet)

			setPlanData(planGet)
		}
	}, [planGet])

	return { data: planData }
}

export default UpdatePlanDataHook
