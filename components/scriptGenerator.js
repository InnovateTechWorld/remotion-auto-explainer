const { GoogleGenAI } = require("@google/genai");

async function generate(userPrompt) {
  const num_scenes = 4;
  const target_duration = 120;
  const words_per_scene = 50; // Fixed 50 words per scene for better pacing

  const section_prompts = [
    "Scene 1: Introduction and Overview",
    "Scene 2: Key Concepts and Details",
    "Scene 3: Step-by-Step Explanation",
    "Scene 4: Conclusion and Summary"
  ];

  const script_prompt = `
        Create a PRECISELY timed educational script for a ${target_duration}-second video based on: "${userPrompt}"

        CRITICAL VISUAL REQUIREMENTS:
        - The GENERATED IMAGE is the PRIMARY educational visual element (85% of learning)
        - On-screen TEXT is MINIMAL (3-5 words maximum per scene with emojis)
        - The image description MUST be extremely detailed and comprehensive
        - The image should be AS EXPLANATORY as the narration itself
        - IMAGE FORMAT: Rectangular (16:9 aspect ratio), containing TWO side-by-side diagrams/figures
        - CANVAS SIZE: Design for 1280x720 resolution - ensure ALL content fits perfectly within this frame.
        - LAYOUT: Two diagrams side-by-side with GENEROUS spacing between them (at least 50px gap in center). Each diagram should be well-spaced and not cramped.
        - INCLUDE TEXT LABELS in the image for clarity and educational value
        - Each diagram should have descriptive text explaining key concepts
        - BACKGROUND MUST BE STRICTLY PURE WHITE - no black, dark, or mixed backgrounds
        - START MINIMAL: Scene 1 should show basic/simple concepts, then progressively add complexity
        - MAKE IMAGES VERY CLEAR: Use thick, bold lines, large text, high contrast for maximum visibility
        - PROGRESSIVE REVEAL: Each scene builds on the previous one visually
        - FIT TO FRAME: CRITICAL - ensure the entire composition fits within the 1280x720 canvas with NO elements cut off or extending outside.
        - MARGINS: Leave generous white space around all elements to prevent cutoff and enhance visual appeal.
        - SCALING: Size all elements to fit comfortably within their designated areas without overflow.

        STRICT REQUIREMENTS:
        - Total duration: EXACTLY ${target_duration} seconds (under 2 minutes).
        - Total scenes: EXACTLY ${num_scenes}.
        - Each scene must have a narration of EXACTLY ${words_per_scene} words.
        - Each scene MUST have on-screen text of EXACTLY 3-5 words (including 1-2 emojis).
        - Natural flowing narration with EXAMPLES and clear explanations.
        - NO EMOJIS in narration - but REQUIRED in on-screen text.
        - Narration MUST directly describe and explain what is VISUALLY shown in the image.

        SECTION BREAKDOWN:
        ${section_prompts.join('\n')}

        PROGRESSIVE VISUAL COMPLEXITY:
        - Scene 1: Show the MOST BASIC concept with minimal elements (1-2 key items)
        - Scene 2: Add 1-2 more elements to build understanding
        - Scene 3: Introduce more detailed relationships and processes
        - Scene 4: Show full concept with all interconnected elements

        CRITICAL:
        1. Count words carefully. Each narration section must have the EXACT word count specified.
        2. On-screen text MUST be 3-5 words maximum with emojis inside the text.
        3. Drawing descriptions MUST be extremely detailed and comprehensive (the image is the main teacher!).
        4. IMAGE MUST be rectangular with TWO side-by-side educational diagrams/figures.
        5. INCLUDE clear text labels and explanations within the image itself.
        6. BACKGROUND MUST BE PURE WHITE ONLY.
        7. Ensure precise timing: The narration must be paced to fit EXACTLY within the scene duration for perfect sync.
        8. The narration MUST directly explain and describe the specific visual elements shown in the corresponding drawing description - they must be perfectly complementary.
        9. USE EXAMPLES in narration to make concepts clearer and more relatable.
        10. START MINIMAL: Each scene should progressively reveal more complexity visually.
        11. MAXIMUM CLARITY: Use thick lines, large bold text, high contrast for crystal-clear visibility.
        `;

  const textPrompt = script_prompt;
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: "text/plain",
  };
  const model = "gemini-2.5-flash";

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
    "narration": "Ever wondered how plants make their own food? Let's dive into photosynthesis! This amazing process allows green plants to convert light energy into chemical energy.",
    "on_screen_text": "🌱 Plant Magic! 🌞",
    "image_prompt": "Create a detailed educational drawing-style image with two side-by-side diagrams: Left diagram shows a green plant with leaves absorbing sunlight rays, water droplets rising from roots, and CO2 molecules entering the leaves, with labels 'Sunlight Energy', 'Water Uptake', 'CO2 Input'. Right diagram displays the chemical equation CO2 + H2O + sunlight → C6H12O6 + O2 with arrows and molecules, labeled 'Photosynthesis Reaction'. All in clean black, blue, purple lines on pure white background, rectangular format."
  },
  {
    "narration": "Photosynthesis occurs in the chloroplasts within plant cells. Chlorophyll, the green pigment, captures sunlight and uses it to combine carbon dioxide from the air with water from the soil.",
    "on_screen_text": "🔬 Inside the Leaf! 🧬",
    "image_prompt": "Create a detailed educational drawing-style image with two side-by-side diagrams: Left diagram shows cross-section of a leaf with chloroplasts as green ovals, chlorophyll molecules as dots, sunlight arrows penetrating, CO2 arrows entering, labeled 'Leaf Cross-Section'. Right diagram illustrates chloroplast interior with thylakoid membranes and grana stacks, labeled 'Chloroplast Structure'. All in black, purple, blue lines on pure white background, rectangular format with explanatory text."
  },
  {
    "narration": "Through a series of chemical reactions, glucose is produced as food for the plant, while oxygen gas is released as a byproduct. This oxygen is what we breathe to stay alive.",
    "on_screen_text": "⚗️ Chemical Magic! 🌿",
    "image_prompt": "Create a detailed educational drawing-style image with two side-by-side diagrams: Left diagram shows light-dependent reactions with photosystems capturing light photons, labeled 'Light Reactions'. Right diagram displays the Calvin cycle producing glucose with CO2 fixation, labeled 'Calvin Cycle'. Include text labels for ATP, NADPH, and glucose, all in blue, black, purple lines on pure white background, rectangular format."
  },
  {
    "narration": "Photosynthesis is crucial for life on Earth, providing food and oxygen. Without it, our planet would be very different. Understanding this process helps us appreciate nature's incredible balance.",
    "on_screen_text": "🌍 Earth's Balance! ✨",
    "image_prompt": "Create a detailed educational drawing-style image with two side-by-side diagrams: Left diagram shows plants absorbing CO2 and releasing O2, animals doing the reverse, labeled 'Gas Exchange'. Right diagram displays interconnected cycle of plants, animals, atmosphere with arrows showing carbon and oxygen flow, labeled 'Biosphere Balance'. Include explanatory text about the cycle, all in black, purple, blue lines on pure white background, rectangular format."
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
