import re


def sanitize_text_with_regex(html_content):
    clean_text = re.sub(r"<[^>]+>", "", html_content)
    return clean_text


def chunk_text(text, chunk_size):
    """Split text into chunks of a specified size."""
    words = text.split(". ")
    chunks = []
    for i in range(0, len(words), chunk_size):
        chunk = " ".join(words[i : i + chunk_size])
        chunks.append(chunk)
    return chunks
