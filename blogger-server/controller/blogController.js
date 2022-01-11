const express = require('express')
const app = express()
const Blog = require('../models/blogs')
const auth = require('../middleware/auth')
const multer = require('multer');

// file storage options 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  // fileFilter: fileFilter,
});
// const upload = multer({ dest: 'uploads/' });

// async - await 
app.get('/', async (req, res) => {
  try {
    // Model.find({}) -> return all data or error
    const blogs = await Blog.find({})
    res.status(200).send(blogs)
  } catch (e) {
    res.status(500).send(e)
  }
})
// async - await 
// get single blog by id
app.get('/:id', async (req, res) => {
  // read parameter from path
  const _id = req.params.id
  try {
    const blog = await Blog.findById(_id)
    if (!blog) {
      return res.status(404).send()
    }
    // console.log(blog)
    res.send(blog)
  } catch (e) {
    res.status(500).send(e)
  }
})

// async - await 
// get user blogs by author id
app.get('/userblogs/:id', async (req, res) => {
  // read parameter from path
  const author_id = req.params.id
  // console.log(req.params);
  try {
    const blogs = await Blog.find({ 'author_id': author_id })
    if (!blogs) {
      return res.status(404).send()
    }
    res.send(blogs)
  } catch (e) {
    res.status(500).send(e)
  }
})

// async - await 
// get blogs by category id
app.get('/category/:id', async (req, res) => {
  // read parameter from path
  const category = req.params.id
  // console.log(req.params);
  try {
    const blogs = await Blog.find({ 'category': category })
    if (!blogs) {
      return res.status(404).send()
    }
    res.send(blogs)
  } catch (e) {
    res.status(500).send(e)
  }
})

// async - await 
// get blogs by author id
app.get('/author/:id', async (req, res) => {
  // read parameter from path
  const author_id = req.params.id
  // console.log(req.params);
  try {
    const blogs = await Blog.find({ 'author_id': author_id })
    if (!blogs) {
      return res.status(404).send()
    }
    res.send(blogs)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.post('/', upload.single('blogImg'), async (req, res) => {
  // console.log('req.body',req.body);console.log('req.file',req.file);return false;
  const blog = new Blog({
    title: req.body.title,
    author_id: req.body.author_id,
    category: req.body.category,
    desc: req.body.desc,
    blogImg: req.file.path,
  });
  // console.log(blog);return false;
  // // insert object in mongodb
  try {
    const newBlog = await blog.save();
    const token = await newBlog.generateAuthToken();
    res.status(201).send({ newBlog, token })
  } catch (e) {
    res.status(202).send(e)
  }
})

// app.patch('/:id', auth, (req, res) => {
app.patch('/:id', upload.single('blogImg'), (req, res) => {
  // console.log('req.body',req.body);console.log('req.file',req.file);return false;
  // Model.findByIdAndUpdate -> Find data by id and update the data or return error
  const blogID = req.params.id;
  let selectedBlog;
  if (req.file) {
    selectedBlog = {
      title: req.body.title,
      category: req.body.category,
      desc: req.body.desc,
      blogImg: req.file.path,
    };
  } else {
    selectedBlog = {
      title: req.body.title,
      category: req.body.category,
      desc: req.body.desc,
    };
  }
  // console.log(selectedBlog); return false;
  Blog.findByIdAndUpdate(
    { _id: blogID },
    selectedBlog,
    { runValidators: true, useFindAndModify: false, new: true }
  )
    .then((blog) => {
      if (!blog) {
        return res.status(404).send("blog Not Found")
      }
      res.status(200).send(blog)
    })
    .catch(error => res.status(500).send(error))

})

// app.delete('/:id', auth, (req, res) => {
app.delete('/:id', (req, res) => {

  // Model.findByIdAndDelete -> Find data by id and delete the document or return error
  Blog.findByIdAndDelete(req.params.id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send("blog Not Found")
      }
      res.status(200).send(blog)
    })
    .catch(error => res.status(500).send(error))

})

app.post('/login', async (req, res) => {
  try {

    // console.log(req.body);
    // return false;
    email = req.body.email;
    password = req.body.password;

    const blog = await Blog.findByCredentials(email, password);

    if ((blog.error) && (blog.error.includes("Wrong"))) {
      res.status(202).send({ "error": blog.error })
    } else {
      const token = await blog.generateAuthToken()
      res.send({ blog, token })
    }

    //res.send(emp)
    // if response header
    // res.set({'token', token})
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = app;