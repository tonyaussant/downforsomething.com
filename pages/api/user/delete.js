import prisma from 'utils/prisma'

const DeleteUserApi = async (req, res) => {
	const file = 'DeleteUserApi'

	const { userId } = req.body

	if (!userId)
		return res.json({
			error: { code: 'missing_argument', file }
		})

	console.log(userId)

	try {
		await prisma.user.delete({
			where: {
				userId
			}
		})

		return
	} catch (err) {
		return res.json({
			error: { code: err, file }
		})
	}
}

export default DeleteUserApi
