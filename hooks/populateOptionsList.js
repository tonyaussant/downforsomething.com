import { useEffect } from 'react'

const PopulateOptionsListHook = ({ setOptionsList, phaseData }) => {
	useEffect(() => {
		setOptionsList(
			phaseData.map((option) => ({
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
