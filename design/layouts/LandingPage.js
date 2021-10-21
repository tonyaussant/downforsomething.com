import { useRouter } from 'next/router'

const LandingPageLayout = () => {
	const router = useRouter()

	return (
		<div className='landing-page'>
			<img
				{...{
					className: 'landing-page__logo',
					src: 'logo.svg',
					alt: 'down for something logo'
				}}
			/>

			<h2 className='title landing-page__tagline'>
				a way to simplify making plans with groups
			</h2>

			<div
				{...{
					className: 'button landing-page__button',
					onClick: () => router.push('/createplan')
				}}
			>
				create a plan
			</div>

			<div className='button landing-page__button' to='/joinplan'>
				join a plan
			</div>
		</div>
	)
}

export default LandingPageLayout
