# Gossip Search Application

## Overview

Gossip Search is a full-stack web application that leverages semantic search to retrieve relevant articles from various RSS feeds. The backend is built with FastAPI and uses advanced NLP models to embed and search articles based on user queries. The frontend is developed using React and provides an intuitive interface for users to search and browse articles.

## Features

- **Semantic Search**: Utilizes state-of-the-art NLP models to provide relevant search results.
- **Real-time Updates**: Articles are fetched and embedded in real-time from multiple RSS feeds.
- **User-friendly Interface**: A clean and responsive UI built with React and Tailwind CSS.
- **API Documentation**: Interactive API documentation powered by Swagger UI.

## Screenshots

Screenshot of the Gossip Search website.  
<img src="images/website-screenshot.png" alt="website-screenshot.png" width="600"/>

Screenshot of the Swagger UI for API documentation.  
<img src="images/swagger-screenshot.png" alt="swagger-screenshot.png" width="600"/>

## Tech Stack

### Backend

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
- **Uvicorn**: An ASGI server for serving FastAPI applications.
- **Sentence Transformers (`msmarco-distilbert-dot-v5`)**:
  - **Model**: `msmarco-distilbert-dot-v5` is a state-of-the-art NLP model fine-tuned on the MS MARCO dataset, which consists of real user search queries.
  - **Functioning**: This model is designed for semantic search tasks, where it embeds both queries and documents into a high-dimensional vector space. The similarity between these embeddings is then computed using the dot product, which measures how closely related the query is to each document. This approach allows the model to capture the semantic meaning of the text, providing more relevant search results compared to traditional keyword-based searches.
  - **Use Case**: Ideal for applications requiring efficient and accurate information retrieval, such as search engines, question-answering systems, and recommendation systems.
- **Docker**: Containerization for consistent deployment across environments.


#### Routes

The backend of the Gossip Search application provides the following routes to manage and query the dataset of articles:

1. **`POST /create-dataset/`**

  - **Description**: This route triggers the creation of the dataset by parsing multiple RSS feeds, embedding the articles, and storing them for semantic search.
  - **Usage**: Call this endpoint to update or initialize the dataset with the latest articles from the specified RSS feeds.
  - **Request**: No request body is needed.
  - **Response**: Returns a message confirming the creation of the dataset along with the number of articles processed.

2. **`POST /query/`**

- **Description**: This route allows querying the dataset using semantic search. It takes a user query, embeds it, and retrieves the most relevant articles based on similarity.
- **Usage**: Use this endpoint to search for articles related to a specific query.
- **Request**:
  - `query` (string): The search query provided by the user.
  - `top_k` (integer, optional): The number of top results to return (default is 6).
- **Response**: Returns a list of articles that match the query, sorted by relevance.

Example Request Body for `/query/`

```json
{
  "query": "latest news",
  "top_k": 5
}
```


### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Docker**: Containerization for consistent deployment across environments.

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.

### Running the Application

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd gossip-search
   ```
   
2. **Build and Run Containers**:
   ```bash
   docker-compose up --build
   ```

3. **Access the Application**
- **Frontend**: Open your browser and navigate to `http://localhost:3000`.
- **Backend (Swagger UI)**: Navigate to `http://localhost:5050/docs` for API documentation.

## Project Structure

### Backend

- **`main.py`**: Entry point for the FastAPI application.
- **`dataset.py`**: Functions for creating and managing the dataset of articles.
- **`query.py`**: Functions for querying the dataset using semantic search.
- **`utils.py`**: Utility functions for text sanitization and chunking.
- **`models.py`**: Pydantic models for request validation.

### Frontend

- **`App.tsx`**: Main component rendering the search bar and articles list.
- **`ArticlesList.tsx`**: Component for displaying the list of articles.
- **`SearchBar.tsx`**: Component for the search bar to input queries.
- **`context.tsx`**: Context provider for managing global state.

### Explanation of Environment Variables

- **`API_PORT`**: This variable sets the port on which the backend API runs. You can change this port if needed.

- **`API_HOST`**: This variable sets the host for the backend API. It is typically set to `localhost` for local development.

- **`REACT_APP_API_URL`**: This variable sets the base URL for the backend API, constructed using `API_HOST` and `API_PORT`. The frontend uses this URL to make API requests.

- **`FRONTEND_PORT`**: This variable sets the port on which the frontend application runs. You can modify this port if you need to run the frontend on a different port.

