from flask import Flask, jsonify, request
import google.generativeai as genai  
import requests  
import os
from dotenv import load_dotenv
from PIL import Image
import requests
from io import BytesIO
import pandas as pd
from flask_cors import CORS
from io import StringIO
import io
load_dotenv()
GOOGLE_API_KEY=os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

app = Flask(__name__)
CORS(app)

API_URL = "https://api-inference.huggingface.co/models/ProsusAI/finbert"
headers = {"Authorization": "Bearer " +  os.getenv('API_KEY') }

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()
	
output = query({
	"inputs": " IPOs in FY24 help raise over Rs 61,900 crore: Fundraising up 20%, highest in two years",
})

