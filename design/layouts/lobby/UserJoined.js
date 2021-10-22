const UserJoinedLobbyLayout = ({ currentUser, name }) => {
	return (
		<li className='text list__text'>{`${
			currentUser ? `you're` : `${name} is`
		} down for something`}</li>
	)
}

export default UserJoinedLobbyLayout
