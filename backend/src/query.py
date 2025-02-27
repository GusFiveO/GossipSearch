import numpy as np
import pickle
from sentence_transformers import SentenceTransformer
from models import QueryRequest

model = SentenceTransformer("msmarco-distilbert-dot-v5")


def load_data():
    with open("/app/data/articles.pkl", "rb") as f:
        articles = pickle.load(f)

    with open("/app/data/embeddings.pkl", "rb") as f:
        embeddings = pickle.load(f)

    return articles, embeddings


def query_articles(query_request: QueryRequest):
    articles, embeddings = load_data()
    query_embedding = model.encode([query_request.query])

    dot_products = np.dot(query_embedding, embeddings.T).flatten()

    sorted_indices = np.argsort(dot_products)[::-1]

    seen_titles = set()
    unique_results = []

    for idx in sorted_indices:
        article = articles[idx]
        if article["title"] not in seen_titles:
            unique_results.append(article)
            seen_titles.add(article["title"])
            if len(unique_results) == query_request.top_k:
                break

    return {"articles": unique_results}
