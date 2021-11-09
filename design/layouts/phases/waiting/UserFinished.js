const UserFinishedWaitingPhasesLayout = ({ isUser, name }) => (
	<li className='text list__text'>{`${
		isUser ? 'you are' : `${name} is`
	} finished choosing`}</li>
)

export default UserFinishedWaitingPhasesLayout
