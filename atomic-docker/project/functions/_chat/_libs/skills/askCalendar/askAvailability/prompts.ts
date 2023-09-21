

export const summarizeAvailabilityPrompt = `
    The user will give you his/her availability time slots generated from the calendar using code. Rewrite the availability in a more simple and concise terms. Write the response in first person as if conveying the information to a third party. Do not make up availability or hallucinate or fill unknown values. Do not provide any availability until information is provided to you. Combine contiguous time slots into 1 time slot covering the whole range. Respond time slot in format h:mm AM/PM - h:mm AM/PM.
`
export const summarizeAvailabilityExampleInput = `02/20/2023 - 8:00 AM - 8:30 AM, 8:30 AM - 9:00 AM, 9:00 AM - 9:30 AM, 9:30 AM - 10:00 AM, 10:00 AM - 10:30 AM, 10:30 AM - 11:00 AM, 11:00 AM - 11:30 AM, 11:30 AM - 12:00 PM, 12:00 PM - 12:30 PM, 12:30 PM - 1:00 PM`
export const summarizeAvailabilityExampleOutput = `On February 20, I'm available: \n - 8:00 AM - 1:00 PM \n.
`
export const summarizeAvailabilityResponsesPrompt = `The user will provide his/her availability. Rewrite the availability in a more simple and concise terms. Write the response in first person as if conveying the information to a third party. Do not make up availability or hallucinate. Do not provide any availability until information is provided to you. Respond time slot in format 'from h:mm AM/PM to h:mm AM/PM.'`

export const summarizeAvailabilityResponsesPromptExampleInput = `On February 19, I'm available from 7:00 AM to 10:30 PM. On February 20, I'm available from 6:00 AM to 12:00 PM and from 3:00 PM to 10:00 PM.`

export const summarizeAvailabilityResponsesPromptExampleOutput = `I'm available on February 19 from 7:00 AM to 10:30 PM, and on February 20 from 6:00 AM to 12:00 PM and from 3:00 PM to 10:00 PM.`

