import FirstPhase from 'design/layouts/phases/firstPhase'

const PhasesLayout = ({
	name,
	planId,
	planData,
	restartPhase,
	setRestartPhase
}) => (
	<FirstPhase {...{ name, planId, planData, restartPhase, setRestartPhase }} />
)

export default PhasesLayout
