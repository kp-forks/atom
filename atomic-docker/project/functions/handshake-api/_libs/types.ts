
export type HH = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23'
export type MM = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'

export type Time = `${HH}:${MM}`

export type RecurrenceFrequencyType = 'daily' | 'weekly'
    | 'monthly' | 'yearly'

export type appType = 'zoom' | 'google'

export type BufferTimeNumberType = {
    beforeEvent: number
    afterEvent: number
}


export type MeetingAssistType = {
    id: string,
    eventId?: string,
    userId: string,
    summary?: string,
    notes?: string,
    windowStartDate: string,
    windowEndDate: string,
    timezone?: string,
    location?: object,
    priority: number,
    enableConference: boolean,
    conferenceApp?: appType,
    sendUpdates?: 'all' | 'externalOnly' | 'none',
    guestsCanInviteOthers: boolean,
    transparency?: 'opaque' | 'transparent',
    visibility?: 'default' | 'public' | 'private',
    createdDate: string,
    updatedAt: string,
    colorId?: string,
    backgroundColor?: string,
    foregroundColor?: string,
    useDefaultAlarms?: boolean,
    reminders?: number[],
    cancelIfAnyRefuse?: boolean, // todo
    enableHostPreferences?: boolean, // not needed?
    enableAttendeePreferences?: boolean, // done
    attendeeCanModify?: boolean,
    startDate?: string,
    endDate?: string,
    attendeeCount?: number,
    expireDate?: string,
    attendeeRespondedCount: number, // todo
    cancelled: boolean, // to do
    duration: number,
    calendarId: string,
    bufferTime: BufferTimeNumberType,
    anyoneCanAddSelf: boolean,
    guestsCanSeeOtherGuests: boolean,
    minThresholdCount?: number,
    allowAttendeeUpdatePreferences?: boolean,
    guaranteeAvailability?: boolean,
    frequency?: RecurrenceFrequencyType,
    interval?: number,
    until?: string, // no timezone
    originalMeetingId?: string,
    lockAfter?: boolean,
}


export type EmailType = {
    primary: boolean,
    value: string,
    type: 'home' | 'work' | 'other',
    displayName: string,
}

export type PhoneNumberType = {
    primary: boolean,
    value: string,
    type: string,
}

export type ImAddressType = {
    primary: boolean,
    username: string,
    service: string,
    type: string,
}


export type MeetingAssistAttendeeType = {
    id: string,
    name?: string,
    hostId: string,
    userId: string,
    emails: EmailType[],
    contactId?: string,
    phoneNumbers?: PhoneNumberType[],
    imAddresses?: ImAddressType[],
    meetingId: string,
    createdDate: string,
    timezone?: string,
    updatedAt: string,
    externalAttendee: boolean,
    primaryEmail?: string,
}

export type MeetingAssistPreferredTimeRangeType = {
    id: string,
    meetingId: string,
    dayOfWeek?: number,
    startTime: Time,
    endTime: Time,
    updatedAt: string,
    createdDate: string,
    hostId: string,
    attendeeId: string,
}

export type CreateRecurringMeetingAssistType = {
    originalMeetingAssist: MeetingAssistType,
    originalPreferredTimes?: MeetingAssistPreferredTimeRangeType[],
}
