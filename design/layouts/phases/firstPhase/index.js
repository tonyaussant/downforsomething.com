import { useState } from 'react'

import PHASE_1_DATA from 'constants/phase1'
import usePopulateOptionsList from 'hooks/populateOptionsList'
import useRestartPhaseForUser from 'hooks/restartPhaseForUser'
import useSetUserAsPhaseDone from 'hooks/api/setUserAsPhaseDone'
import useUpdatePlanWithUserChoices from 'hooks/api/updatePlanWithUserChoices'

import Directions from 'design/layouts/phases/firstPhase/Directions'
import Options from 'design/layouts/phases/Options'

const FirstPhasePhasesLayout = ({
	name,
	planId,
	planData,
	restartPhase,
	setRestartPhase,
	userId
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

	useSetUserAsPhaseDone({ optionsList, phase1: true, userId })

	useUpdatePlanWithUserChoices({ optionsList, planData, planId })

	return (
		<>
			{!phaseStarted && <Directions {...{ name, setPhaseStarted }} />}

			{phaseStarted && <Options {...{ optionsList, setOptionsList }} />}
		</>
	)
}

export default FirstPhasePhasesLayout
