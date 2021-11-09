import { useEffect } from 'react'

import fetcher from 'utils/fetcher'

const SetUserAsPhaseDoneApiHook = ({
	currentUser,
	optionsList,
	phase1,
	phase2,
	tieBreaker
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
						phase1Done: phase1,
						phase2Done: phase2,
						tieBreakerDone: tieBreaker
					}
				})

				if (userUpdateError) console.error(userUpdateError)
			})()
		}
	}, [optionsList])
}

export default SetUserAsPhaseDoneApiHook
