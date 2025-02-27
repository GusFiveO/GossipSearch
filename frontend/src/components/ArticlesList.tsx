import { useContext } from "react";
import { MyContext } from "../context/context";

export function ArticlesList() {
	const {articles} = useContext(MyContext)

	const navigate = (url: string) => {
		window.location.href = url
	}

	const articlesList = articles.map((item, index) => {
		return (
			<li key={index} className="grid text-left items-center w-96 text-wrap p-5 m-10 bg-white shadow-md hover:shadow-2xl rounded-lg"
			onClick={() => navigate(item.link)}>
				<img className="" alt={item.title} src={item.thumbnailUrl === "No content" ? "/default.webp" : item.thumbnailUrl}/>
					<div className="m-2  leading-5 font-extrabold">
						{item.title}
					</div>
				<div className="text-center font-thin">Publi&eacute; le {item.pubDate}</div>
			</li>
		)
	})
	return <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">{articlesList}</div>

}