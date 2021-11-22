import { useEffect } from 'react'

import restartPhaseForUser from 'utils/api/restartPhaseForUser'

const RestartPhaseHook = ({
	currentPhase,
	setOptionsList,
	phaseData,
	phaseFinished,
	setPhaseFinished,
	planData,
	restartPhase,
	setRestartPhase,
	tiedOptions
}) => {
	useEffect(() => {
		if (restartPhase) {
			setOptionsList(
				phaseData
					.filter((option) =>
						tiedOptions.length
							? tiedOptions.find((tiedOption) => tiedOption === option.option)
							: option
					)
					.map((option) => ({
						option: option.option,
						name: option.name,
						img: option.img,
						clicked: false,
						picked: false
					}))
			)

			if (phaseFinished) {
				planData.Users.forEach((user) =>
					restartPhaseForUser({ currentPhase, userId: user.userId })
				)

				setPhaseFinished(false)
			}

			setRestartPhase(false)
		}
	}, [restartPhase])
}

export default RestartPhaseHook
