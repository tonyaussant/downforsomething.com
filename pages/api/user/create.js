import prisma from 'utils/api/prisma'

const CreateUserApi = async (req, res) => {
	const file = 'CreateUserApi'

	const { planId, userId, name } = req.body

	if (!planId || !userId || !name)
		return res.json({
			error: { code: 'missing_argument', file }
		})

	try {
		await prisma.user.create({
			data: {
				Plan: { connect: { planId } },
				userId,
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
