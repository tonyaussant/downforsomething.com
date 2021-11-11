import { useEffect } from 'react'

import fetcher from 'utils/api/fetcher'

const SetUserAsPhaseDoneApiHook = ({
	currentUser,
	optionsList,
	phase1 = false,
	phase2 = false,
	setPhaseFinished
}) => {
	useEffect(() => {
		if (
			optionsList?.length &&
			optionsList?.length ===
				optionsList.filter((option) => option?.clicked)?.length
		) {
			;(async () => {
				const { error: userUpdateError } = await fetcher('/api/user/update/', {
					userId: currentUser.userId,
					data: {
						phase1Done: phase1 || undefined,
						phase2Done: phase2 || undefined
					}
				})

				if (userUpdateError) console.error(userUpdateError)

				if (!userUpdateError) setPhaseFinished(true)
			})()
		}
	}, [optionsList])
}

export default SetUserAsPhaseDoneApiHook
