import UserJoined from 'design/layouts/lobby/UserJoined'

const LobbyLayout = ({ planId, users }) => (
	<section className='main waiting'>
		<div className='main__wrapper'>
			<h1 className='title waiting__title'>plan code: {planId}</h1>
			<h2 className='sub-title waiting__title'>
				share your plan code with others, and press start when everyone has
				joined
			</h2>

			<ul className='list'>
				{users?.map((user) => (
					<UserJoined
						{...{
							key: user.userId,
							name: user.name
						}}
					/>
				))}
			</ul>

			<button className='button' onClick={() => this.startPlan()}>
				start
			</button>
		</div>
	</section>
)

export default LobbyLayout
