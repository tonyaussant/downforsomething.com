const isUserDonePhase = ({ currentPhase, currentUser, userData }) =>
	userData.find((user) => user.userId === currentUser.userId)?.[
		`${currentPhase}Done`
	]

export default isUserDonePhase
