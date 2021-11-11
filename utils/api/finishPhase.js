import fetcher from 'utils/api/fetcher'

const finishPhase = async ({ currentPhase, planId, winningOption }) => {
	const { error: planUpdateError } = await fetcher('/api/plan/update/', {
		planId,
		data: {
			option1Total: 0,
			option2Total: 0,
			option3Total: 0,
			option4Total: 0,
			option5Total: 0,
			phase1Winner: currentPhase === 'phase1' ? winningOption : undefined,
			phase2Winner: currentPhase === 'phase2' ? winningOption : undefined,
			tiedOptions: null
		}
	})

	if (planUpdateError) console.error(planUpdateError)
}

export default finishPhase
