import fetcher from 'utils/api/fetcher'

const restartPhaseForUser = async ({ currentPhase, userId }) => {
	const { error: userUpdateError } = await fetcher('/api/user/update/', {
		userId,
		data: {
			phase1Done: currentPhase === 'phase1' ? false : undefined,
			phase2Done: currentPhase === 'phase2' ? false : undefined
		}
	})

	if (userUpdateError) console.error(userUpdateError)
}

export default restartPhaseForUser
