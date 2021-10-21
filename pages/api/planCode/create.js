import prisma from 'utils/prisma'

const planCodeCreateApi = async (req, res) => {
	const file = 'planCodeCreateApi'

	await prisma.plans.create({
		data: {
			planCode: planCode,
			users: {
				create: [
					{
						name: displayName,
					},
				],
			},
		},
	})
}

export default planCodeCreateApi
