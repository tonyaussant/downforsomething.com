import Option from 'design/layouts/phases/options/Option'

const OptionsPhasesLayout = ({ optionsList, setOptionsList }) => (
	<main className='options'>
		<ul className='options__list'>
			{optionsList
				?.filter((option) => !option.clicked)
				?.map((option, index) => (
					<Option
						{...{
							key: index,
							img: option.img,
							name: option.name,
							option: option.option,
							setOptionsList
						}}
					/>
				))}
		</ul>
	</main>
)

export default OptionsPhasesLayout
