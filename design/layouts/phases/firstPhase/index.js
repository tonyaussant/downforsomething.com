import { useState } from 'react'

import PHASE_1_DATA from 'constants/phase1'
import usePopulateOptionsList from 'hooks/populateOptionsList'
import useRestartPhaseForUser from 'hooks/restartPhaseForUser'
import useSetUserAsPhaseDone from 'hooks/api/setUserAsPhaseDone'
import useUpdatePlanWithUserChoices from 'hooks/api/updatePlanWithUserChoices'

import Directions from 'design/layouts/phases/firstPhase/Directions'
import Options from 'design/layouts/phases/Options'

const FirstPhasePhasesLayout = ({
	currentUser,
	planData,
	restartPhase,
	setRestartPhase
}) => {
	const [optionsList, setOptionsList] = useState([])
	const [phaseStarted, setPhaseStarted] = useState(false)

	usePopulateOptionsList({ setOptionsList, phaseData: PHASE_1_DATA })

	useRestartPhaseForUser({
		setOptionsList,
		phaseData: PHASE_1_DATA,
		restartPhase,
		setRestartPhase
	})

	useSetUserAsPhaseDone({ currentUser, optionsList, phase1: true })

	useUpdatePlanWithUserChoices({ optionsList, planData })

	return (
		<>
			{!phaseStarted && <Directions {...{ currentUser, setPhaseStarted }} />}

			{phaseStarted && <Options {...{ optionsList, setOptionsList }} />}
		</>
	)
}

export default FirstPhasePhasesLayout
