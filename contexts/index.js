import { createContext, useContext, useState } from 'react'

const Context = createContext(null)

export const AppProvider = ({ children }) => {
	const [name, setName] = useState('')
	const [planId, setPlanId] = useState(null)

	return (
		<Context.Provider
			{...{
				value: {
					name,
					setName,
					planId,
					setPlanId
				}
			}}
		>
			{children}
		</Context.Provider>
	)
}

export const useAppContext = () => useContext(Context)
