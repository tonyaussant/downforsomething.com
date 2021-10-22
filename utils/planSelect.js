import userSelect from 'utils/userSelect'

const planSelect = {
	planId: true,
	Users: {
		select: userSelect
	},
	choicesTotal: true,
	choicesNeeded: true,
	option1Total: true,
	option2Total: true,
	option3Total: true,
	option4Total: true,
	option5Total: true,
	phase1Winner: true,
	phase2Winner: true,
	retryTotal: true,
	randomTotal: true,
	tieBreakersTotal: true,
	tieBreakersNeeded: true,
	planStarted: true
}

export default planSelect
