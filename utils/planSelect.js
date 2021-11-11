import userSelect from 'utils/userSelect'

const planSelect = {
	planId: true,
	Users: {
		select: userSelect
	},
	option1Total: true,
	option2Total: true,
	option3Total: true,
	option4Total: true,
	option5Total: true,
	phase1Winner: true,
	phase2Winner: true,
	planStarted: true,
	tiedOptions: true
}

export default planSelect
