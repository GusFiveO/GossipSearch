import { KeyboardEvent, useContext, useState } from "react" 
import { MyContext } from "../context/context";

export function SearchBar() {
	const { setArticles } = useContext(MyContext);

	const [searchQuery, setSearchQuery] = useState<string>("")


	const sendQuery = (query: string) => {
		const apiUrl = process.env.REACT_APP_API_URL as string
		fetch(`${apiUrl}/query/`, {
			headers: {
				"Content-Type": "application/json",
			  },
			method: "POST",
			body: JSON.stringify({ query: query })
		})
			.then(res => res.json())
			.then(data => setArticles(data.articles))
	}


	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			sendQuery(searchQuery)
		}
	}

	return ( 
	<div className='max-w-md mx-auto'>
		<div className="relative flex items-center w-full h-12 rounded-lg shadow-md focus-within:shadow-lg bg-white overflow-hidden">
			<button className="grid place-items-center h-full w-12 text-gray-300" onClick={() => sendQuery(searchQuery)}>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</button>

			<input
			className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
			type="text"
			id="search"
			placeholder="Search something.."
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
			onKeyDown={handleKeyDown} /> 
		</div>
	</div>
	)
}