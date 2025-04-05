# faiss-setup.py

import os
from langchain_community.document_loaders import DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.vectorstores import FAISS
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Set API key manually to avoid ADC errors
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")

# Load documents
loader = DirectoryLoader("medical_docs", glob="**/*.pdf")
docs = loader.load()

# Split into chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)

# Embedding model
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

# Create vector store and save
vectorstore = FAISS.from_documents(chunks, embeddings)
vectorstore.save_local("faiss_index")

print("✅ FAISS index created and saved!")
