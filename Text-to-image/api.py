import requests
import streamlit as st
from dotenv import load_dotenv
import os

load_dotenv()
HUGGING_FACE_KEY = os.getenv('Hugging_face_key')

API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev"
HEADERS = {"Authorization": f"Bearer {HUGGING_FACE_KEY}"}

# Function to query the Hugging Face API for image generation
def query(payload, seed=None):
    if seed is not None:
        payload['seed'] = seed
    response = requests.post(API_URL, headers=HEADERS, json=payload)
    
    # Check for non-200 status codes
    if response.status_code == 429:
        st.error("Rate Limit Exceeded. Try after 1 hour.")
        return None
    return response.content
