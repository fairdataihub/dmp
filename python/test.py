from flask import Flask, request, jsonify
import ollama
import openai
import json
import os
import re
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

app = Flask(__name__)
CORS(app)  

def ask_llm_ollama(model, query):
    response = ollama.chat(model=model, messages=[{"role": "user", "content": query}])
    return response['message']['content']

# Disabled OpenAI usage
def ask_llm_openai(model, query):
    client = openai.OpenAI()
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": query}],
        temperature=0.7
    )
    return response.choices[0].message.content

def create_folder(folderpath):
    if not os.path.exists(folderpath):
        os.makedirs(folderpath)

def save_json(folderpath, filename, response):
    create_folder(folderpath)
    filepath = os.path.join(folderpath, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(response)
    print(filepath, "saved")

def clean_filename(name):
    return re.sub(r'[\\/*?:"<>|]', "_", name.strip())

def remove_intro_sentence(text):
    """Remove any leading sentences before the first { in the LLM response."""
    idx = text.find('{')
    if idx == -1:
        # No JSON start found, return original text
        return text.strip()
    return text[idx:].strip()

def build_query(data, template_json):
    title = data.get("title", "Untitled")
    institute = data.get("institute", "NIH")
    element_1A = data.get("element_1A", "")
    is_human_study = data.get("isHumanStudy", "").lower() == "yes"
    consent_desc = data.get("consentDescription", "")

    query_parts = [
        "You are an expert biomedical grant writer and data steward. Create a Data Management and Sharing Plan (DMSP) for a grant proposal being submitted to the National Institutes of Health (NIH),",
        f"Specifically targeting the {institute}.",
        f"Here are the details about the data to be collected:\n{element_1A}"
    ]
    if is_human_study:
        query_parts.append(f"This proposal includes a study that will involve human participants. {consent_desc}.")
    
    query_parts.append(
        "Please generate the Data Management and Sharing Plan strictly in JSON format matching this template structure exactly, only respond with valid JSON:"
    )
    query_parts.append(json.dumps(template_json, indent=2))

    return title, "\n".join(query_parts)

TEMPLATE_PATH = "inputs/dmp-template.json"
if not os.path.exists(TEMPLATE_PATH):
    raise FileNotFoundError(f"❌ Error: The file '{TEMPLATE_PATH}' was not found.")

with open(TEMPLATE_PATH, 'r', encoding='utf-8') as f:
    dmp_template_json = json.load(f)  # loads JSON into a Python dict

@app.route('/query', methods=['POST'])
def query_route():
    data = request.get_json()
    print("Received data:", data)
    if not data:
        return jsonify({"error": "No input provided"}), 400

    title, query = build_query(data, dmp_template_json)
    
    ollama_models = ["llama3"]
    all_model_responses = {}

    for model in ollama_models:
        response = ask_llm_ollama(model, query)
        cleaned_response = remove_intro_sentence(response)

        try:
            # Parse cleaned JSON string into a dict
            json_data = json.loads(cleaned_response)
        except json.JSONDecodeError as e:
            return jsonify({
                "error": "Failed to parse JSON from model response",
                "details": str(e),
                "raw_response": cleaned_response
            }), 500

        modelname = model.replace(":", "-")
        all_model_responses[modelname] = json_data

    # Return all model JSON responses directly in the API response
    return jsonify({
        "message": f"DMSP generated successfully for {title}",
        "data": all_model_responses
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)
