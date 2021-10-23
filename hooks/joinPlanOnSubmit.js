import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import randomize from 'randomatic'

import fetcher from 'utils/fetcher'

const JoinPlanOnSubmitHook = ({ displayName, planId, submit, setSubmit }) => {
	const router = useRouter()

	const [nameErrorMsg, setNameErrorMsg] = useState(null)
	const [planErrorMsg, setPlanErrorMsg] = useState(null)

	const name = displayName?.trim()
	const userId = randomize('aA0', 6)

	useEffect(() => {
		if (submit) {
			if (name) {
				;(async () => {
					const { data: planCreate, error: planCreateError } = await fetcher(
						'/api/plan/get/',
						{
							planId
						}
					)

					if (planCreateError) {
						console.error(planCreateError)

						setSubmit(false)

						setPlanErrorMsg('plan code not found')
					}

					if (planCreate) {
						if (Cookies.get('name') && name !== Cookies.get('name')) {
							;(async () => {
								const { error: userDeleteError } = await fetcher(
									'/api/user/delete/',
									{
										userId: Cookies.get('id')
									}
								)

								if (userDeleteError) console.error(userDeleteError)
							})()
						}

						;(async () => {
							const { error: userCreateError } = await fetcher(
								'/api/user/create/',
								{
									name,
									planId,
									userId
								}
							)

							if (userCreateError) console.error(userCreateError)
						})()

						Cookies.set('name', name, { expires: 1 })
						Cookies.set('id', userId, { expires: 1 })

						router.push(`/plan/${planCreate.planId}`)
					}
				})()
			} else {
				setSubmit(false)

				setNameErrorMsg('please enter a name')
			}
		}
	}, [submit])

	return { nameError: nameErrorMsg, planError: planErrorMsg }
}

export default JoinPlanOnSubmitHook
