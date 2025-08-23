# Messenger Clone – A Full-Stack Real-Time Chat Application

A modern, real-time messaging application built with Next.js, React, and Prisma. This project is a deep dive into full-stack development, demonstrating skills in both front-end and back-end technologies.


**Live Demo**
[Messenger Clone](https://messenger-clone-az9k9e6un-chenlinlongs-projects.vercel.app/)


## Core Features

1. Secure User Authentication: Full sign-up and login functionality using email/password and social providers (Google/GitHub) powered by NextAuth.

2. Real-Time Messaging: Instant message delivery and presence updates using Pusher channels.

3. Cloud-Based Media Uploads: Seamless image sharing integrated with Cloudinary's cloud storage.

4. Group & One-on-One Chats: Functionality for both private conversations and group discussions.

5. Responsive Design: A clean, modern UI that works beautifully on both desktop and mobile devices.

6. Typing Indicators & Read Receipts: Functionality for typing status and message read confirmations is under development.


## Tech Stack

* Frontend: React, Next.js 13 (App Router), TypeScript, Tailwind CSS, Headless UI

* Backend: Next.js API Routes (Node.js), Prisma ORM

* Database: MongoDB

* Auth: NextAuth

* Real-Time: Pusher

* Storage: Cloudinary

* Testing: Jest, React Testing Library (planned)


## Local Development

To run this project locally, follow these steps:

1. `git clone https://github.com/chenlinlong/messenger-clone.git`

2. `cd messenger-clone`

3. Install dependencies: `npm install`

4. Set up environment variables:

5. Create a `.env` file in the root of the project.

6. Copy the contents of .env.example into your new .env file.

7. Fill in the required values (e.g., database URL, NextAuth secrets, Pusher and Cloudinary API keys).

8. Push the Prisma schema to your database: `npx prisma db push`

9. Run the development server: `npm run dev`

The application will be available at http://localhost:3000.


## Author & Contact

**Author**: Linlong Chen

**LinkedIn**: [@LinkedIn](linkedin.com/in/linlong-chen-lily/)

**GitHub**: [@chenlinlong](https://github.com/chenlinlong)