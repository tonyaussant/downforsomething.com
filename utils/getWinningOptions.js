const getWinningOptions = ({ planData }) => {
	const options = [
		{ option: 1, total: planData.option1Total },
		{ option: 2, total: planData.option2Total },
		{ option: 3, total: planData.option3Total },
		{ option: 4, total: planData.option4Total },
		{ option: 5, total: planData.option5Total }
	]

	const optionTotalArray = options.map((option) => option.total)

	const mostVotes = Math.max(...optionTotalArray)

	return options
		.filter((option) => option.total === mostVotes)
		.map((option) => option.option)
}

export default getWinningOptions
