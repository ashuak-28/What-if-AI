# 🌌 What If – AI-Powered Alternate Life Simulator

**What If** is a dynamic web application that uses the power of AI to simulate alternate life scenarios based on your decisions. Whether you wonder _"What if I was a cricketer?"_ or _"What if I studied in the US?"_, this app crafts an engaging story, complete with visual timelines and multiverse scenarios.

---

## 🚀 Features

- 🔮 **AI-Powered Response** – Generates realistic alternate life stories using OpenAI.
- 🕓 **Timeline Animation** – Shows your life year-by-year with glowing neon circles and animations.
- 🌌 **Multiverse Cards** – Explore 3 alternate scenarios in parallel universes.
- 📜 **History Panel** – View, regenerate, or delete your previous prompts.
- 🎨 **Stylish UI** – Beautiful starfield background, glowing effects, and smooth transitions.

---

## 🛠️ Tech Stack

| Frontend        | Backend          | AI/Cloud         | Styling         |
|-----------------|------------------|------------------|-----------------|
| React.js        | Node.js + Express| OpenAI API       | Tailwind CSS    |
| Vite            | CORS, dotenv     |                  | Custom CSS      |

---

## 📁 Project Structure

---

## 🧪 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/ashuak-28/What-if-AI.git
cd what-if

# 2. Install frontend dependencies
cd client
npm install

# 3. Install backend dependencies
cd ../server
npm install

# 4. Add your OpenAI API key in server/.env
OPENAI_API_KEY=your_key_here

# 5. Run the backend
node index.js

# 6. Run the frontend (in another terminal)
cd ../client
npm run dev


