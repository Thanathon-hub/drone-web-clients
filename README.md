# 🚁 Drone Config & Temperature Logging System

The system manages the configuration data, monitors the status, and records the temperature history of the drone. It is developed as a full-stack web application, separating the operational functions between... **Backend RESTful API (Node.js & Express)** and **Frontend Single Page Application (HTML, Tailwind CSS, Vanilla JavaScript)**

---

## 📌(Features)

### Backend (API Server)
* Retrieve the drone's configuration settings based on `droneId` from the source server.
* Check the operational status (condition/status) of the drone.
* Retrieve temperature recording history (logs) with support for pagination and sorting by the most recent entries.
* Record new temperature data (Temperature Log) via Bearer Token Authentication
* Supports cross-domain connections via `CORS` and manages environment variables using `dotenv`.

### Frontend (Web Client)
* Designed in a manner that **Single Page Application (SPA)** Switch between screens instantly without needing to reload the webpage.
* **View Config:** Show details of the drone (`Drone ID`, `Drone Name`, `Light`, `Country`, `Maximum Speed`)
* **Temperature Log Form:** A form for entering and submitting temperature values ​​(in Celsius) to an API
* **View Logs:** Table showing the history of recent temperature recordings, along with the timestamp of each entry (`Created`)

---

## 🛠️ (Tech Stack)

* **Backend:** Node.js, Express.js, Axios / Fetch API, CORS, Dotenv
* **Frontend:** HTML5, Tailwind CSS (CDN), JavaScript (ES6+ Fetch API)
* **Deployment:** Render (or Cloud Platform etc. for Backend) / GitHub Pages, Vercel, Netlify (for Frontend)

---

## 📂 (Project Structure)

```text
drone-project/
├── backend/
│   ├── server.js          # Main Code of Express API Server
│   ├── package.json       # Dependencies list and Scripts
│   └── .env               # Environment Variables File
├── frontend/
│   ├── index.html         # Structure and UI (Tailwind CSS)
│   └── script.js          # Screen switching and connectivity logic API (Fetch)
└── README.md              # Project description document
```

## Configuration & Setup

1. Clone this repository:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd <YOUR_PROJECT_FOLDER>
   ```

2. Configure the API Server URL and Drone ID in `script.js` (or via environment configuration):
   ```javascript
   const API_BASE_URL = '[https://your-api-server.onrender.com](https://your-api-server.onrender.com)';
   const DRONE_ID = 3001;
   ```

## How to Run Locally

1. Ensure the **Drone API Server (Assignment #1)** is running.
2. Open `index.html` directly in a web browser, or run it using the **Live Server** extension in VS Code, or run via `npx serve`:
   ```bash
   npx serve .
   ```
3. Open `http://localhost:3000` (or the port shown in your terminal) in your browser.