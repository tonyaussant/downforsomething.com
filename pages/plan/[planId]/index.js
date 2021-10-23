import { useRouter } from 'next/router'
import useSWR from 'swr'
import Cookies from 'js-cookie'

import fetcher from 'utils/fetcher'
import useUpdatePlanData from 'hooks/updatePlanData'

import Lobby from 'design/layouts/lobby'
import Header from 'design/elements/header'

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

	return (
		<div>
			<Header />

			<Lobby {...{ planId, users: planData?.Users }} />
		</div>
	)
}

export default PlanPage
