import streamlit as st
from api import query
from image_generator import generate_images

# Title of the app
st.markdown("<h1 style='text-align: center; margin-bottom: 20px;'>Generate Promotional Banner With AI Tools </h1>", unsafe_allow_html=True)

# Sidebar for user input
st.sidebar.title("Input Settings")
banner_name = st.sidebar.text_input("Enter Product Banner Name:", "New Year Sale")
promotional_text = st.sidebar.text_input("Enter Promotional Text:", "Get 50% Off")
color_palette = st.sidebar.text_input("Enter Color Palette (e.g., #FF5733, #C70039):", "#FF5733, #C70039")
size = st.sidebar.selectbox("Select Banner Size:", ["Small", "Medium", "Large"])

# Initialize session state for generated images and prompt
if "generated_images" not in st.session_state:
    st.session_state["generated_images"] = []

if "prompt" not in st.session_state:
    st.session_state["prompt"] = ""

# Button to generate the images
if st.sidebar.button("Generate Images"):
    with st.spinner("Generating..."):
        # Combine inputs into a valid format
        st.session_state["prompt"] = f"Create a {size} banner for '{banner_name}' with promotional text '{promotional_text}', using colors {color_palette}."
        
        # Generate and display the images
        generated_images = generate_images(st.session_state["prompt"], num_images=2)  # Adjust number of images as needed
        st.session_state["generated_images"] = generated_images

# Display all generated images if they exist in session state
if st.session_state["generated_images"]:
    cols = st.columns(len(st.session_state["generated_images"]))  # Create columns to display multiple images
    for idx, col in enumerate(cols):
        with col:
            image, image_path = st.session_state["generated_images"][idx]
            st.image(image, caption=f"Generated Image {idx + 1} for: '{st.session_state['prompt']}'", use_column_width=True)
            st.sidebar.download_button(f"Download Image {idx + 1}", data=open(image_path, "rb"), file_name=image_path)
