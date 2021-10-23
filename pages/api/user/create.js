import prisma from 'utils/prisma'

const CreateUserApi = async (req, res) => {
	const file = 'CreateUserApi'

	const { name, planId, userId } = req.body

	if (!name || !planId || !userId)
		return res.json({
			error: { code: 'missing_argument', file }
		})

	try {
		await prisma.user.create({
			data: {
				userId,
				Plan: { connect: { planId } },
				name
			}
		})

		return
	} catch (err) {
		return res.json({
			error: { code: err, file }
		})
	}
}

export default CreateUserApi
