import Chippy3 from '/img/Chippy3.gif';

export function Chippy({ message }) {
	return (
		<div id="chippyBox" className="grid grid-cols-3 pt-5">
			<div className="chippy-suggestion chippy-suggestion-bottom-right col-span-2">
				{message}
			</div>
			<img
				id="chippy"
				src={Chippy3}
				alt='Helpful potato chip gif named Chippy, à la "Clippy", who suggests that user adds an item to their shopping list '
			></img>
		</div>
	);
}
