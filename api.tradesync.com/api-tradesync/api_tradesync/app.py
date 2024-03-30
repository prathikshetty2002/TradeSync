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

BASE_URL = "https://api.polygon.io/v2/aggs"
NEWS_URL = "https://api.polygon.io/v2/reference/news"
API_URL = "https://api-inference.huggingface.co/models/ProsusAI/finbert"
headers = {"Authorization": "Bearer " +  os.getenv('API_KEY') }

def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.json()

@app.route('/finbert-query', methods=['GET'])
def finbert_query():
    # Ensure there's a JSON payload
    if not request.json or 'inputs' not in request.json:
        return jsonify({'error': 'No input provided'}), 400
    
    inputs = request.json['inputs']
    payload = {"inputs": inputs}
    output = query(payload)
    return jsonify(output)
app.route('/stock-news/<string:stocksTicker>', methods=['GET'])
def get_stock_news(stocksTicker):
    # Construct the URL for the Polygon API request
    url = f"{BASE_URL}/ticker/{stocksTicker}&limit=5?apiKey={os.getenv('POLYGON_API_KEY')}"
     
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Return the JSON response from Polygon API
        return jsonify(response.json()), 200
    else:
        # Return an error message if something went wrong with the request
        return jsonify({"error": "Failed to fetch data from Polygon API", "status_code": response.status_code}), response.status_code

@app.route('/stock-aggregates/<string:stocksTicker>/<int:multiplier>/<string:timespan>/<string:from_date>/<string:to_date>', methods=['GET'])
def get_stock_aggregates(stocksTicker, multiplier, timespan, from_date, to_date):
    # Construct the URL for the Polygon API request
    url = f"{BASE_URL}/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from_date}/{to_date}?apiKey={os.getenv('POLYGON_API_KEY')}"
    
    # Make the request to the Polygon API
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Return the JSON response from Polygon API
        return jsonify(response.json()), 200
    else:
        # Return an error message if something went wrong with the request
        return jsonify({"error": "Failed to fetch data from Polygon API", "status_code": response.status_code}), response.status_code


# @app.route('/group-aggregates/<string:date>', methods=['GET'])
# def get_group_aggregates(stocksTicker, multiplier, timespan, from_date, to_date):
#     # Construct the URL for the Polygon API request
#     url = f"{BASE_URL}/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from_date}/{to_date}?apiKey={os.getenv('POLYGON_API_KEY')}"
    
#     # Make the request to the Polygon API
#     response = requests.get(url)
    
#     # Check if the request was successful
#     if response.status_code == 200:
#         # Return the JSON response from Polygon API
#         return jsonify(response.json()), 200
#     else:
#         # Return an error message if something went wrong with the request
#         return jsonify({"error": "Failed to fetch data from Polygon API", "status_code": response.status_code}), response.status_code
        
if __name__ == '__main__':
    app.run(debug=True)



