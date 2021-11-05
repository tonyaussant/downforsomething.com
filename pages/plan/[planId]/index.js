import { useRouter } from 'next/router'
import useSWR from 'swr'
import Cookies from 'js-cookie'

import fetcher from 'utils/fetcher'
import useUpdatePlanData from 'hooks/updatePlanData'

import Lobby from 'design/layouts/lobby'
import FirstPhase from 'design/layouts/firstPhase'
import Header from 'design/elements/header'
import Loading from 'design/elements/loading'

const PlanPage = () => {
	const router = useRouter()

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
			<Header />

			{!planData?.planStarted && (
				<Lobby {...{ planId, users: planData?.Users }} />
			)}

			{planData?.planStarted && <FirstPhase {...{ name, planId, planData }} />}
		</>
	)
}

export default PlanPage
