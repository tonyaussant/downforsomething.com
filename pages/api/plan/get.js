import prisma from 'utils/prisma'
import planSelect from 'utils/planSelect'

const GetPlanApi = async (req, res) => {
	const file = 'GetPlanApi'

	const { where } = req.query

	if (!where)
		return res.json({
			error: { code: 'missing_argument', file }
		})

	try {
		const planGet = await prisma.plan.findUnique({
			where: {
				planId: JSON.parse(where).planId
			},
			select: planSelect
		})

		return res.json({ data: planGet })
	} catch (err) {
		return res.json({
			error: { code: err, file }
		})
	}
}

export default GetPlanApi
