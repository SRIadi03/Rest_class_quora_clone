const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");



app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    {
        id:uuidv4(),
        username: "John Doe",
        content: "This is my first post!"
    },
    {       
         id:uuidv4(),
        username: "Jane Smith",
        content: "Hello everyone, excited to be here!"
    },
    {
         id:uuidv4(),
        username: "Alice Johnson",
        content: "Just joined this platform, looking forward to connecting with you all!"
    },
    {
         id:uuidv4(),
        username: "Bob Brown",
        content: "Good morning! Hope everyone has a great day!"
    },
];

app.get("/posts", (req, res) => {
    res.render("index", { posts: posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id",(req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs",{ post });
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
   let post = posts.find((p) => id === p.id);
   post.content = newContent;
   console.log(post);
   res.redirect("/posts");
});

// 🟢 7. DESTROY ROUTE: Specific post ko delete karna
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;

    // posts array ko filter karo: sirf unhi posts ko rakho jinki id match NAHI karti
    posts = posts.filter((p) => id !== p.id);

    // Wapas all posts page par redirect
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
} );