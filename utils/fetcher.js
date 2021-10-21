const fetcher = async (url, dataObj) => {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}

	const response = await fetch(url, {
		method: dataObj ? 'POST' : 'GET',
		headers,
		...(dataObj && { body: JSON.stringify(dataObj) })
	})

	const res = await response.json()

	if (dataObj) return res

	if (res?.error) throw res.error

	return res?.data
}

export default fetcher
