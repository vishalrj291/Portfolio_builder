## Portfolio_builder - Instant Portfolio Generator

Portfolio_builder is a web application that allows users to instantly create a stunning, professional-looking portfolio website. No coding required. Just fill in your details, choose a template, and get a shareable link to your live portfolio.

## Features
Multiple Templates: Choose from a variety of modern, professionally designed templates.
Easy Customization: An intuitive editor makes it simple to add your projects, skills, and contact information.
Instant Deployment: Your portfolio is live and ready to share the moment you hit "publish".
Firebase Integration: Securely handles user authentication and data storage.
Shareable Links: Get a unique URL for each portfolio you create.
Tech Stack
Framework: Next.js
UI Library: React
Styling: Tailwind CSS
Backend & Database: Firebase (Authentication, Firestore, Storage)
Deployment: Vercel

## Project Structure
The project follows a standard Next.js App Router structure.
--
/
├── public/         # Static assets (images, fonts, etc.)
├── src/
│   ├── app/        # Application routes and pages
│   ├── components/ # Reusable React components
│   └── lib/        # Helper functions and Firebase configuration
├── .env.local      # Environment variables (local)
├── next.config.mjs # Next.js configuration
└── package.json    # Project dependencies and scripts
--

## Getting Started

To run this project on your local machine, follow these steps.

## Prerequisites
Node.js (v18 or later)
npm
1. Clone the Repository
git clone https://github.com/vishalrj291/Portfolio_builder.git
cd AutoPortfolio/auto-portfolio
2. Install Dependencies
npm install
3. Set Up Environment Variables
Create a file named .env.local in the auto-portfolio directory. This file will hold your Firebase project credentials.

Copy the following content into your .env.local file and replace the placeholder values with your actual Firebase credentials. You can find these in your Firebase project settings.

NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
--
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
--
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
--
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
--
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
--
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
--
4. Run the Development Server

npm run dev
--
Open http://localhost:3000 with your browser to see the result.

## Deployment

This project is optimized for deployment on Vercel.

## Vercel Deployment Guide

Fork this repository to your own GitHub account.
Create a new project on Vercel and import your forked repository.
Configure the Project Settings:
Framework Preset: Vercel should automatically detect it as Next.js.
Root Directory: If you cloned the entire repository, set the root directory to auto-portfolio.
Set Up Environment Variables on Vercel:
In your Vercel project dashboard, go to Settings > Environment Variables.
Add all the NEXT_PUBLIC_ variables that you have in your .env.local file (e.g., NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, etc.) with their corresponding values.
Deploy: Vercel will automatically trigger a deployment. After it's complete, your site will be live.
Any subsequent push to the main branch of your repository will automatically trigger a new deployment on Vercel.

## Deployment Link
https://auto-portfolio-ufmx.vercel.app/
