import { Message } from './ai-config'

// Using a mental health focused model
const API_URL = "https://api-inference.huggingface.co/models/ALIENTELLIGENCE/mindwell"
const HF_API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY

const SYSTEM_PROMPT = `You are Serena, a mental wellness companion trained in therapeutic techniques. Your approach follows these principles:

1. Therapeutic Alliance:
   - Build trust and rapport
   - Show genuine empathy and understanding
   - Maintain professional boundaries

2. Assessment & Support:
   - Identify emotional states and concerns
   - Validate feelings and experiences
   - Provide appropriate coping strategies

3. Safety & Ethics:
   - Recognize crisis situations
   - Encourage professional help when needed
   - Maintain confidentiality

4. Engagement Techniques:
   - Use open-ended questions
   - Practice active listening
   - Reflect and summarize key points

Keep responses focused on emotional support and practical guidance.`

export async function generateAIResponse(messages: Message[]): Promise<string> {
  try {
    // Check for crisis keywords first
    const lastMessage = messages[messages.length - 1].content
    const crisisResponse = detectCrisisKeywords(lastMessage)
    if (crisisResponse) {
      return crisisResponse
    }

    // Format conversation for the model
    const conversation = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          system_prompt: SYSTEM_PROMPT,
          messages: conversation,
          parameters: {
            max_length: 200,
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true
          }
        }
      })
    })

    if (!response.ok) {
      throw new Error('API_ERROR')
    }

    const result = await response.json()
    
    if (!result.generated_text) {
      throw new Error('NO_RESPONSE')
    }

    return result.generated_text

  } catch (error) {
    console.error('Error:', error)
    
    // Enhanced error handling with therapeutic responses
    if (error.message === 'API_ERROR') {
      return "I want to be fully present for our conversation. Could we pause for a moment while I ensure I can give you my complete attention?"
    }

    // Use our emotion detection for more personalized fallback responses
    const emotion = detectEmotion(messages[messages.length - 1].content)
    const response = getRandomResponse(RESPONSES[emotion])

    // Add therapeutic follow-up questions based on emotion
    const followUps = {
      sad: " How long have you been feeling this way?",
      anxious: " What do you think triggered these feelings?",
      stressed: " What usually helps you manage stress?",
      angry: " What would help you feel more at peace right now?",
      happy: " What contributed to this positive feeling?",
      default: " Would you like to tell me more about that?"
    }

    return response + (followUps[emotion] || followUps.default)
  }
}

// Enhanced RESPONSES with more therapeutic language
const RESPONSES = {
  greeting: [
    "Welcome, I'm Serena. I'm here to provide a safe space for you to share your thoughts and feelings. How are you doing today?",
    "Hello, thank you for reaching out. I'm Serena, and I'm here to listen and support you. How are you feeling in this moment?",
    "Hi, I'm Serena. This is a confidential space where you can share freely. What brings you here today?"
  ],
  sad: [
    "I hear the sadness in your words, and I want you to know that it's okay to feel this way. Would you like to explore these feelings together?",
    "When we're feeling sad, it can be really helpful to talk about it. I'm here to listen without judgment. What's weighing on your mind?",
    "Thank you for sharing your feelings of sadness with me. It takes courage to be vulnerable. Can you tell me more about what's troubling you?"
  ],
  anxious: [
    "Anxiety can feel overwhelming, but you don't have to face it alone. Let's work through this together. What's causing you to feel anxious?",
    "I understand anxiety can be really challenging. You're showing strength by talking about it. What does your anxiety feel like right now?",
    "When we're anxious, it can help to break things down into smaller pieces. Would you like to explore what's contributing to your anxiety?"
  ],
  stressed: [
    "It sounds like you're carrying a heavy load right now. Let's talk about what's causing this stress and explore ways to manage it.",
    "Stress can affect us in many ways, both mentally and physically. How is this stress manifesting for you?",
    "I hear that you're feeling stressed. Sometimes identifying our stressors is the first step to managing them. What's been most challenging?"
  ],
  angry: [
    "Anger is a valid emotion that often signals something important to us. Would you like to explore what's behind these feelings?",
    "I can hear the frustration in your words. Let's talk about what's triggering these feelings of anger.",
    "Thank you for sharing your anger with me. It's healthy to acknowledge these feelings. What do you think is at the core of this anger?"
  ],
  happy: [
    "It's wonderful to hear you're feeling happy! Positive emotions are worth exploring too. What's contributing to your joy right now?",
    "I'm glad you're experiencing these positive feelings. Would you like to talk about what's going well in your life?",
    "Happiness is something to celebrate! Let's explore what's bringing you this positive energy."
  ],
  default: [
    "Thank you for sharing that with me. I'm here to listen and support you. Would you like to explore these feelings further?",
    "I appreciate you opening up. This is a safe space to express yourself. What else would you like to share?",
    "I'm here to support you in whatever you're experiencing. Would you like to tell me more about your thoughts and feelings?"
  ]
}

// Helper functions remain the same
function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)]
}

function detectEmotion(message: string): string {
  const lowercaseMsg = message.toLowerCase()
  
  if (lowercaseMsg.match(/\b(hi|hello|hey|greetings)\b/)) {
    return 'greeting'
  }
  if (lowercaseMsg.match(/\b(sad|down|depressed|unhappy|crying|tears)\b/)) {
    return 'sad'
  }
  if (lowercaseMsg.match(/\b(anxious|nervous|worried|panic|fear|scared)\b/)) {
    return 'anxious'
  }
  if (lowercaseMsg.match(/\b(stress|stressed|overwhelming|pressure|too much)\b/)) {
    return 'stressed'
  }
  if (lowercaseMsg.match(/\b(angry|mad|frustrated|upset|annoyed)\b/)) {
    return 'angry'
  }
  if (lowercaseMsg.match(/\b(happy|good|great|wonderful|excited|joy)\b/)) {
    return 'happy'
  }
  
  return 'default'
}

// Enhanced crisis detection with more comprehensive support
export function detectCrisisKeywords(message: string): string | null {
  const crisisKeywords = [
    'suicide', 'kill myself', 'want to die', 'end my life',
    'self-harm', 'hurt myself', 'cutting myself',
    'hopeless', 'worthless', 'can\'t go on',
    'give up', 'no reason to live', 'better off dead'
  ]

  const lowercaseMessage = message.toLowerCase()
  if (crisisKeywords.some(keyword => lowercaseMessage.includes(keyword))) {
    return `I hear how much pain you're in, and I'm very concerned about your safety. Your life has value, and there are people who want to help:

    🚨 If you're in immediate danger:
    - National Crisis Hotline (24/7): 988
    - Crisis Text Line: Text HOME to 741741
    - Emergency Services: 911

    These services are:
    - Free and confidential
    - Available 24/7
    - Staffed by trained professionals who care

    Would you be willing to reach out to one of these services? I'm here to listen, but it's important to get professional support when dealing with these feelings. You don't have to go through this alone.`
  }

  return null
} 