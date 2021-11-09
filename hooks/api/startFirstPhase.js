import { useEffect } from 'react'

import fetcher from 'utils/fetcher'

const StartFirstPhaseApiHook = ({ planId, planStarted }) => {
	useEffect(() => {
		if (planStarted) {
			;(async () => {
				const { error: planUpdateError } = await fetcher('/api/plan/update/', {
					planId,
					data: { planStarted: true }
				})

				if (planUpdateError) console.error(planUpdateError)
			})()
		}
	}, [planStarted])
}

export default StartFirstPhaseApiHook
