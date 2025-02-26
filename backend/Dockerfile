
FROM python:3.10


WORKDIR /app


COPY ./requirements.txt /app/requirements.txt


RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt


COPY . .


EXPOSE 5000


CMD ["uvicorn", "--app-dir", "/app/src", "main:app", "--host", "0.0.0.0", "--port", "5000", "--reload"]