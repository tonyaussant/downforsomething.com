import { useState } from 'react'

import useStartFirstPhase from 'hooks/api/startFirstPhase'

import UserJoined from 'design/layouts/lobby/UserJoined'

const LobbyLayout = ({ currentUser, planData }) => {
	const [planStarted, setPlanStarted] = useState(false)

	useStartFirstPhase({ planData, planStarted })

	return (
		<main className='waiting'>
			<div className='main__wrapper'>
				<h1 className='title waiting__title'>plan code: {planData.planId}</h1>
				<h2 className='sub-title waiting__title'>
					share your plan code with others, and press start when everyone has
					joined
				</h2>

				<ul className='list'>
					{planData.Users.map((user) => (
						<UserJoined
							{...{
								key: user.userId,
								isUser: currentUser.userId === user.userId,
								name: user.name
							}}
						/>
					))}
				</ul>

				<button
					{...{ className: 'button', onClick: () => setPlanStarted(true) }}
				>
					start
				</button>
			</div>
		</main>
	)
}

export default LobbyLayout
