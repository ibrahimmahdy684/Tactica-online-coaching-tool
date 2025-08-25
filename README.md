# ⚽ Tactica - Football Tactics Board

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)  
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)  
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)  
![Express](https://img.shields.io/badge/API-Express-black?logo=express)  
![Tailwind CSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)  

Tactica is a **full-stack football tactics board** where users can build teams, manage players, and run **AI-powered match simulations**.  
This project combines **React, Node.js, Express, MongoDB, TailwindCSS, and HuggingFace Inference API** to deliver an interactive football experience.  

---

## 📑 Table of Contents
- [✨ Features](#-features)  
- [🛠 Tech Stack](#-tech-stack)  
- [📂 Project Structure](#-project-structure)  
- [⚡ Getting Started](#-getting-started)  
  - [1️⃣ Clone the Repository](#1️⃣-clone-the-repository)  
  - [2️⃣ Setup Backend](#2️⃣-setup-backend)  
  - [3️⃣ Setup Frontend](#3️⃣-setup-frontend)  
- [📸 Screenshots](#-screenshots)  
- [🎥 Demo](#-demo)  
  

---

## ✨ Features

- 🔐 **User Authentication** – Register, login, and manage sessions securely with JWT.  
- 👥 **Player Management** – Add, edit, and delete players with positions and image URLs.  
- 📝 **Team Creation** – Build squads dynamically.  
- 🎮 **Match Simulation** – generates match results, scorers, and statistics in structured JSON.  
- 📊 **Statistics** – Get match ratings, possession, and player performance breakdowns.  
- 🎨 **Responsive UI** – Built with **TailwindCSS** for a clean, modern design.  

---

## 🛠 Tech Stack

- **Frontend:** React, TailwindCSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB Atlas   
- **Auth:** JWT  

---

## 📂 Project Structure

Tactica/
│── Backend/ # Express API, MongoDB models, match simulation logic
│── Frontend/ # React UI for tactics board & user interaction
│── images/ # Screenshots for README
│── .env # Environment variables

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository
git clone https://github.com/yourusername/tactica.git
cd tactica

2️⃣ Setup Backend

cd Backend

npm install

Create a .env file in Backend/:

MONGODB_URL=your_mongodb_connection

PORT=5000

SECRET_KEY=your_secret

HF_API_KEY=your_huggingface_key

Run backend:

npm start


3️⃣ Setup Frontend

cd ../Frontend

npm install

npm start



