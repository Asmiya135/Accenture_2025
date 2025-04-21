import os
import io
import json
import base64
from PIL import Image
from mistralai import Mistral
import google.generativeai as genai
from dotenv import load_dotenv
from detect_pii import redact_selected_pii
# Load environment variables
load_dotenv()
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Initialize Mistral client
client = Mistral(api_key=MISTRAL_API_KEY)

# Image preprocessing and base64 conversion
def prepare_image(image_path):
    try:
        print(f"[INFO] Loading and preprocessing image: {image_path}")
        img = Image.open(image_path).convert("RGB")

        # Resize if necessary
        max_width = 800
        if img.width > max_width:
            ratio = max_width / float(img.width)
            height = int(float(img.height) * ratio)
            img = img.resize((max_width, height), Image.Resampling.LANCZOS)
            print(f"[INFO] Image resized to: {img.size}")

        # Compress and encode
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG", quality=90)
        base64_image = base64.b64encode(buffered.getvalue()).decode("utf-8")

        print(f"[INFO] Base64 image length: {len(base64_image)}")
        return base64_image

    except Exception as e:
        raise Exception(f"[ERROR] Failed to process image: {e}")

# Mistral OCR
def extract_information_from_image(image_path):
    base64_image = prepare_image(image_path)

    if not base64_image:
        raise Exception("Failed to encode image to base64")

    try:
        print("[INFO] Sending image to Mistral OCR...")
        response = client.ocr.process(
            model="mistral-ocr-latest",
            document={
                "type": "image_url",
                "image_url": f"data:image/jpeg;base64,{base64_image}"
            }
        )

        # Log full OCR output
        print(f"[INFO] OCR Raw Response:\n{response}")
        
        # Convert OCR result into structured text
        extracted_text = str(response)
        if not extracted_text.strip():
            raise Exception("OCR result is empty")

        # Use Presidio to redact PII
        redacted_text = redact_selected_pii(extracted_text)

        print(f"[INFO] Redacted Text Preview:\n{redacted_text[:300]}...")

        return {"report": redacted_text}

    except Exception as e:
        raise Exception(f"Failed to extract with Mistral OCR: {e}")

# Generate advice using Gemini
def generate_doctor_advice(extracted_data):
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = f"""
You are a professional doctor. Analyze the following patient report:

{json.dumps(extracted_data, indent=2)}

Based on the test values, symptoms, or any indicators provided, give professional advice including:
- Immediate steps the patient should take
- Any alarming indicators
- Diet/lifestyle suggestions
- Whether to consult a specialist
- Precautionary measures

Respond in a friendly, clear tone in markdown format.
"""

    try:
        print("[INFO] Sending data to Gemini for medical advice...")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise Exception(f"Failed to generate advice with Gemini: {e}")
