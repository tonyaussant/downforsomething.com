import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import fetcher from 'utils/fetcher'

const CreatePlanOnSubmitHook = ({ name, submit, setSubmit }) => {
	const router = useRouter()

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
						Cookies.set('name', name, { expires: 1 })

						router.push(`/plan/${planCreate.planId}`)
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
