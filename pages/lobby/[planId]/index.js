import { useAppContext } from 'contexts'

import Header from 'design/elements/header'

const LobbyPage = () => {
	const { name } = useAppContext()

	console.log(name)

	return (
		<div>
			<Header />
		</div>
	)
}

export default LobbyPage
