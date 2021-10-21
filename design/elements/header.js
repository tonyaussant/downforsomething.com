const HeaderElement = ({ phase, restartPhase }) => {
	return (
		<header className='header'>
			<div className='header__wrapper'>
				<img
					className='header__logo'
					src='logo.svg'
					alt='down for something logo'
				/>

				<nav>
					{phase && (
						<button
							className='button header__button header__button--restart'
							onClick={() => restartPhase(phase)}
						>
							restart
						</button>
					)}

					<div className='button header__button' to='/'>
						main
					</div>
				</nav>
			</div>
		</header>
	)
}

export default HeaderElement
