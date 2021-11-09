import FirstPhase from 'design/layouts/phases/firstPhase'

const PhasesLayout = ({
	currentUser,
	planData,
	restartPhase,
	setRestartPhase
}) => (
	<FirstPhase {...{ currentUser, planData, restartPhase, setRestartPhase }} />
)

export default PhasesLayout
