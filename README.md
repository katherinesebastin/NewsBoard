# NewsBoard

NewsBoard is a simple news web app. It shows the latest news headlines and also lets users search for news using any keyword.  
It uses:  
- Deno + Hono for the backend  
- React + Vite for the frontend  
- NewsAPI.org to get real news data  

## Features

### 1. Top Headlines

- Shows latest news articles
- Default country is US
- Example endpoint: `GET /news/top?country=us`

### 2. Search News 

- User can search any topic  
- Example endpoint: `GET /news/search?q=keyword` 

### 3. User Interface

- Simple and clean design
- Responsive
- Each article shows:
  - Title
  - Source
  - Date
  - Short description
  - Link to full article

## Technologies Used

### Backend
- Deno
- Hono
- Fetch API (to get data from NewsAPI)
- CORS enabled for local frontend

### Frontend
- React
- Vite
- Tailwind CSS

## Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
`git clone https://github.com/katherinesebastin/NewsBoard`   
`cd NewsBoard`  

### 2. Backend Setup (Deno)
Install Deno if not installed: `https://deno.land/`    
Go to backend folder: `cd backend`    
Create .env file inside the backend folder and add: `NEWSAPI_KEY=your_api_key_here`   
You can get the API key from: `https://newsapi.org/`  
Run backend server: `deno run --allow-net --allow-env --allow-read main.ts`    
Backend runs at: `http://localhost:8000`  

### 3. Frontend Setup (React + Vite)
Go to frontend folder: `cd ../frontend`    
Install dependencies: `npm install`    
Run frontend server: `npm run dev`    
Frontend runs at: `http://localhost:5173/`

## API Endpoints (Backend)
- Top Headlines: `GET /news/top?country=us&pageSize=20`  
- Search News: `GET /news/search?q=keyword`  
Backend internally calls:  
- `https://newsapi.org/v2/top-headlines`  
- `https://newsapi.org/v2/everything`  
