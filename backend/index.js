// const express = require('express');
// const app = express();
// const port = 8080;
// const cors = require('cors');
// app.use(cors());


// app.get("/",(req,res)=>{
//     res.send("i am root");
// });

// app.listen(port,()=>{
//     console.log("listening on port 8080");
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const app = express();


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blog_editor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

app.post('/api/blogs/save-draft', async (req, res) => {
  const { id, title, content, tags } = req.body;
  const blogData = { title, content, tags, status: 'draft', updated_at: new Date() };

  let blog;
  if (id) {
    blog = await Blog.findByIdAndUpdate(id, blogData, { new: true });
  } else {
    blog = new Blog(blogData);
    await blog.save();
  }
  res.json(blog);
});

app.post('/api/blogs/publish', async (req, res) => {
  const { id, title, content, tags } = req.body;
  const blogData = { title, content, tags, status: 'published', updated_at: new Date() };

  let blog;
  if (id) {
    blog = await Blog.findByIdAndUpdate(id, blogData, { new: true });
  } else {
    blog = new Blog(blogData);
    await blog.save();
  }
  res.json(blog);
});

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json(blog); //Send JSON instead of rendering EJS
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


//delete 
// DELETE blog by ID
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting blog' });
  }
});


app.listen(5000, () => console.log('Backend running on http://localhost:5000'));

