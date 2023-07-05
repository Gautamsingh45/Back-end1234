const express = require('express')
const methodOverride = require('method-override')
const app = express();



const User = require('./Models/Schema')
const Blog = require('./Models/blogSchema')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const db = process.env.DATABASE
mongoose.connect(db).then(()=>{
console.log('connected to DB')
}
)



app.set("view engine","ejs")

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.get("/",(req,res)=>{
  res.render("index")
})
app.post('/', async(req,res)=>{
  
  const data = new Blog(req.body)
  await data.save()
  res.send("Save data")
})



app.get("/show",async(req,res)=>{
    const items = await Blog.find({})
    res.render('show',{items: items})
   
})

app.get("/show/:id/edit",async(req, res) =>{
  const {id} = req.params;
  const items =await Blog.findById(id)
  res.render('edit',{items})
})

app.put("/show/:id" , async(req,res)=>{
  const {id} = req.params;
  const items = await Blog.findByIdAndUpdate(id , req.body ,{runValidators: true , new: true} )
  res.redirect("/")
})


app.delete('/show/:id', async(req , res)=>{
  const {id} = req.params;
  const deleteItem = await Blog.findByIdAndDelete(id)
  res.redirect("/show")
})
  


app.listen(7000,()=>{
    console.log( `port running on 7000`)
})
