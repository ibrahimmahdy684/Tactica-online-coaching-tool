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

## 📸 Screenshots
Home Page:
<p float="left">
  <img src="https://github.com/user-attachments/assets/d7201dab-2197-4e21-8e89-30cdfac655ad" width="400" height="1000" />
  <img src="https://github.com/user-attachments/assets/a7154ad4-506d-4ff7-be7c-43f57e106f5f" width="400" height="1000" />
  <img src="https://github.com/user-attachments/assets/8ca79693-c3f2-456b-9898-268cdd3ee8d2" width="400" height="1000" />
</p>


Dashboard:
<p float="left">
  <img src="https://github.com/user-attachments/assets/44784153-6fd0-451b-b145-9f8dbda26b05" width="1000" height="800" />
</p>

Players:
<img width="1897" height="869" alt="Screenshot 2025-09-01 022334" src="https://github.com/user-attachments/assets/4678ffa0-ea3b-4ad0-bbb5-103ead68419b" />


Player Form:
<img width="1898" height="866" alt="image" src="https://github.com/user-attachments/assets/bdac4e8d-51a7-4b02-a40b-b8fac52d272f" />

Tactical Board
<p float="left">
  <img src="https://github.com/user-attachments/assets/eb1ae1a2-a8ea-4d7f-a541-fa9d1b3c99c8" width="500" height="1000" />
  <img src="https://github.com/user-attachments/assets/d784f561-e932-4f08-8d4d-a42b27caed41" width="500" height="1000" />

</p>
Game Simulation
<p float="left">
  <img src="https://github.com/user-attachments/assets/fc185ef6-04b3-4350-99a3-a48dadf7616e" width="500" height="1000" />
  <img src="https://github.com/user-attachments/assets/8d37e76f-21aa-4133-9dab-6b0849aeb5e2" width="500" height="1000" />
  <img src="https://github.com/user-attachments/assets/f2b89136-c084-4010-8410-463bbabef736" width="500" height="1000" />
  <img src="https://github.com/user-attachments/assets/332958dc-165d-4dc1-84e4-df50f5b7e8b5" width="500" height="1000" />

</p>

---

## 🎥 Demo

📽️  [Watch demo video](https://drive.google.com/file/d/18NNrePeraPr0nu2gO9ZyGjfVkSPEOhpQ/view?usp=sharing)  


