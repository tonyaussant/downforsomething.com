import UserFinished from 'design/layouts/phases/waiting/UserFinished'

const WaitingPhasesLayout = ({ currentUser, phase, users }) => (
	<main className='waiting'>
		<div className='main__wrapper'>
			<h1 className='title waiting__title'>
				waiting for rest of group to choose
			</h1>

			<ul className='list'>
				{users
					.filter(
						(user) =>
							(phase === 'phase1' && user.phase1Done) ||
							(phase === 'phase2' && user.phase2Done)
					)
					.map((user) => (
						<UserFinished
							{...{
								key: user.userId,
								isUser: currentUser.userId === user.userId,
								name: user.name
							}}
						/>
					))}
			</ul>
		</div>
	</main>
)

export default WaitingPhasesLayout
