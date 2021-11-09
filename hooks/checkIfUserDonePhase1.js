import { useEffect } from 'react'

import isUserDonePhase from 'utils/isUserDonePhase'

const CheckIfUserDonePhase1Hook = ({
	currentPhase = 'phase1',
	currentUser,
	setPhaseFinished,
	planData
}) => {
	useEffect(() => {
		if (
			isUserDonePhase({ currentPhase, currentUser, userData: planData.Users })
		)
			setPhaseFinished(true)
	}, [planData])
}

export default CheckIfUserDonePhase1Hook
