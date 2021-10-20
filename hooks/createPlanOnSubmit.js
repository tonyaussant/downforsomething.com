import { useEffect } from 'react'

const CreatePlanOnSubmitHook = ({ setErrorMsg, name, setPlanCode }) => {
	useEffect(() => {
		if (name.trim()) {
			setPlanCode(randomize('aA0', 6))
		} else setErrorMsg('please enter a name')
	}, [name])
}

export default CreatePlanOnSubmitHook
