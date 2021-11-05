import { useEffect } from 'react'

import fetcher from 'utils/fetcher'

const StartFirstPhaseHook = ({ planId, planStarted }) => {
	useEffect(() => {
		if (planStarted) {
			;(async () => {
				const { data: planUpdate, error: planUpdateError } = await fetcher(
					'/api/plan/update/',
					{
						planId,
						data: { planStarted: true }
					}
				)

				if (planUpdateError) console.error(planUpdateError)

				if (planUpdate) console.log(planUpdate)
			})()
		}
	}, [planStarted])
}

export default StartFirstPhaseHook
