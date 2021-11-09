import { useState } from 'react'

import PHASE_1_DATA from 'constants/phase1'
import useCheckIfUserDonePhase1 from 'hooks/checkIfUserDonePhase1'
import usePopulateOptionsList from 'hooks/populateOptionsList'
import useRestartPhaseForUser from 'hooks/restartPhaseForUser'
import useSetUserAsPhaseDone from 'hooks/api/setUserAsPhaseDone'
import useUpdatePlanWithUserChoices from 'hooks/api/updatePlanWithUserChoices'

import Directions from 'design/layouts/phases/firstPhase/Directions'
import Options from 'design/layouts/phases/options'
import Waiting from 'design/layouts/phases/waiting'

const FirstPhasePhasesLayout = ({
	currentUser,
	planData,
	restartPhase,
	setRestartPhase
}) => {
	const [optionsList, setOptionsList] = useState([])
	const [phaseStarted, setPhaseStarted] = useState(false)
	const [phaseFinished, setPhaseFinished] = useState(false)

	useCheckIfUserDonePhase1({ currentUser, setPhaseFinished, planData })

	usePopulateOptionsList({ setOptionsList, phaseData: PHASE_1_DATA })

	useRestartPhaseForUser({
		setOptionsList,
		phaseData: PHASE_1_DATA,
		restartPhase,
		setRestartPhase
	})

	useSetUserAsPhaseDone({
		currentUser,
		optionsList,
		phase1: true,
		setPhaseFinished
	})

	useUpdatePlanWithUserChoices({ optionsList, planData })

	return (
		<>
			{!phaseStarted && !phaseFinished && (
				<Directions {...{ currentUser, setPhaseStarted }} />
			)}

			{phaseStarted && !phaseFinished && (
				<Options {...{ optionsList, setOptionsList }} />
			)}

			{phaseFinished && (
				<Waiting {...{ currentUser, phase: 'phase1', users: planData.Users }} />
			)}
		</>
	)
}

export default FirstPhasePhasesLayout
