from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import QueryRequest
from dataset import create_dataset
from query import query_articles

app = FastAPI(
    title="Semantic Search API",
    description="API for creating a dataset from RSS feeds and querying it using semantic search.",
    version="1.0.0",
    openapi_url="/api/v1/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/query/", response_model=dict)
async def query_route(query_request: QueryRequest):
    return query_articles(query_request)


@app.post("/create-dataset/", response_model=dict)
async def create_dataset_route():
    return create_dataset()
