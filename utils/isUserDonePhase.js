const isUserDonePhase = ({ currentPhase, currentUser, userData }) => {
	console.log(userData.find((user) => user.userId === currentUser.userId))

	return userData.find((user) => user.userId === currentUser.userId)?.[
		`${currentPhase}Done`
	]
}

export default isUserDonePhase
