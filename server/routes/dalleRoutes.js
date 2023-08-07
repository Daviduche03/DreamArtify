import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("hello ArtiGen");
});

function getImage(id) {
  const options = {
    method: "GET",
    url: `https://api.prodia.com/v1/job/${id}`,
    headers: {
      accept: "application/json",
      "X-Prodia-Key": "2347e0bf-ab79-4654-817e-684f0d9e6dff",
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      return response.data.imageUrl;
    })
    .catch(function (error) {
      console.error(error);
      throw new Error(error.message);
    });
}

router.route("/").post(async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt);

    const options = {
      method: "POST",
      url: "https://api.prodia.com/v1/job",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-Prodia-Key": process.env.API_KEY,
      },
      data: {
        sampler: "DPM++ 2M Karras",
        model: "Realistic_Vision_V5.0.safetensors [614d1063]",
        prompt: prompt,
        negative_prompt: `badly drawn, nude, porn, naked, lesbians, homosexual,
        nakedness, bikini, nipples, anus, butt`,
        steps: 25,
        cfg_scale: 7,
        seed: -1,
        upscale: false,
        aspect_ratio: "portrait",
      },
    };

    const response = await axios.request(options);
    console.log(response.data);

    // Add a 10-second delay before calling getImage function
    setTimeout(async () => {
      const imageUrl = await getImage(response.data.job);
      res.status(200).json({ photo: imageUrl });
    }, 5000); // 10 seconds delay

  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
});

export default router;