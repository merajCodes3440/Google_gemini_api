// Make sure to include these imports:
const {GoogleGenerativeAI} = require("@google/generative-ai");
require('dotenv').config();  // what is the role of this line
const express = require("express");
const bodyParser = require("body-parser");
const app = express();  // what is the role of this line
app.use(express.json());  // what is the role of this line
app.use(bodyParser.json())   // what is the role pof this line
 
let PORT =3000
app.get("/",(req,res)=>{
    res.send("hello gemini")
})

// /api/content - me ki body me may data dal ke send kar raha kar raha hu jo ki genai() me as a parameter send kar rahe hi that data will be received in result and then we will send on end point -/api/content - res.send 

app.get("/api/content",async(req,res)=>{
    try{
        const data = req.body.question;  // what is the role of this line  (what work req done here)
        const result = await genai(data)
        res.send(
            {
            "result":result
        }
    )
    }
    catch(error){
        console.log(error)
    }
})


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "what is the meaning of meraj";

const genai = async(prompt)=>{
   try{
    const result = await model.generateContent(prompt);
   // console.log(result.response.text());
    return result.response.text();
}
   catch(err){
    console.log(err)
   }
}
//genai();

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})