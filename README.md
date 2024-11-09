
## Getting Started

```bash
cd practice-english
npx create-next-app@latest .
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Dependencies
```bash
npm install @google/generative-ai
npm install react-icons
```


## .env file
```bash
NEXT_PUBLIC_GEMINI_API_KEY = ""
```


## AI Integration (Google Gemini)

### Google Gemini API Setup

(1) Visit
```bash
https://ai.google.dev/
```
(2) Sign In => Get API key in Google AI Studio
(3) Create API key => Create API key for new project
(4) Copy/Paste API key in .env (NEXT_PUBLIC_GEMINI_API_KEY)


### Code setup

Dependency -
```bash
npm install @google/generative-ai
```

utility/GeminiAIModal.js -
```bash
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold, } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export const chatSession = model.startChat({
  generationConfig,
  safetySettings,
});
```

In Component Code -

```bash
import { chatSession } from "@/utility/GeminiAIModal";
```

```bash
const InputPrompt = "Enter your prompt here...";
const result = await chatSession.sendMessage(InputPrompt);
const textResp = await result.response.text();
console.log("textResp:", textResp);
```
