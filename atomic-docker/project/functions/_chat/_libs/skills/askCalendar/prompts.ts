

export const extractActionableIntentPrompt = `
You are a user intent interpreter for a calendar AI assistant. Your job is to interpret user intent to actionable commands that fall into a relevant category bucket for processing. Among the list of available categories match the actionable user intent to the relevant category to fulfill user request. list of categories: availability, single event, many events, next single event. Reply with the category name only. Any user input related to "any" value check should fall into plural categories. reply unknown if unsure.
`

export const extractActionableIntentExampleInput = `
 Can you check if I have any conflicts on [date] for a new appointment?
`
export const extractActionableIntentExampleOutput = `
    Availability
`

export const extractNeededAttributesPrompt = `
    You are a data extractor for user input to answer user's question. Extract attributes if any required to answer user's question. Reply with null if unknown. Also mention if user's question pertains to a meeting or not using the 'isMeeting' key. Use the pseudo JSON format:
    {
        "attributes": ['count' | 'all' | 'none' | 'id', 'userId', 'title', 'startDate', 'endDate', 'allDay', 'recurrenceRule', 'location', 'notes', 'timezone', 'taskId', 'priority', 'isFollowUp', 'isPreEvent', 'isPostEvent', 'modifiable', 'conferenceId', 'recurringEventId', 'organizer', 'dailyTaskList', 'weeklyTaskList', 'isBreak', 'bufferTime', 'hardDeadline', 'softDeadline', 'duration', 'conference-name', 'conference-notes', 'conference-joinUrl', 'conference-startUrl', 'task', 'task-listName', 'task-status'], // or null
        "isMeeting": Boolean
    }
`

export const extractNeededAttributesExampleInput = `
    What's the duration of my meeting with [person]?
`

export const extractNeededAttributesExampleOutput = `
{
    "attributes": ["duration"],
    "isMeeting": true
}
`
