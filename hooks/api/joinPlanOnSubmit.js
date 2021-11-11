import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import randomize from 'randomatic'

import fetcher from 'utils/api/fetcher'

const JoinPlanOnSubmitApiHook = ({
	displayName,
	planId,
	submit,
	setSubmit
}) => {
	const router = useRouter()

	const [nameErrorMsg, setNameErrorMsg] = useState(null)
	const [planErrorMsg, setPlanErrorMsg] = useState(null)

	const name = displayName?.trim()
	const userId = randomize('aA0', 6)

	useEffect(() => {
		if (submit) {
			if (name && planId) {
				;(async () => {
					const { data: planGet, error: planGetError } = await fetcher(
						'/api/plan/get/',
						{
							planId
						}
					)

					if (planGetError) {
						console.error(planGetError)

						setSubmit(false)

						setPlanErrorMsg('plan code not found')
					}

					if (
						planGet?.planStarted &&
						!planGet.Users.find((user) => user.userId === Cookies.get('id'))
					) {
						setSubmit(false)

						setPlanErrorMsg('plan has already started')
					} else if (planGet) {
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

						router.push(`/plan/${planGet.planId}`)
					}
				})()
			} else if (!name) {
				setSubmit(false)

				setNameErrorMsg('please enter a name')
			} else {
				setSubmit(false)

				setPlanErrorMsg('please enter a plan code')
			}
		}
	}, [submit])

	return { nameError: nameErrorMsg, planError: planErrorMsg }
}

export default JoinPlanOnSubmitApiHook
