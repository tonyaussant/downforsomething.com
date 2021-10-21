import randomize from 'randomatic'

import prisma from 'utils/prisma'

const CreatePlanApi = async (req, res) => {
	const file = 'CreatePlanApi'

	const { name } = req.body
	const planId = randomize('aA0', 6)

	try {
		const planCreate = await prisma.plan.create({
			data: {
				planId,
				Users: {
					create: [
						{
							name
						}
					]
				}
			},
			select: { planId: true }
		})

		return res.json({ data: planCreate })
	} catch (err) {
		return res.json({
			error: { code: planCreateError, file }
		})
	}
}

export default CreatePlanApi
