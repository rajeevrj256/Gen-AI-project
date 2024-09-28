import streamlit as st
from api import query
from image_generator import generate_images

# Title of the app
st.markdown("<h1 style='text-align: center; margin-bottom: 20px;'>AI Image Generator </h1>", unsafe_allow_html=True)

# Sidebar for user input
st.sidebar.title("Input Settings")
prompt = st.sidebar.text_input("Enter your prompt:", "Astronaut riding a horse")

# Number of images selection
num_images = st.sidebar.slider("Select number of images to generate:", 1, 3, 2)

# Initialize session state for generated images and the number of images
if "generated_images" not in st.session_state:
    st.session_state["generated_images"] = []

# Button to generate the images
if st.sidebar.button("Generate Images"):
    with st.spinner("Generating..."):
        # Generate and display the images
        generated_images = generate_images(prompt, num_images)
        st.session_state["generated_images"] = generated_images

# Display all generated images if they exist in session state
if st.session_state["generated_images"]:
    cols = st.columns(num_images)  # Create columns to display multiple images
    for idx, col in enumerate(cols):
        if idx < len(st.session_state["generated_images"]):
            with col:
                image, image_path = st.session_state["generated_images"][idx]
                st.image(image, caption=f"Generated Image {idx + 1} for: '{prompt}'", use_column_width=True)
                st.sidebar.download_button(f"Download Image {idx + 1}", data=open(image_path, "rb"), file_name=image_path)
