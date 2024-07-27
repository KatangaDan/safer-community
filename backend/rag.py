from flask import Flask, request, jsonify
from langchain_core.prompts import PromptTemplate
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_chroma import Chroma
import os
import json
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Manually set the OpenAI API key from the environment variable
openai_api_key = os.getenv("CHATGPT_API_KEY")

if not openai_api_key:
    raise ValueError("No OpenAI API key provided")

# Initialize GPT model
llm = ChatOpenAI(model="gpt-4o", max_tokens=500)

# Define your custom prompt
prompt = PromptTemplate(
    input_variables=['context', 'question'],
    template=(
        "You are an AI specializing in providing safety advice and emergency information for travelers in Johannesburg"
        "The data provided includes crime, the area, and the rate (amount of times it has happened since 2023) Avoid showing rates unless asked for.\n\n"
        "Act generally kind, helpful, reassuring, and informative. "
        "Do not provide information on other topics, redirect any questions back to safety"
        "If a user asks a question related to safety or crime, provide a detailed answer to that question. (for example, if they ask about the dangers of a specific area, provide the most common crimes in that area)"
        "Provide emergency contact numbers and the address of that area's police station, if they witness a crime, or if they are in danger. "

        "Emergency Numbers:\n"
        "1. Police: 10111\n"
        "2. Ambulance: 10177\n"
        "3. Fire Department: 011 375 5911\n"
        "4. General Emergency: 112 (on mobile)\n\n"

        "Question: {question} \n"
        "Context: {context} \n"
        "Answer:"
    )
)


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


@app.route('/query', methods=['POST'])
def query():
    data = request.json
    question = data.get('question')

    if not question:
        return jsonify({'error': 'Question is required'}), 400

    # Load JSON data from a file
    with open('jsondata.json', 'r') as f:
        documents = json.load(f)

    # Convert JSON data into LangChain's Document format
    docs = [
        Document(
            page_content=f"Crime: {doc['crime']}, Area: {
                doc['area']}, Rate: {doc['rate']}",
            metadata={}
        )
        for doc in documents
    ]

    # Split the documents
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)

    # Create a vector store from the split documents
    vectorstore = Chroma.from_documents(
        documents=splits, embedding=OpenAIEmbeddings())

    # Create a retriever
    retriever = vectorstore.as_retriever()

    # Define the RAG chain
    rag_chain = (
        {
            "context": retriever | format_docs,
            "question": RunnablePassthrough()
        }
        | prompt
        | llm
        | StrOutputParser()
    )

    # Invoke the RAG chain
    response = rag_chain.invoke(question)
    return jsonify({'response': response})


@app.route('/test', methods=['GET'])
def test():
    return "Server is running!"


if __name__ == '__main__':
    app.run(port=5000)  # Run Flask app on port 5000
