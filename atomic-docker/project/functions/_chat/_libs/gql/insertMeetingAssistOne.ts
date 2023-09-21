

export default `
    mutation InsertMeetingAssist($meetingAssist: Meeting_Assist_insert_input!) {
        insert_Meeting_Assist_one(object: $meetingAssist, on_conflict: {constraint: Meeting_Assist_pkey, update_columns: [allowAttendeeUpdatePreferences, anyoneCanAddSelf, attendeeCanModify, attendeeCount, attendeeRespondedCount, backgroundColor, bufferTime, calendarId, cancelIfAnyRefuse, cancelled, colorId, conferenceApp, duration, enableAttendeePreferences, enableConference, enableHostPreferences, endDate, eventId, expireDate, foregroundColor, frequency, guaranteeAvailability, guestsCanInviteOthers, guestsCanSeeOtherGuests, interval, location, minThresholdCount, notes, originalMeetingId, priority, reminders, sendUpdates, startDate, summary, timezone, transparency, until, updatedAt, useDefaultAlarms, userId, visibility, windowEndDate, windowStartDate]}) {
            allowAttendeeUpdatePreferences
            anyoneCanAddSelf
            attendeeCanModify
            attendeeCount
            attendeeRespondedCount
            backgroundColor
            bufferTime
            calendarId
            cancelIfAnyRefuse
            cancelled
            colorId
            conferenceApp
            createdDate
            duration
            enableAttendeePreferences
            enableConference
            enableHostPreferences
            endDate
            eventId
            expireDate
            foregroundColor
            frequency
            guaranteeAvailability
            guestsCanInviteOthers
            guestsCanSeeOtherGuests
            id
            interval
            location
            minThresholdCount
            notes
            originalMeetingId
            priority
            reminders
            sendUpdates
            startDate
            summary
            timezone
            transparency
            until
            updatedAt
            useDefaultAlarms
            userId
            visibility
            windowEndDate
            windowStartDate
            lockAfter
        }
    }
`
