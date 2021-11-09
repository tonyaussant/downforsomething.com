import FirstPhase from 'design/layouts/phases/firstPhase'

const PhasesLayout = ({
	name,
	planId,
	planData,
	restartPhase,
	setRestartPhase,
	userId
}) => (
	<FirstPhase
		{...{ name, planId, planData, restartPhase, setRestartPhase, userId }}
	/>
)

export default PhasesLayout
