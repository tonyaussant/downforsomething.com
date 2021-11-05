import randomize from 'randomatic'

import prisma from 'utils/prisma'

const CreatePlanApi = async (req, res) => {
	const file = 'CreatePlanApi'

	const { userId, name } = req.body
	const planId = randomize('aA0', 6)

	if (!userId || !name)
		return res.json({
			error: { code: 'missing_argument', file }
		})

	try {
		const planCreate = await prisma.plan.create({
			data: {
				planId,
				Users: {
					create: [
						{
							userId,
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
			error: { code: err, file }
		})
	}
}

export default CreatePlanApi
