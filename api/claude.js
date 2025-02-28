// Serverless function for Vercel that securely calls the Claude API
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userData, prompt } = req.body;

    // Validate the request
    if (!userData || !prompt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Call the Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY, // Use environment variable
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229', // Or use claude-3-sonnet-20240229 for faster responses
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              }
            ]
          }
        ],
        system: "You are a professional business analyst for a web development agency called SoulCountry Digital. You analyze potential client inquiries to provide useful insights for the sales team. Keep your analysis professional, specific, and actionable."
      })
    });

    // Check if the API call was successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Claude API error:', errorData);
      return res.status(response.status).json({ 
        error: 'Error from Claude API', 
        details: errorData 
      });
    }

    // Get the response data
    const data = await response.json();
    
    // Return the Claude API response
    return res.status(200).json({
      content: data.content
    });
  } catch (error) {
    console.error('Error in Claude API function:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}