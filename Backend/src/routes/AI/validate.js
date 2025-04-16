const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const QAModel = require("../../models/Questions");
const use = require("@tensorflow-models/universal-sentence-encoder");
const tf = require("@tensorflow/tfjs");

tf.setBackend("cpu"); // Ensure TensorFlow runs on CPU

const router = express.Router();
dotenv.config();
router.use(cors());
router.use(express.json());

// Load Universal Sentence Encoder (USE) Model
let model;
let modelLoaded = false;

async function loadUSEModel() {
  model = await use.load();
  modelLoaded = true;
  console.log("✅ USE Model loaded!");
}
loadUSEModel();

// Function to compute semantic similarity
async function calculateSemanticSimilarity(sentence1, sentence2) {
  if (!modelLoaded) {
    console.error("❌ Model not loaded yet!");
    return 0;
  }

  const embeddings = await model.embed([sentence1, sentence2]);
  const vec1 = embeddings.arraySync()[0];
  const vec2 = embeddings.arraySync()[1];

  const dotProduct = vec1.reduce((sum, value, i) => sum + value * vec2[i], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((sum, value) => sum + value * value, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((sum, value) => sum + value * value, 0));

  return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
}

router.post("/", async (req, res) => {
  const { jobRole, experience, techStack, userAnswers } = req.body;

  console.log("📝 Received User Answers:");
  console.log(userAnswers);

  try {
    if (!modelLoaded) {
      return res.status(503).json({ error: "Model is still loading. Try again later." });
    }

    const storedQA = await QAModel.findOne({ jobRole, experience, techStack });

    if (!storedQA) {
      return res.status(404).json({ error: "No question-answer pair found for the given job role, experience, and tech stack." });
    }

    const feedbackPromises = storedQA.questions.map(async (qa, index) => {
      const userAnswer = userAnswers[index]?.answer?.trim() || "";
      const correctAnswer = qa.answer.trim();

      const similarityScore = await calculateSemanticSimilarity(userAnswer, correctAnswer);
      let feedbackText = "";

      if (similarityScore > 0.8) {
        feedbackText = "✅ Correct!";
      } else if (similarityScore > 0.5) {
        feedbackText = `⚠️ Partially correct! Your answer is close, but not exact. The correct answer is: ${correctAnswer}`;
      } else {
        feedbackText = `❌ Incorrect! The correct answer is: ${correctAnswer}`;
      }

      return {
        question: qa.question,
        userAnswer,
        correctAnswer,
        similarityScore,
        feedback: feedbackText,
      };
    });

    const feedback = await Promise.all(feedbackPromises);
    res.json({ feedback });

  } catch (error) {
    console.error("❌ Error validating answers:", error);
    res.status(500).json({ error: error.message || "An error occurred" });
  }
});

module.exports = router;