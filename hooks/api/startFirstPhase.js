import { useEffect } from 'react'

import fetcher from 'utils/fetcher'

const StartFirstPhaseApiHook = ({ planId, planStarted, users }) => {
	useEffect(() => {
		if (planStarted) {
			;(async () => {
				const { error: planUpdateError } = await fetcher('/api/plan/update/', {
					planId,
					data: {
						choicesNeeded: users.length * 3,
						tieBreakersNeeded: users.length,
						planStarted: true
					}
				})

				if (planUpdateError) console.error(planUpdateError)
			})()
		}
	}, [planStarted])
}

export default StartFirstPhaseApiHook
