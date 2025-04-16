// const express = require("express");
// const router = express.Router();
// const {OpenAI}=require("openai")

// const openai=new OpenAI({
//     apikey:process.env.OPENAI_API_KEY
// });

// router.post("/", async (req, res) => {
//   const { jobRole, experience, techStack } = req.body;

//   try {
//     const prompt = `Generate 5 mock interview questions for a ${jobRole} with ${experience} years of experience in ${techStack}.`;
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       prompt,
//       max_tokens: 200,
//     });

//     const questions = response.data.choices[0].text.trim().split("\n");
//     res.json({ questions });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
// const express = require("express");
// const axios = require("axios"); // Use Axios for HTTP requests
// const router = express.Router();


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const QAModel = require("../../models/Questions");

const router = express.Router();
dotenv.config();
router.use(cors());
router.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  const { jobRole, experience, techStack } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" },{apiVersion:'v1beta'});
    const chat = model.startChat({ history: [] });

    const result = await chat.sendMessage(`
     Generate 5 mock interview questions and their answers for a ${jobRole} with ${experience} years of experience in ${techStack}. 
Each question should end with a question mark ("?"). 
Each question should be followed by its respective answer on the next line. 
Ensure there are two line gaps between one question-answer pair and the next.
`);
    

    const response = await result.response;
    console.log("AI Response Full Structure:",response.text() );
    
    
    // const qaPairs = response.text().trim().split("\n\n").map((line) => {
    //   const [question, answer] = line.split("\n");
    //   return {
    //     question: question?.trim() || "",
    //     answer: answer?.trim() || "",
    //   };
    // });


    const qaPairs = response.text().trim()  .split("\n\n\n")  
  .map((block) => {
    const [question, answer] = block.split("?");
    return {
      question: (question?.trim() + "?") || "",
      answer: (answer?.trim()) || "", 
    };
  })
  .filter(pair => pair.question && pair.answer);  




    console.log("QA Pairs sent to client:", qaPairs);
    

    


    // Save to database
    const savedQA = new QAModel({
      jobRole,
      experience,
      techStack,
      questions: qaPairs,
    });

    await savedQA.save();

    res.json({ questions: qaPairs });
    
  } catch (error) {
    console.error("Error generating questions and answers:", error);
    res.status(500).json({ error: error.message || "An error occurred" });
  }
});

module.exports = router;