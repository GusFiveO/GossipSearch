from fastapi import HTTPException
import feedparser
from datetime import datetime
import numpy as np
import pickle
from sentence_transformers import SentenceTransformer
from utils import sanitize_text_with_regex

model = SentenceTransformer("msmarco-distilbert-dot-v5")


def extract_relevant_info(rss_uri):
    feed = feedparser.parse(rss_uri)
    articles = []
    embeddings = []

    for entry in feed.entries:
        thumbnail = entry.get("media_content", [{"url": "No content"}])
        description = entry.get("description", "No description")
        content = entry.get("content", [{"value": "No content"}])
        sanitized_content = sanitize_text_with_regex(
            content[0].get("value", "No content")
        )
        input_date = entry.get("published", "No date")
        input_date = datetime.strptime(input_date, "%a, %d %b %Y %H:%M:%S %z")

        output_date = input_date.strftime("%d/%m/%Y à %H:%M")

        embedding = model.encode(sanitized_content)

        article = {
            "title": entry.get("title", "No title"),
            "link": entry.get("link", "#"),
            "description": description,
            "thumbnailUrl": thumbnail[0]["url"],
            "content": sanitized_content,
            "pubDate": output_date,
        }

        articles.append(article)
        embeddings.append(embedding)

    return articles, embeddings


def create_dataset():
    rss_uris = [
        "https://public.fr/feed",
        "https://www.public.fr/people/feed",
        "https://www.public.fr/tele/feed",
        "https://www.public.fr/mode/feed",
        "https://www.public.fr/people/familles-royales/feed",
        "https://vsd.fr/actu-people/feed/",
        "https://vsd.fr/tele/feed/",
        "https://vsd.fr/societe/feed/",
        "https://vsd.fr/culture/feed/",
        "https://vsd.fr/loisirs/feed/",
    ]
    all_articles = []
    all_embeddings = []
    for uri in rss_uris:
        try:
            articles, embeddings = extract_relevant_info(uri)
            all_articles.extend(articles)
            all_embeddings.extend(embeddings)
        except Exception as e:
            raise HTTPException(status_code=404, detail="Error while creating dataset")

    embeddings_array = np.array(all_embeddings)

    with open("/app/data/articles.pkl", "wb") as f:
        pickle.dump(all_articles, f)

    with open("/app/data/embeddings.pkl", "wb") as f:
        pickle.dump(embeddings_array, f)

    return {"message": f"Dataset created with {len(all_articles)} articles."}
