import { useEffect } from 'react'

import fetcher from 'utils/fetcher'

const UpdatePlanWithUserChoicesApiHook = ({ optionsList, planData }) => {
	useEffect(() => {
		if (
			optionsList?.length &&
			optionsList?.length ===
				optionsList.filter((option) => option?.clicked)?.length
		) {
			;(async () => {
				const { error: planUpdateError } = await fetcher('/api/plan/update/', {
					planId: planData.planId,
					data: {
						option1Total: optionsList[0]?.picked
							? planData.option1Total + 1
							: undefined,
						option2Total: optionsList[1]?.picked
							? planData.option2Total + 1
							: undefined,
						option3Total: optionsList[2]?.picked
							? planData.option3Total + 1
							: undefined,
						option4Total: optionsList[3]?.picked
							? planData.option4Total + 1
							: undefined,
						option5Total: optionsList[4]?.picked
							? planData.option5Total + 1
							: undefined
					}
				})

				if (planUpdateError) console.error(planUpdateError)
			})()
		}
	}, [optionsList])
}

export default UpdatePlanWithUserChoicesApiHook
