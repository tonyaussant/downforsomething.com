const UserJoinedLobbyLayout = ({ isUser, name }) => (
	<li className='text list__text'>{`${
		isUser ? 'you are' : `${name} is`
	} down for something`}</li>
)

export default UserJoinedLobbyLayout
