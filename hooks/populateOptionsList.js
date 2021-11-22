import { useEffect } from 'react'

const PopulateOptionsListHook = ({
	setOptionsList,
	phaseData,
	tiedOptions
}) => {
	useEffect(() => {
		setOptionsList(
			phaseData
				.filter((option) =>
					tiedOptions.length
						? tiedOptions.find((tiedOption) => tiedOption === option.option)
						: option
				)
				.map((option) => ({
					option: option.option,
					name: option.name,
					img: option.img,
					clicked: false,
					picked: false
				}))
		)
	}, [])
}

export default PopulateOptionsListHook
