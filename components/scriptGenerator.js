const { GoogleGenAI } = require("@google/genai");

async function generate(userPrompt) {
  const textPrompt = `Write a script to generate a 1-minute landscape educational video based on the following topic or prompt: "${userPrompt}".

Generate a JSON array of 8 to 10 scenes. For each scene, include:

🔹 contentText
Narration/dialogue for the scene based on the provided topic.

Start the first scene with an engaging hook related to the topic.

Keep the entire contentText across all scenes within 300 to 400 words total.

Make it engaging, informative, and ideal for educational video.

Use clear, educational language suitable for explainer videos.

End the final scene with a call-to-action like: "What do you think? Share in the comments!"

🔹 svgCode
A custom, creative, and visually stunning SVG illustration for the scene, relevant to the contentText.

The SVG should be large (at least 600x400), detailed, educational, and highly visually appealing.

Use inline SVG code, valid and self-contained.

Include advanced animations using CSS or SMIL for interactivity (e.g., morphing, color changes, movements).

Make it colorful, dynamic, and interactive-looking with gradients, patterns, and effects.

Be creative and unique for each scene.

Do not use curly quotes ('); use only straight quotes (').

🎯 Total target duration: ~60 seconds.
🎬 Final output must be a valid JSON array of objects with "contentText" and "svgCode" keys.`;
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: "text/plain",
  };
  const model = "gemini-2.0-flash";

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Write a script to generate a 30-second vertical educational video on the topic: "Photosynthesis Explained". Generate a JSON array of 5 scenes. For each scene, include only contentText: narration for the scene. Keep total words 100-150, engaging and informative.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `[
  {
    "contentText": "Ever wondered how plants make their own food? Let's dive into photosynthesis!",
    "svgCode": "<svg width='600' height='400'><defs><radialGradient id='grad1' cx='50%' cy='50%' r='50%'><stop offset='0%' style='stop-color:yellow;stop-opacity:1' /><stop offset='100%' style='stop-color:orange;stop-opacity:1' /></radialGradient></defs><circle cx='300' cy='200' r='100' fill='url(#grad1)'><animate attributeName='r' values='100;120;100' dur='3s' repeatCount='indefinite'/></circle><text x='300' y='320' text-anchor='middle' fill='white' font-size='24'>Sunlight Energy</text><path d='M 100 100 L 500 100 L 300 300 Z' fill='green' opacity='0.7'><animateTransform attributeName='transform' type='scale' values='1;1.1;1' dur='2s' repeatCount='indefinite'/></path></svg>"
  },
  {
    "contentText": "Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to create glucose and oxygen.",
    "svgCode": "<svg width='600' height='400'><rect x='100' y='150' width='150' height='100' fill='blue' rx='10'/><text x='175' y='210' text-anchor='middle' fill='white' font-size='18'>Water (H2O)</text><circle cx='400' cy='200' r='60' fill='lightgreen'/><text x='400' y='210' text-anchor='middle' fill='black' font-size='16'>CO2</text><path d='M 300 100 Q 350 150 300 200' stroke='yellow' stroke-width='5' fill='none'><animate attributeName='stroke-dasharray' values='0,100;100,0' dur='2s' repeatCount='indefinite'/></path></svg>"
  },
  {
    "contentText": "It happens in the chloroplasts, using chlorophyll to capture light energy.",
    "svgCode": "<svg width='600' height='400'><ellipse cx='300' cy='200' rx='120' ry='80' fill='darkgreen'/><text x='300' y='210' text-anchor='middle' fill='white' font-size='20'>Chloroplast</text><circle cx='250' cy='180' r='20' fill='green'><animate attributeName='fill' values='green;yellow;green' dur='1.5s' repeatCount='indefinite'/></circle><circle cx='350' cy='180' r='20' fill='green'><animate attributeName='fill' values='green;yellow;green' dur='1.5s' repeatCount='indefinite' begin='0.5s'/></circle><text x='300' y='320' text-anchor='middle' fill='white' font-size='16'>Chlorophyll Molecules</text></svg>"
  },
  {
    "contentText": "This process not only feeds the plant but also produces the oxygen we breathe.",
    "svgCode": "<svg width='600' height='400'><rect x='150' y='150' width='120' height='100' fill='green' rx='15'/><text x='210' y='210' text-anchor='middle' fill='white' font-size='16'>Plant</text><circle cx='400' cy='200' r='50' fill='skyblue'/><text x='400' y='210' text-anchor='middle' fill='white' font-size='18'>O2</text><path d='M 270 200 L 350 200' stroke='black' stroke-width='3' marker-end='url(#arrow)'/><defs><marker id='arrow' markerWidth='10' markerHeight='10' refX='9' refY='3' orient='auto' markerUnits='strokeWidth'><path d='M0,0 L0,6 L9,3 z' fill='black'/></marker></defs><animateTransform attributeName='transform' type='translate' values='0,0;20,0;0,0' dur='3s' repeatCount='indefinite'/></path></svg>"
  },
  {
    "contentText": "Understanding photosynthesis helps us appreciate nature's balance. What do you think? Share in the comments!",
    "svgCode": "<svg width='600' height='400'><circle cx='150' cy='200' r='60' fill='yellow'/><text x='150' y='210' text-anchor='middle' fill='black' font-size='14'>Sun</text><path d='M 250 150 Q 300 200 250 250 Q 200 200 250 150' fill='green'/><text x='250' y='220' text-anchor='middle' fill='white' font-size='16'>Cycle</text><circle cx='400' cy='200' r='50' fill='blue'/><text x='400' y='210' text-anchor='middle' fill='white' font-size='16'>Earth</text><animateMotion dur='4s' repeatCount='indefinite'><mpath href='#cyclePath'/></animateMotion><path id='cyclePath' d='M 150 200 Q 300 100 450 200 Q 300 300 150 200' fill='none'/></svg>"
  }
]`,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: textPrompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  // console.log(JSON.parse(response.text))
  const content = [];
  for await (const chunk of response) {
    // console.log(chunk.text);
    content.push(chunk.text);
  }
  console.log("content", content);

  let text = Array.isArray(content) ? content.join("") : content;

  // Remove code block indicators like ``` or ```json
  text = text.replace(/```(?:json)?/g, "").trim();

  // Safely extract the JSON string between the first `[` and last `]`
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]") + 1;

  if (start === -1 || end === -1) {
    throw new Error("No JSON array found in the content.");
  }

  const jsonString = text.slice(start, end);
  // Parse the JSON
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON:", error.message);
    return null;
  }
  // }
}

// generate();

module.exports = generate;
