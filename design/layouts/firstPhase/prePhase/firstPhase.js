const PrePhasePhasesLayout = () => (
	<main className='directions'>
		<div className='main__wrapper'>
			<h1 className='sub-title directions__text'>{`hey ${displayName},`}</h1>
			<h2 className='sub-title directions__text directions__text--normal'>
				you will now be given some options for what your group wants to do
				together
			</h2>
			<h2 className='sub-title directions__text directions__text--normal'>
				select "i'm in" for as many options that you are up for
			</h2>

			<button className='button directions__button' onClick={() => loadPage()}>
				start
			</button>
		</div>
	</main>
)

export default PrePhasePhasesLayout
