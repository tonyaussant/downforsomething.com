const OptionOptionsPhasesLayout = ({ img, name, option, setOptionsList }) => {
	return (
		<li className='option-card'>
			<div className='option-card__wrapper'>
				<h2 className='title option-card__title'>{name}</h2>

				<img {...{ className: 'gif option-card__gif', src: img, alt: name }} />

				<div className='option-card__button-box'>
					<button
						{...{
							className: 'button option-card__button',
							onClick: () =>
								setOptionsList((prev) =>
									prev.map((x) =>
										option === x.option
											? {
													...x,
													clicked: true,
													picked: true
											  }
											: x
									)
								)
						}}
					>
						i'm in
					</button>

					<button
						{...{
							className: 'button option-card__button',
							onClick: () =>
								setOptionsList((prev) =>
									prev.map((x) =>
										option === x.option
											? {
													...x,
													clicked: true
											  }
											: x
									)
								)
						}}
					>
						i'm out
					</button>
				</div>
			</div>
		</li>
	)
}

export default OptionOptionsPhasesLayout
