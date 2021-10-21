import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useAppContext } from 'contexts'
import fetcher from 'utils/fetcher'

const CreatePlanOnSubmitHook = ({ submit, setSubmit }) => {
	const router = useRouter()

	const { name, setPlanId } = useAppContext()

	const [errorMsg, setErrorMsg] = useState(null)

	useEffect(() => {
		if (submit) {
			if (name?.trim()) {
				;(async () => {
					const { data: planCreate, error: planCreateError } = await fetcher(
						'/api/plan/create/',
						{
							name: name?.trim()
						}
					)

					if (planCreateError) console.error(planCreateError)

					if (planCreate) {
						setPlanId(planCreate.planId)

						router.push(`/lobby/${planCreate.planId}`)
					}
				})()
			} else {
				setSubmit(false)

				setErrorMsg('please enter a name')
			}
		}
	}, [submit])

	return { error: errorMsg }
}

export default CreatePlanOnSubmitHook
