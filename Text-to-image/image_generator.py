import io
import random
from PIL import Image, UnidentifiedImageError
import streamlit as st 
from api import query

# Function to generate images based on user input
def generate_images(prompt, num_images):
    generated_images = []
    
    # Generate and store the selected number of images with different seeds
    for i in range(num_images):
        random_seed = random.randint(0, 99999)  # Generate a random seed for each image
        image_bytes = query({"inputs": prompt}, seed=random_seed)
        
        if image_bytes is not None:
            try:
                image = Image.open(io.BytesIO(image_bytes))
                image_path = f"generated_image_{i + 1}.png"
                image.save(image_path)  # Save as PNG
                generated_images.append((image, image_path))  # Store image and path
            except UnidentifiedImageError:
                st.error("The response is not a valid image. Please try again with a different prompt")
        else:
            st.error("Unable to generate image right now. Please try after some time.")
    
    return generated_images
