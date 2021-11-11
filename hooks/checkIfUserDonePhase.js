import { useEffect } from 'react'

import isUserDonePhase from 'utils/isUserDonePhase'

const CheckIfUserDonePhaseHook = ({
	currentPhase,
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

export default CheckIfUserDonePhaseHook
