import { useEffect, useState } from 'react'
import { dequal } from 'dequal'

const UpdatePlanDataHook = ({ planGet }) => {
	const [planData, setPlanData] = useState(null)
	const [initialData, setInitialData] = useState(null)

	useEffect(() => {
		if (!initialData || !dequal(planGet, initialData)) {
			setInitialData(planGet)

			setPlanData(planGet)
		}
	}, [planGet])

	return { data: planData }
}

export default UpdatePlanDataHook
