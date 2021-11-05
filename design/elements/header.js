import { useRouter } from 'next/router'

const HeaderElement = ({ setRestartPhase, showRestart = false }) => {
	const router = useRouter()

	return (
		<header className='header'>
			<div className='header__wrapper'>
				<img
					{...{
						className: 'header__logo',
						src: '/logo.svg',
						alt: 'down for something logo'
					}}
				/>

				<nav>
					{showRestart && (
						<button
							{...{
								className: 'button header__button header__button--restart',
								onClick: () => setRestartPhase(true)
							}}
						>
							restart
						</button>
					)}

					<button
						{...{
							className: 'button header__button',
							onClick: () => router.push('/')
						}}
					>
						main
					</button>
				</nav>
			</div>
		</header>
	)
}

export default HeaderElement
