import prisma from 'utils/prisma'

const UpdateUserApi = async (req, res) => {
	const file = 'UpdateUserApi'

	const { userId, data } = req.body

	if (!userId || !data)
		return res.json({
			error: { code: 'missing_argument', file }
		})

	try {
		const userUpdate = await prisma.user.update({
			where: {
				userId
			},
			data
		})

		return res.json({ data: userUpdate })
	} catch (err) {
		return res.json({
			error: { code: err, file }
		})
	}
}

export default UpdateUserApi
