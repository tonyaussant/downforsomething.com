import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import randomize from 'randomatic'

import fetcher from 'utils/fetcher'

const CreatePlanOnSubmitHook = ({ displayName, submit, setSubmit }) => {
	const router = useRouter()

	const [errorMsg, setErrorMsg] = useState(null)

	const name = displayName?.trim()
	const userId = randomize('aA0', 6)

	useEffect(() => {
		if (submit) {
			if (name) {
				;(async () => {
					const { data: planCreate, error: planCreateError } = await fetcher(
						'/api/plan/create/',
						{
							name,
							userId
						}
					)

					if (planCreateError) console.error(planCreateError)

					if (planCreate) {
						Cookies.set('name', name, { expires: 1 })
						Cookies.set('id', userId, { expires: 1 })

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
