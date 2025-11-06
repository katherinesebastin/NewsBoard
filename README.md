# NewsBoard

NewsBoard is a simple and professional application that retrieves and displays news using the NewsAPI.org service.
The app allows users to:
- View top headlines
- Search news using any keyword
- Browse articles in a clean UI
The project is built using Deno + Hono for the backend and React + Vite for the frontend.

## Features

### 1. Get Current Top Headlines

Fetches the latest top headlines  
Uses backend route: GET /news/top?country=us  

### 2. Search News by Keyword

User can search any news topic  
Uses backend route: GET /news/search?q=keyword  

### 3. Modern and Responsive UI

- Clean layout
- Smooth hover effects
- Responsive for all screen sizes

## Technologies Used

### Backend
- Deno
- Hono
- NewsAPI.org client via fetch
- CORS enabled for local frontend

### Frontend
- React
- Vite
- Tailwind CSS

## Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
git clone https://github.com/katherinesebastin/NewsBoard  
cd NewsBoard

### 2. Backend Setup (Deno)
Install Deno if not installed: https://deno.land/  
Go to backend folder: cd backend  
Create .env file: NEWSAPI_KEY=your_api_key_here  
Start the backend server: deno run --allow-net --allow-env --allow-read main.ts  
Backend runs at: http://localhost:8000

### 3. Frontend Setup (React + Vite)
Go to frontend folder: cd ../frontend  
Install dependencies: npm install  
Start development server: npm run dev  
Frontend runs at: http://localhost:5173/

## API Endpoints (Backend)
- Top Headlines  
GET /news/top?country=us&pageSize=20

- Search News  
GET /news/search?q=apple&sortBy=publishedAt

Backend internally calls:
- https://newsapi.org/v2/top-headlines
- https://newsapi.org/v2/everything

## User Interface

The UI includes:
- Clean header with NewsBoard title and icon
- Button for loading top headlines
- Search bar
- Professional article cards:
  - Title
  - Source
  - Published date
  - Description
  - Link to full article
