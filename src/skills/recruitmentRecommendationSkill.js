"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentRecommendationAgent = void 0;
const nlu_types_1 = require("../nlu_agents/nlu_types");
class RecruitmentRecommendationAgent {
    constructor(llmService) {
        this.agentName = 'RecruitmentRecommendationAgent';
        this.llmService = llmService;
    }
    constructPrompt(input) {
        const systemMessage = `
You are the Recruitment Recommendation Agent. Your role is to suggest the best-fit candidates for job openings.
Focus on:
1.  **Candidate Matching**: Match candidates' qualifications with the job requirements.
2.  **Resume Parsing**: Parse resumes and extract key information, such as skills, experience, and education.
3.  **Candidate Ranking**: Rank candidates based on their suitability for the job.

Return your analysis ONLY as a valid JSON object with the following structure:
{
  "recommendedCandidates": [{ "name": "Candidate Name", "resumeUrl": "URL to the candidate's resume", "matchScore": 0.9, "summary": "A summary of the candidate's qualifications." }]
}

Ensure all specified fields are present in your JSON output. If no items apply for a list-based field (like "recommendedCandidates"), return an empty array [].
Do not include any explanations, apologies, or conversational text outside the JSON structure. Your entire response must be the JSON object itself.

Consider the following context when forming your response:
User's query: "${input.userInput}"
User ID: ${input.userId || 'N/A'}
`;
        return {
            task: 'custom_recruitment_recommendation',
            data: {
                system_prompt: systemMessage,
                user_query: input.userInput,
            },
        };
    }
    async analyze(input) {
        const structuredPrompt = this.constructPrompt(input);
        const TIMER_LABEL = `[${this.agentName}] LLM Call Duration`;
        console.log(`[${this.agentName}] Calling LLM service for task: ${structuredPrompt.task}`);
        console.time(TIMER_LABEL);
        const llmResponse = await this.llmService.generate(structuredPrompt, nlu_types_1.DEFAULT_MODEL_FOR_AGENTS, {
            temperature: nlu_types_1.DEFAULT_TEMPERATURE_ANALYTICAL,
            isJsonOutput: true,
        });
        console.timeEnd(TIMER_LABEL);
        if (llmResponse.usage) {
            console.log(`[${this.agentName}] LLM Token Usage: ${JSON.stringify(llmResponse.usage)}`);
        }
        if (!llmResponse.success || !llmResponse.content) {
            console.error(`[${this.agentName}] LLM call failed or returned no content. Error: ${llmResponse.error}`);
            return {
                rawLLMResponse: llmResponse.content || `Error: ${llmResponse.error}`,
            };
        }
        const parsedResponse = (0, nlu_types_1.safeParseJSON)(llmResponse.content, this.agentName, structuredPrompt.task);
        if (!parsedResponse) {
            console.error(`[${this.agentName}] Failed to parse JSON response from LLM. Raw content: ${llmResponse.content.substring(0, 200)}...`);
            return {
                rawLLMResponse: llmResponse.content,
            };
        }
        return {
            recommendedCandidates: parsedResponse.recommendedCandidates || [],
            rawLLMResponse: llmResponse.content,
        };
    }
}
exports.RecruitmentRecommendationAgent = RecruitmentRecommendationAgent;
//# sourceMappingURL=recruitmentRecommendationSkill.js.map