import { AppProvider } from 'contexts'

import 'design/styles/index.css'

function MyApp({ Component, pageProps }) {
	return (
		<AppProvider>
			<Component {...pageProps} />
		</AppProvider>
	)
}

export default MyApp
