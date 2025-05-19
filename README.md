# Blog_editor
A full-stack blog editor built with React, Node.js, Express, and MongoDB. Features include auto-saving drafts, publishing with tags, editing/deleting posts, and real-time updates via REST API. Includes responsive design and toast notifications for user feedback.

# 📝 Blog Editor – Full Stack MERN Project

A full-stack Blog Editor application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) that allows users to create, save drafts, publish, edit, and delete blog posts with real-time updates and tag management.

---

## 🚀 Features

- **Create Blogs** – Add a title, content, and tags to your blog posts.
- **Auto-Save Drafts** – Blog content is auto-saved every 5 seconds.
- **Publish Blogs** – Convert drafts into published posts with one click.
- **Edit Blogs** – Load and update existing drafts or published posts.
- **Delete Blogs** – Remove blogs permanently.
- **Status Management** – Blogs can be filtered as `draft` or `published`.
- **User Feedback** – Toast notifications for auto-save and validation alerts.
- **Responsive UI** – Clean and functional layout built with React.

---

## 🧱 Tech Stack

**Frontend**:
- React.js
- Axios for HTTP requests
- React Toastify for notifications

**Backend**:
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- CORS and Body Parser middleware

---

## 📁 Project Structure
blog-editor/
│
├── backend/
│ ├── index.js # Express server
│ └── models/Blog.js # Mongoose schema
│
├── frontend/
│ ├── src/
│ │ ├── App.js # Main React component
│ │ └── index.js # Entry point
│ └── public/
│
├── package.json # Project metadata and dependencies
└── README.md # This file

