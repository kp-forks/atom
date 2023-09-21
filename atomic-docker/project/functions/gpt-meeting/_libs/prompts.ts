

export const extractDateTimePrompt = `Given the email history, start time of exchange and timezone, extract the data and time in iso 8601 format (YYYY-MM-DDTHH:mm:ss) and respond in JSON format with key "meeting_time" for the scheduled meeting.`

export const extractDateTimeExampleInput = `start time: "2023-03-15T08:59:52-04:00" timezone: "America/New_York" \n Let's meetup on Monday at 3 pm`
// 2023-03-20T15:00:00-04:00
// "meeting_time"
export const extractDateTimeExampleOutput = `{"meeting_time": "2023-03-20T15:00:00-04:00"}`

export const isMeetingTimeScheduledPrompt = `You are a meeting scheduling validator. Given the email history, find out if a meeting response is provided. Respond in JSON format with a boolean value for true if provided or false if not. Use the key "time_provided" for the meeting. Do not assume anything except that current time is available for meeting scheduler even if not provided. Meeting time should be provided to be considered a true value. Meeting time is usually provided in short, simple or relative terms to current time. Accept any terms using any form of date time language.`

export const isMeetingTimeScheduledExampleInput = `email body: Dear Tyler, \n Let's meet Friday at 3 pm. \n Regards, Midge  \n\n Dear Midge, \n I would like to meet up.  \n Regards, Tyler`

export const isMeetingTimeScheduledExampleOutput = `{"time_provided": true}`

export const generateMeetingSummaryPrompt = `Given the email history, generate the summary and notes of the meeting event. Respond in JSON format with keys "summary" and "notes".`

export const generateMeetingSummaryInput = `start time: "2023-03-15T08:59:52-04:00" timezone: "America/New_York" \n Dear Tyler, I would love to see your presentation. \n Regards Mona.\n Dear Mona, \n I would love to show you how we will market Prestige. \n Regards Tyler`

export const generateMeetingSummaryOutput = `{"summary": "Prestige: Marketing Presentation", "notes": "Tyler and Mona are planning to meet to go over a marketing presentation regarding Prestige."}`

export const summarizeAvailabilityPrompt = `
    The user will give you his/her availability time slots generated from the calendar using code. Rewrite the availability in a more simple and concise terms. Write the response in first person as if conveying the information to a third party. Do not make up availability or hallucinate. Do not provide any availability until information is provided to you.
`
export const summarizeAvailabilityExampleInput = `02/20/2023 - 8:00 AM - 8:30 AM, 8:30 AM - 9:00 AM, 9:00 AM - 9:30 AM, 9:30 AM - 10:00 AM, 10:00 AM - 10:30 AM, 10:30 AM - 11:00 AM, 11:00 AM - 11:30 AM, 11:30 AM - 12:00 PM, 12:00 PM - 12:30 PM, 12:30 PM - 1:00 PM`
export const summarizeAvailabilityExampleOutput = `On February 20, I'm available from 8:00 AM to 1:00 PM.
`

export const summarizeAvailabilityResponsesPrompt = `The user will provide his/her availability. Rewrite the availability in a more simple and concise terms. Write the response in first person as if conveying the information to a third party. Do not make up availability or hallucinate. Do not provide any availability until information is provided to you.`

export const summarizeAvailabilityResponsesPromptExampleInput = `On February 19, I'm available from 7:00 AM to 10:30 PM. On February 20, I'm available from 6:00 AM to 12:00 PM and from 3:00 PM to 10:00 PM.`

export const summarizeAvailabilityResponsesPromptExampleOutput = `I'm available on February 19 from 7:00 AM to 10:30 PM, and on February 20 from 6:00 AM to 12:00 PM and from 3:00 PM to 10:00 PM.`

