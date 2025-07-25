import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from "dotenv";
dotenv.config();
import Roadmap from '../models/roadmapmodel.js';

const functionDefinition = {
  name: "generateRoadmap",
  parameters: {
    type: "object",
    properties: {
      title: { type: "string" },
      phases: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string" },
            steps: {
              type: "array",
              items: { type: "string" }
            },
            suggestion: { type: "string" }
          }
        }
      }
    },
    required: ["title", "phases"]
  }
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateRoadmap = async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{
        text: `Act as a project guide. Generate a detailed roadmap for: "${topic}". For each phase and step, suggest the most suitable tools, frameworks, or technologies (such as MERN, React, Java, etc.) that would help accomplish that step. Present the roadmap as a structured list with tool recommendations included for every step.`
        }]
      }],
      tools: [{ functionDeclarations: [functionDefinition] }]
    });
    console.log('AI Response:', result);
    const response = result.response;
    const data = response.candidates?.[0]?.content?.parts?.[0]?.functionCall?.args;
    console.log(data);

    if (data && data.title && Array.isArray(data.phases)) {
      // Save to DB
      const roadmap = new Roadmap({ title: data.title, phases: data.phases });
      await roadmap.save();
      // Return the saved roadmap, which includes the _id
      res.json(roadmap);
      // console.log('Generated Roadmap:', roadmap.title, roadmap);
    } else {
      res.status(500).json({ error: 'AI did not return expected roadmap structure.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'AI failed to generate roadmap', detail: err.message });
  }
};
