import prisma from 'utils/prisma'

const CreatePlanApi = async (req, res) => {
	const file = 'CreatePlanApi'

	const { name } = req.body

	const { data: planCodeCreate } = await prisma.plans.create({
		data: {
			planCode: planCode,
			users: {
				create: [
					{
						name
					}
				]
			}
		}
	})
}

export default CreatePlanApi
