import { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Cookies from 'js-cookie'

import fetcher from 'utils/fetcher'
import useUpdatePlanData from 'hooks/updatePlanData'

import Lobby from 'design/layouts/lobby'
import Phases from 'design/layouts/phases'
import Header from 'design/elements/header'
import Loading from 'design/elements/loading'

const PlanPage = () => {
	const router = useRouter()

	const [restartPhase, setRestartPhase] = useState(false)

	const name = Cookies.get('name')
	const planId = router.query.planId

	const { data: planGet } = useSWR(
		`/api/plan/get?where=${JSON.stringify({ planId })}`,
		fetcher,
		{
			refreshInterval: 1000
		}
	)

	const { data: planData } = useUpdatePlanData({ planGet })

	if (!planData) return <Loading />

	return (
		<>
			<Header
				{...{
					setRestartPhase,
					showRestart: planData?.planStarted ? true : false
				}}
			/>

			{!planData?.planStarted && (
				<Lobby {...{ planId, users: planData?.Users }} />
			)}

			{planData?.planStarted && (
				<Phases
					{...{ name, planId, planData, restartPhase, setRestartPhase }}
				/>
			)}
		</>
	)
}

export default PlanPage
