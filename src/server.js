// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { OpenAI } = require("openai");

require("dotenv").config(); // Load environment variables

const apiKey = process.env.API_KEY;
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:1234",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit-form", async (req, res) => {
  try {
    const description = req.body.description;
    const style = req.body.style;
    const color = req.body.color;

    const result = await generateImage(description, style, color);

    //const result = description + " it worked";

    // Send the result back to the client
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

async function generateImage(description, style, color) {
  const openai = new OpenAI({
    apiKey: process.env.API_KEY,
  });

  const prompt = `Extremely detailed tattoo masterpiece design:${description} with a ${style} design,
   against a clean and minimalist white background and a ${color} palette for the tattoo.
  `;

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
    });

    image_url = response.data[0].url;

    console.log(image_url);
  } catch (error) {
    console.log(
      error,
      "Internal server error: failing in generating the image."
    );
  } finally {
    return image_url;
  }
}
