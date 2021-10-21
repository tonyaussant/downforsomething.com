import { useRouter } from 'next/router'

const HeaderElement = ({ phase, restartPhase }) => {
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
					{phase && (
						<button
							{...{
								className: 'button header__button header__button--restart',
								onClick: () => restartPhase(phase)
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
