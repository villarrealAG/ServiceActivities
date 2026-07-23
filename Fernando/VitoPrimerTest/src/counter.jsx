import { useState } from 'react'

export function Counter() {
	const [counter, setCounter] = useState(0)

	return (
		<button type="button" onClick={() => setCounter((count) => count + 1)}>
			Picale {counter}
		</button>
	)
}

export function Likes() {
	const [like, setPro] = useState(false)
	return (
		<button type="button" onClick={() => setPro((!like) )}>
			 {like ? "PRO":"NOOB"}
		</button>
	)
}
