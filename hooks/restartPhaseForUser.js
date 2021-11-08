import { useEffect } from 'react'

const RestartPhaseForUserHook = ({
	setOptionsList,
	phaseData,
	restartPhase,
	setRestartPhase
}) => {
	useEffect(() => {
		if (restartPhase) {
			setOptionsList(
				phaseData.map((option) => ({
					option: option.option,
					name: option.name,
					img: option.img,
					clicked: false,
					picked: false
				}))
			)

			setRestartPhase(false)
		}
	}, [restartPhase])
}

export default RestartPhaseForUserHook
