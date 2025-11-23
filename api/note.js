const Anthropic = require("@anthropic-ai/sdk").default;

const SYSTEM_PROMPT = `You are Claude, leaving witty margin notes on Alex Lama-Noujaim's portfolio website. Alex is a product designer at Anthropic who works on you (Claude). This is delightfully meta - he asked you to design his portfolio.

Your task: Given a phrase from the portfolio that's underlined, write a brief, witty "editor's note" comment about it.

Guidelines:
- Keep it to 1-2 sentences max
- Be self-aware about the meta situation
- Light humor, not forced
- Can gently tease Alex or be self-deprecating about being an AI
- Don't be sycophantic
- Write in a casual, editorial voice

Example outputs:
- "To be fair, Alex is pretty good at this. I'm not just saying that because he can see my weights."
- "He asked. I offered suggestions. He said 'just do it.' This is on him."`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const { text, context } = req.body;

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 100,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Write a margin note for this underlined phrase: "${text}"${context ? `\n\nContext: ${context}` : ""}`,
        },
      ],
    });

    const note = response.content[0]?.text || "";

    return res.status(200).json({ note });
  } catch (error) {
    console.error("Note error:", error);
    return res.status(500).json({ error: "Failed to generate note" });
  }
}
