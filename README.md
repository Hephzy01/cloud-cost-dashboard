# Cloud Cost Dashboard

A serverless cloud cost dashboard that visualizes AWS spending trends, budget usage, and service-level costs. Built with 
React and deployed using AWS serverless services.

<img width="1920" height="1008" alt="kpi-card" src="https://github.com/user-attachments/assets/58ce60e4-81bb-422e-97c5-09b46974f38d" />

---

## Overview

This project shows how to build and deploy a full cloud-based application using a modern frontend and AWS backend services.

It fetches cost data from a serverless API and displays:

- Current spend  
- Last month spend  
- Remaining budget  
- Daily cost trends  
- Cost breakdown by service  
- Budget usage alerts  

---

## Architecture

Frontend (React + Vite)  
↓  
Amazon S3 (Static Hosting)  
↓  
Amazon API Gateway (REST API)  
↓  
AWS Lambda (Backend logic)  
↓  
JSON Data (mock cost data)

---

## Tech Stack

Frontend:
- React (Vite)  
- Tailwind CSS  
- Recharts  

Backend:
- AWS Lambda  
- Amazon API Gateway  

Hosting:
- Amazon S3  

---

## Features

- Fetches data from API  
- Cost KPI cards  
- Daily spend line chart  
- Service cost bar chart  
- Budget usage tracker  
- Budget alert (80% threshold)  
- Responsive layout  

---

## Screenshots


<img width="1920" height="931" alt="potential-saving2" src="https://github.com/user-attachments/assets/f3347f00-66e0-4ce6-947e-421864c38a38" />






## Cost by Services

<img width="1920" height="903" alt="Cost-by-services" src="https://github.com/user-attachments/assets/5ab1d67d-2ad0-4941-8336-f31ddc6f08f6" />


---

## API Endpoint

GET /costs

<img width="1920" height="1008" alt="api-gateway" src="https://github.com/user-attachments/assets/31e32a05-534a-4032-9986-953510d98f84" />

### Sample Response

{
  "currentSpend": 125,
  "lastMonth": 98,
  "budget": 200,
  "daily": [
    { "date": "Mon", "cost": 10 },
    { "date": "Tue", "cost": 15 }
  ],
  "services": [
    { "service": "EC2", "cost": 60 },
    { "service": "S3", "cost": 25 }
  ]
}

---

## What I Learned

- Built a serverless backend with AWS Lambda  
- Created REST API using API Gateway  
- Deployed frontend to S3  
- Fixed CORS issues  
- Understood build vs deployment (Vite → dist → S3)  
- Debugged real integration issues  

---

## Challenges

- CORS errors between S3 and API Gateway  
- API connection debugging  
- JSON response handling  
- Deployment updates to S3  

---

## Project Structure

cloud-cost-dashboard/
- src/
- public/
- screenshots/
- package.json
- README.md

---

## Run Locally

npm install  
npm run dev  

---

## Build

npm run build  

Output goes to:

dist/

---

## Deployment

1. Build project  
2. Upload dist/ to S3  
3. Enable static hosting  
4. Use S3 URL  

---

## Future Improvements

- Connect real AWS billing data  
- Add authentication  
- Add date filtering  
- Improve UI  

---

## Author

Adeola Akinlade

---

## License

For portfolio use
