import prisma from 'utils/api/prisma'

const UpdatePlanApi = async (req, res) => {
	const file = 'UpdatePlanApi'

	const { planId, data } = req.body

	if (!planId || !data)
		return res.json({
			error: { code: 'missing_argument', file }
		})

	try {
		const planUpdate = await prisma.plan.update({
			where: {
				planId
			},
			data
		})

		return res.json({ data: planUpdate })
	} catch (err) {
		return res.json({
			error: { code: err, file }
		})
	}
}

export default UpdatePlanApi
