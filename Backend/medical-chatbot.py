from flask import Flask, request, jsonify, session
import os
from dotenv import load_dotenv
from flask_cors import CORS

# LangChain Imports
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA

# Load API key
load_dotenv()
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")

app = Flask(__name__)
CORS(app)
app.secret_key = os.getenv("SECRET_KEY", "dev_secret")

# Gemini model setup
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.2)

# Embeddings + FAISS
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
vectorstore = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

# Memory init
def init_memory():
    if "history" not in session:
        session["history"] = []

@app.route("/ask", methods=["POST"])
def ask():
    init_memory()
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    # Add user input to history
    session["history"].append(f"User: {user_input}")

    # 🔍 Retrieve relevant docs
    docs = vectorstore.similarity_search(user_input, k=3)
    context = "\n\n".join(doc.page_content for doc in docs)

    # 🧠 Build prompt
    full_prompt = f"""
You are a health literacy assistant. Your role is to explain symptoms, provide educational insight, and suggest general first-aid steps.
Use the content from the provided medical textbook to help the user understand what might be happening.

Do not diagnose. Do not mention being an AI. Do not suggest calling emergency services unless absolutely necessary.
Keep responses informative and based on textbook content.

--- Medical Reference ---
{context}

--- Conversation History ---
{chr(10).join(session["history"])}

Respond helpfully.
"""


    # 🎯 Get Gemini response
    response = llm.invoke(full_prompt)

    # Save bot reply
    session["history"].append(f"Bot: {response.content}")

    return jsonify({"response": response.content})


@app.route("/reset", methods=["POST"])
def reset():
    session.pop("history", None)
    return jsonify({"message": "Session reset successful."})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
