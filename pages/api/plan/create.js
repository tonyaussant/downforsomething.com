import randomize from 'randomatic'

import prisma from 'utils/prisma'

const CreatePlanApi = async (req, res) => {
	const file = 'CreatePlanApi'

	const { name } = req.body
	const planId = randomize('aA0', 6)

	const { data: planCreate, error: planCreateError } = await prisma.plan.create(
		{
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
		}
	)

	if (!planCreate || planCreateError)
		return res.json({
			error: { code: planCreateError || 'unknown_error', file }
		})

	return res.json({ data: planCreate })
}

export default CreatePlanApi
