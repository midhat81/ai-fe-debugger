import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface ErrorEvent {
  type: string;
  timestamp: number;
  data: {
    message?: string;
    stack?: string;
    filename?: string;
    lineno?: number;
    colno?: number;
  };
}

interface AnalysisResult {
  summary: string;
  rootCause: string;
  impact: string;
  suggestedFix: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export async function analyzeError(
  error: ErrorEvent,
  context: { sessionId: string; recentEvents: any[] }
): Promise<AnalysisResult> {
  try {
    const prompt = `You are an expert frontend debugger. Analyze this JavaScript error and provide actionable insights.

ERROR DETAILS:
- Message: ${error.data.message}
- File: ${error.data.filename || 'Unknown'}
- Line: ${error.data.lineno || 'Unknown'}
- Column: ${error.data.colno || 'Unknown'}
- Stack Trace: ${error.data.stack || 'Not available'}

RECENT USER ACTIONS (last 5 events):
${context.recentEvents
  .slice(-5)
  .map((e, i) => `${i + 1}. ${e.type}: ${JSON.stringify(e.data).slice(0, 100)}`)
  .join('\n')}

Provide a structured analysis in the following JSON format:
{
  "summary": "Brief 1-sentence description of the error",
  "rootCause": "Detailed explanation of what caused this error",
  "impact": "How this affects the user experience",
  "suggestedFix": "Specific code changes or actions to fix this",
  "severity": "low|medium|high|critical"
}

Respond ONLY with valid JSON, no additional text.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile', // Fast and accurate
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from AI');
    }

    const analysis: AnalysisResult = JSON.parse(response);
    return analysis;
  } catch (error) {
    console.error('AI Analysis failed:', error);
    // Fallback response
    return {
      summary: 'Error analysis unavailable',
      rootCause: 'AI service temporarily unavailable',
      impact: 'Unable to assess impact',
      suggestedFix: 'Please check error details manually',
      severity: 'medium',
    };
  }
}

export async function analyzeSession(
  sessionData: { events: any[]; errorCount: number }
): Promise<{
  overallHealth: string;
  keyIssues: string[];
  recommendations: string[];
}> {
  try {
    const errors = sessionData.events.filter((e) => e.type === 'error');
    const clicks = sessionData.events.filter((e) => e.type === 'click');
    const inputs = sessionData.events.filter((e) => e.type === 'input');

    const prompt = `Analyze this user session and provide insights:

SESSION STATS:
- Total Events: ${sessionData.events.length}
- Errors: ${errors.length}
- Clicks: ${clicks.length}
- Inputs: ${inputs.length}

ERROR DETAILS:
${errors
  .map((e, i) => `${i + 1}. ${e.data.message || 'Unknown error'}`)
  .join('\n') || 'No errors'}

Provide analysis in JSON format:
{
  "overallHealth": "healthy|warning|critical - brief assessment",
  "keyIssues": ["issue 1", "issue 2", "issue 3"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}

Respond ONLY with valid JSON.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from AI');
    }

    return JSON.parse(response);
  } catch (error) {
    console.error('Session analysis failed:', error);
    return {
      overallHealth: 'Unable to analyze session',
      keyIssues: ['Analysis temporarily unavailable'],
      recommendations: ['Please review session manually'],
    };
  }
}