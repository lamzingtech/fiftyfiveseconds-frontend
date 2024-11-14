import { FAQ } from "@/types/faq";

const faqData: FAQ[] = [
  {
    id: 1,
    quest: "What is the purpose of this video summarization app?",
    ans: "The app helps users quickly understand the content of YouTube videos by generating concise summaries creating a 30-120 secs short video. This is especially useful for lengthy videos, allowing users to get the main ideas without watching the full video(or helping in creating reels).",
  },
  {
    id: 2,
    quest: "How does the app work?",
    ans: "The app processes the audio and visuals of the video to identify key moments, topics, and themes. It then uses AI to create a summarized video that captures the main points discussed in the video.",
  },
  {
    id: 3,
    quest: "Can the app summarize any YouTube video?",
    ans: "Yes, the app can summarize most publicly available YouTube videos. However, it may have limitations with videos that are very short, have excessive background noise, or use non-standard languages.",
  },
  {
    id: 4,
    quest: "How long does it take to generate a summary?",
    ans: "The processing time depends on the length of the video. For short videos (45-60 minutes), summaries typically generate in under a minute. Longer videos may take a few minutes to process.",
  },
  {
    id: 5,
    quest: "What types of summaries can I expect?",
    ans: "You can expect two types of summaries: <br/><ul><li>Brief Summary: A concise overview of the key points (ideal for quick reading).</li><li>Detailed Summary: An in-depth breakdown covering the main sections or topics discussed.</li></ul>",
  },
  {
    id: 6,
    quest: "Is the summarization 100% accurate?",
    ans: "While the app is designed for high accuracy, summarization might miss some details or occasionally capture non-essential points. It’s always recommended to watch the original video if you need complete details.",
  },
  {
    id: 7,
    quest: "Can I customize the level of detail in the summary?",
    ans: "Yes, the app provides options to customize the length and detail of the summary, allowing users to select summaries that are either brief or more comprehensive.",
  },
  {
    id: 8,
    quest: "Does the app support multiple languages?",
    ans: "Yes, the app supports several languages for summarization, provided the video's language is clear and well-recognized by the AI model. Check the supported languages in the app settings.",
  },
  {
    id: 9,
    quest: "Can I download the summaries?",
    ans: "Yes, summary video will be sent via user’s provided email.",
  },
  {
    id: 10,
    quest: "Is the app free to use?",
    ans: "The app may offer a free version with limited features or a trial period. For full access, some features may require a subscription.",
  },
];

export default faqData;
