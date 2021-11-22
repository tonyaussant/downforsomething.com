import { useEffect, useState } from 'react'

import finishPhase from 'utils/api/finishPhase'
import getWinningOptions from 'utils/getWinningOptions'
import isUserDonePhase from 'utils/isUserDonePhase'

const ProcessEndOfPhase1ApiHook = ({ planData, setRestartPhase }) => {
	const [tiedOptions, setTiedOptions] = useState([])

	useEffect(() => {
		if (
			planData.Users.every((user) =>
				isUserDonePhase({
					currentPhase: 'phase1',
					currentUser: user,
					userData: planData.Users
				})
			) &&
			!planData?.phase1Winner
		) {
			const winningOptions = getWinningOptions({ planData })

			if (winningOptions.length === 1)
				finishPhase({
					currentPhase: 'phase1',
					planId: planData.planId,
					winningOption: winningOptions[0]
				})
			else {
				setTiedOptions(winningOptions)

				setRestartPhase(true)
			}
		}
	}, [planData.Users])

	return { data: tiedOptions }
}

export default ProcessEndOfPhase1ApiHook
