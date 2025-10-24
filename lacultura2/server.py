from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import requests
import base64

# --- FastAPI Setup ---
app = FastAPI()

# ✅ Allow requests from your frontend (replace * with your real site when deployed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # e.g. ["http://127.0.0.1:8000", "https://legendary-alfajores-dec303.netlify.app/"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Hugging Face API Config ---
HF_TOKEN = ""  # 🔥 Replace with your actual token
HF_API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell"

headers = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Accept": "image/png"
}

# --- Routes ---
@app.get("/")
def root():
    return {"message": "Lacultura AI Art Generator API is live 🚀"}

@app.get("/generate")
def generate(prompt: str = Query(..., description="The text prompt to generate an image from")):
    try:
        # Make request to Hugging Face Inference API
        response = requests.post(
            HF_API_URL,
            headers=headers,
            json={"inputs": prompt},
            timeout=60
        )

        if response.status_code != 200:
            return {"error": f"Failed to generate image: {response.text}"}

        # Convert response content to image
        image_bytes = response.content

        # Return as an image response
        return Response(content=image_bytes, media_type="image/png")

    except Exception as e:
        return {"error": str(e)}
