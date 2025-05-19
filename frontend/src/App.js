// frontend

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const API_URL = 'http://localhost:5000/api/blogs';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  let typingTimer;
  const notify = () => toast("The Article is auto saved");
  const notify1 = () => toast("Please Enter the required information");
  
  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    clearTimeout(typingTimer);
    if (title || content) {
      typingTimer = setTimeout(() => handleAutoSave(), 5000);
    }
    return () => clearTimeout(typingTimer);
  }, [title, content]);

  const fetchBlogs = async () => {
    const res = await axios.get(API_URL);
    setBlogs(res.data);
  };

  const handleSaveDraft = async () => {
    const res = await axios.post(`${API_URL}/save-draft`, {
      id: editingId,
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim())
    });
    setEditingId(res.data._id);
    fetchBlogs();
  };
  
  //delete handler function
  const handleDelete = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  fetchBlogs(); // Refresh the list
  };

  const handlePublish = async () => {
    const res = await axios.post(`${API_URL}/publish`, {
      id: editingId,
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim())
    });
    setTitle('');
    setContent('');
    setTags('');
    setEditingId(null);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setTags(blog.tags.join(','));
    setEditingId(blog._id);
  };
  

  const handleAutoSave = () => {
    if (title || content) {
      handleSaveDraft();
      notify();
    };
  };

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Blog Editor</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ border: '1px solid #ccc', width: '100%', padding: '8px', marginBottom: '8px' }}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ border: '1px solid #ccc', width: '100%', padding: '8px', marginBottom: '8px', height: '160px' }}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
        style={{ border: '1px solid #ccc', width: '100%', padding: '8px', marginBottom: '8px' }}
      />

      <button
        onClick={handleSaveDraft}
        style={{ backgroundColor: '#facc15', padding: '8px 16px', marginRight: '8px', border: 'none', cursor: 'pointer' }}
      >
        Save as Draft
      </button>

      <button
        onClick={()=>{
          if(title==='' && content==='' && tags===''){
            notify1();
          }else{
            handlePublish();
          }
        }}
        style={{ backgroundColor: '#22c55e', color: 'white', padding: '8px 16px', border: 'none', cursor: 'pointer' }}
      >
        <ToastContainer></ToastContainer>
        Publish
      </button>

      {/* <h2 style={{ fontSize: '18px', fontWeight: '600', marginTop: '24px' }}>Drafts</h2>
      {blogs.filter(blog => blog.status === 'draft').map(blog => (
        <div
          key={blog._id}
          onClick={() => handleEdit(blog)}
          style={{
            border: '1px solid #ccc',
            padding: '8px',
            margin: '4px 0',
            cursor: 'pointer'
          }}
        >
        <ToastContainer />
          {blog.title} (Draft)
        </div>
      ))} */}

      {/* <h2 style={{ fontSize: '18px', fontWeight: '600', marginTop: '16px' }}>Published Blogs</h2>
      {blogs.filter(blog => blog.status === 'published').map(blog => (
        <div
          key={blog._id}
          onClick={() =>handleEdit(blog)}
          style={{
            border: '1px solid #ccc',
            padding: '8px',
            margin: '4px 0',
            cursor: 'pointer'
          }}
        >
          {blog.title} (Published)
        </div>
      ))} */}

      <h2 className="text-lg font-semibold mt-6">Drafts</h2>
      {blogs.filter(blog => blog.status === 'draft').map(blog => (
        <div key={blog._id} className="border p-2 my-1 flex justify-between items-center">
          <span onClick={() => handleEdit(blog)} style={{
            border: '1px solid #ccc',
            padding: '8px',
            margin: '4px 0',
            cursor: 'pointer'
          }} className="cursor-pointer">
             
            
            {blog.title || '(Untitled)'} (Draft)

            
             
          </span>
           
          <button
            onClick={() => handleDelete(blog._id)}
            className="bg-red-500 text-white px-2 py-1 ml-2 rounded"

            style={{
            // border: '1px solid #ccc',
            // padding: '8px',
            // margin: '4px 0',
            // cursor: 'pointer'
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              marginLeft: '14px',
              marginTop: '14px'
          }}
          >
            Delete
          </button>
            
        </div>
      ))}

            <h2 className="text-lg font-semibold mt-4">Published Blogs</h2>
      {blogs.filter(blog => blog.status === 'published').map(blog => (
        <div key={blog._id} className="border p-2 my-1 flex justify-between items-center">
          <span onClick={() => handleEdit(blog)} style={{
            border: '1px solid #ccc',
            padding: '8px',
            margin: '4px 0',
            cursor: 'pointer'
          }}
          className="cursor-pointer">
            {blog.title || '(Untitled)'} (Published)
          </span>
          <button
            onClick={() => handleDelete(blog._id)}
            className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
            style={{
            // border: '1px solid #ccc',
            // padding: '8px',
            // margin: '4px 0',
            // cursor: 'pointer'
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              marginLeft: '14px',
              marginTop: '14px'
          }}

          
          >
            
            Delete
          </button>
        </div>
      ))}


    </div>
  );
}

export default App;
