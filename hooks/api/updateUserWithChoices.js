import { useEffect } from 'react'

import fetcher from 'utils/fetcher'

const UpdateUserWithChoicesApiHook = ({ optionsList, userId }) => {
	useEffect(() => {
		if (
			optionsList?.length &&
			optionsList?.length ===
				optionsList.filter((option) => option?.clicked)?.length
		) {
			;(async () => {
				const { error: userUpdateError } = await fetcher('/api/user/update/', {
					userId,
					data: {
						phase1Done: true
					}
				})

				if (userUpdateError) console.error(userUpdateError)
			})()
		}
	}, [optionsList])
}

export default UpdateUserWithChoicesApiHook
