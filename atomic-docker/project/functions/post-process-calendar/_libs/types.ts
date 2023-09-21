import { eventVectorName } from './constants'


export type EmailType = {
    primary: boolean,
    value: string,
    type?: string,
    displayName?: string,
}

export type PhoneNumberType = {
    primary: boolean,
    value: string,
    type?: string,
}

export type ImAddressType = {
    primary: boolean,
    username: string,
    service: string,
    type?: string,
}
export type MonthType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
// 1 - 31
export type DayType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31

export type DD = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31'

export type MM = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'


export type MonthDayType = `--${MM}-${DD}`

export type DayOfWeekType = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

export type TimeSlotType = { id?: number, dayOfWeek: DayOfWeekType, startTime: Time, endTime: Time, hostId: string, monthDay: MonthDayType }

export type WorkTimeType = { id?: number, dayOfWeek: DayOfWeekType, startTime: Time, endTime: Time, userId: string, hostId: string }


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

export type appType = 'zoom' | 'google'

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
    cancelIfAnyRefuse?: boolean,
    enableHostPreferences?: boolean,
    enableAttendeePreferences?: boolean,
    attendeeCanModify?: boolean,
    startDate?: string,
    endDate?: string,
    attendeeCount?: number,
    expireDate?: string,
    attendeeRespondedCount: number,
    cancelled: boolean,
    duration: number,
    calendarId: string,
    bufferTime: BufferTimeNumberType,
    anyoneCanAddSelf: boolean,
    guestsCanSeeOtherGuests: boolean,
    minThresholdCount?: number,
    allowAttendeeUpdatePreferences?: boolean,
    guaranteeAvailability?: boolean,
    frequency?: 'weekly' | 'monthly',
    interval?: number,
    until?: string, // no timezone
    originalMeetingId?: string,
    lockAfter?: boolean,
}

export type RecurrenceRuleType = {
    frequency: string,
    endDate: string,
    occurrence?: number,
    interval: number,
    byWeekDay?: string[],
} | {
    frequency: string,
    endDate?: string,
    occurrence: number,
    interval: number,
    byWeekDay?: string[],
}

export type LocationType = {
    title: string,
    proximity?: string,
    radius?: number,
    coords?: {
        latitude?: number,
        longitude?: number,
    },
    address?: {
        houseNumber?: number,
        prefixDirection?: string,
        prefixType?: string,
        streetName?: string,
        streetType?: string,
        suffixDirection?: string,
        city?: string,
        state?: string,
        postalCode?: string,
        country?: string
    }
}

export type LinkType = {
    title: string,
    link: string
}

export type GoogleAttachmentType = {
    title: string,
    fileUrl: string,
    mimeType: string,
    iconLink: string,
    fileId: string
}

export type GoogleEventType1 = 'default' | 'outOfOffice' | 'focusTime'

export type SendUpdatesType = 'all' | 'externalOnly' | 'none'

export type TransparencyType = 'opaque' | 'transparent' // available or not

export type VisibilityType = 'default' | 'public' | 'private' | 'confidential'

export type CreatorType = {
    id?: string,
    email?: string,
    displayName?: string,
    self?: boolean
}

export type OrganizerType = {
    id: string,
    email: string,
    displayName: string,
    self: boolean
}

export type ExtendedPropertiesType = {
    private?: {
        keys?: string[],
        values?: string[],
    },
    shared?: {
        keys?: string[],
        values?: string[]
    },
}

export type GoogleSourceType = {
    title?: string,
    url?: string,
}

export type HH = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23'

export type Time = `${HH}:${MM}`

export type BufferTimeNumberType = {
    beforeEvent: number
    afterEvent: number
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

export type EventType = {
    id: string,
    userId: string,
    title?: string,
    startDate: string,
    endDate: string,
    allDay?: boolean,
    recurrenceRule?: RecurrenceRuleType,
    location?: LocationType,
    notes?: string,
    attachments?: GoogleAttachmentType[],
    links?: LinkType[],
    timezone?: string,
    createdDate: string,
    deleted: boolean,
    taskId?: string,
    taskType?: string,
    priority: number,
    followUpEventId?: string,
    isFollowUp: boolean,
    isPreEvent: boolean,
    isPostEvent: boolean,
    preEventId?: string,
    postEventId?: string,
    modifiable: boolean,
    forEventId?: string,
    conferenceId?: string,
    maxAttendees?: number,
    sendUpdates?: SendUpdatesType,
    anyoneCanAddSelf: boolean,
    guestsCanInviteOthers: boolean,
    guestsCanSeeOtherGuests: boolean,
    originalStartDate: string,
    originalAllDay: boolean,
    status?: string,
    summary?: string,
    transparency?: TransparencyType,
    visibility?: VisibilityType,
    recurringEventId?: string,
    updatedAt: string,
    iCalUID?: string,
    htmlLink?: string,
    colorId?: string,
    creator?: CreatorType,
    organizer?: OrganizerType,
    endTimeUnspecified?: boolean,
    recurrence?: string[],
    originalTimezone?: string,
    attendeesOmitted?: boolean,
    extendedProperties?: ExtendedPropertiesType,
    hangoutLink?: string,
    guestsCanModify?: boolean,
    locked?: boolean,
    source?: GoogleSourceType,
    eventType?: string,
    privateCopy?: boolean,
    calendarId: string,
    backgroundColor?: string,
    foregroundColor?: string,
    useDefaultAlarms?: boolean,
    positiveImpactScore?: number,
    negativeImpactScore?: number,
    positiveImpactDayOfWeek?: number,
    positiveImpactTime?: Time,
    negativeImpactDayOfWeek?: number,
    negativeImpactTime?: Time,
    preferredDayOfWeek?: number,
    preferredTime?: Time,
    isExternalMeeting?: boolean,
    isExternalMeetingModifiable?: boolean,
    isMeetingModifiable?: boolean,
    isMeeting?: boolean,
    dailyTaskList?: boolean,
    weeklyTaskList?: boolean,
    isBreak?: boolean,
    preferredStartTimeRange?: Time,
    preferredEndTimeRange?: Time,
    copyAvailability?: boolean,
    copyTimeBlocking?: boolean,
    copyTimePreference?: boolean,
    copyReminders?: boolean,
    copyPriorityLevel?: boolean,
    copyModifiable?: boolean,
    copyCategories?: boolean,
    copyIsBreak?: boolean,
    timeBlocking?: BufferTimeNumberType,
    userModifiedAvailability?: boolean,
    userModifiedTimeBlocking?: boolean,
    userModifiedTimePreference?: boolean,
    userModifiedReminders?: boolean,
    userModifiedPriorityLevel?: boolean,
    userModifiedCategories?: boolean,
    userModifiedModifiable?: boolean,
    userModifiedIsBreak?: boolean,
    hardDeadline?: string,
    softDeadline?: string,
    copyIsMeeting?: boolean,
    copyIsExternalMeeting?: boolean,
    userModifiedIsMeeting?: boolean,
    userModifiedIsExternalMeeting?: boolean,
    duration?: number,
    copyDuration?: boolean,
    userModifiedDuration?: boolean,
    method?: 'create' | 'update',
    unlink?: boolean,
    copyColor?: boolean,
    userModifiedColor?: boolean,
    byWeekDay?: string[],
    localSynced?: boolean,
    meetingId?: string,
    eventId: string,
}

export type MeetingAssistEventType = {
    id: string,
    attendeeId: string,
    startDate: string,
    endDate: string,
    allDay?: boolean,
    recurrenceRule?: RecurrenceRuleType,
    location?: LocationType,
    notes?: string,
    attachments?: GoogleAttachmentType[],
    links?: LinkType[],
    timezone?: string,
    createdDate: string,
    summary?: string,
    transparency?: TransparencyType,
    visibility?: VisibilityType,
    recurringEventId?: string,
    updatedAt: string,
    iCalUID?: string,
    htmlLink?: string,
    colorId?: string,
    creator?: CreatorType,
    organizer?: OrganizerType,
    endTimeUnspecified?: boolean,
    recurrence?: string[],
    attendeesOmitted?: boolean,
    extendedProperties?: ExtendedPropertiesType,
    hangoutLink?: string,
    guestsCanModify?: boolean,
    locked?: boolean,
    source?: GoogleSourceType,
    eventType?: string,
    privateCopy?: boolean,
    calendarId: string,
    backgroundColor?: string,
    foregroundColor?: string,
    useDefaultAlarms?: boolean,
    externalUser: boolean,
    meetingId?: string,
    eventId: string,
}

export type EventPlusType = EventType & {
    preferredTimeRanges?: PreferredTimeRangeType[],
    vector?: number[],
}

export type EventMeetingPlusType = EventType & {
    preferredTimeRanges?: MeetingAssistPreferredTimeRangeType[],
}

export type PreferredTimeRangeType = {
    id: string,
    eventId: string,
    dayOfWeek?: number,
    startTime: Time,
    endTime: Time,
    updatedAt: string,
    createdDate: string,
    userId: string,
}

export type RemindersForEventType = {
    eventId: string,
    reminders: ReminderType[],
}

export type ReminderType = {
    id: string,
    userId: string,
    eventId: string,
    reminderDate?: string,
    timezone?: string,
    minutes?: number,
    useDefault?: boolean,
    updatedAt: string,
    createdDate: string,
    deleted: boolean
}

export type ReminderTypeAdjusted = ReminderType

export type BufferTimeObjectType = {
    beforeEvent?: EventPlusType;
    afterEvent?: EventPlusType;
}

export type ValuesToReturnForBufferEventsType = {
    beforeEvent?: EventPlusType,
    afterEvent?: EventPlusType,
    newEvent: EventMeetingPlusType,
}

type DayOfWeekIntType = 1 | 2 | 3 | 4 | 5 | 6 | 7

type StartTimeType = {
    day: DayOfWeekIntType,
    hour: number,
    minutes: number,
}

type EndTimeType = {
    day: DayOfWeekIntType,
    hour: number,
    minutes: number,
}

export type UserPreferenceType = {
    id: string,
    userId: string,
    reminders?: number[], // invite part
    followUp?: number[], // invite part
    isPublicCalendar?: boolean,
    publicCalendarCategories?: string[],
    startTimes?: StartTimeType[],
    endTimes?: EndTimeType[],
    copyAvailability?: boolean,
    copyTimeBlocking?: boolean,
    copyTimePreference?: boolean,
    copyReminders?: boolean,
    copyPriorityLevel?: boolean,
    copyModifiable?: boolean,
    copyCategories?: boolean,
    copyIsBreak?: boolean,
    maxWorkLoadPercent: number,
    minNumberOfBreaks: number,
    breakLength: number,
    breakColor?: string,
    backToBackMeetings: boolean,
    maxNumberOfMeetings: number,
    copyIsMeeting?: boolean,
    copyIsExternalMeeting?: boolean,
    copyColor?: boolean,
    updatedAt?: string,
    createdDate?: string,
    deleted: boolean
}

type DefaultReminder = {
    method: string,
    minutes: number,
}

export type CalendarType = {
    id: string,
    title?: string,
    backgroundColor?: string,
    foregroundColor?: string,
    colorId?: string,
    account?: object,
    accessLevel?: string,
    resource?: string,
    modifiable?: boolean,
    defaultReminders?: DefaultReminder[],
    // weird behavior by enabling primary here commented out for now
    // primary?: boolean,
    globalPrimary?: boolean,
    pageToken?: string,
    syncToken?: string,
    deleted: boolean,
    createdDate: string,
    updatedAt: string,
    userId: string,
}




export type UserPlannerRequestBodyType = {
    id: string, // UUID
    hostId: string,
    maxWorkLoadPercent: number,
    backToBackMeetings: boolean,
    maxNumberOfMeetings: number,
    minNumberOfBreaks: number,
    workTimes: WorkTimeType[],
}

export type PreferredTimeRangePlannerRequestBodyType = {
    id?: number,
    dayOfWeek?: DayOfWeekType,
    startTime: Time,
    endTime: Time,
    eventId: string,
    userId: string,
    hostId: string,
}

export type EventParentPlannerRequestBodyType = {
    id: string,
    userId: string,
    hostId: string,
    preferredTimeRanges?: PreferredTimeRangePlannerRequestBodyType[]
}


export type EventPartPlannerRequestBodyType = {
    groupId: string,
    part: number,
    lastPart: number,
    eventId: string,
    startDate: string,
    endDate: string,
    taskId?: string,
    softDeadline?: string,
    hardDeadline?: string,
    userId: string,
    hostId: string,
    meetingId?: string,
    user: UserPlannerRequestBodyType,
    priority: number,
    isPreEvent?: boolean,
    isPostEvent?: boolean,
    forEventId?: string,
    positiveImpactScore?: number,
    negativeImpactScore?: number,
    positiveImpactDayOfWeek?: DayOfWeekType,
    positiveImpactTime?: Time,
    negativeImpactDayOfWeek?: DayOfWeekType,
    negativeImpactTime?: Time,
    modifiable?: boolean,
    preferredDayOfWeek?: DayOfWeekType,
    preferredTime?: Time,
    isMeeting?: boolean,
    isExternalMeeting?: boolean,
    isExternalMeetingModifiable?: boolean,
    isMeetingModifiable?: boolean,
    dailyTaskList: boolean,
    weeklyTaskList: boolean,
    gap: boolean,
    preferredStartTimeRange?: Time,
    preferredEndTimeRange?: Time,
    totalWorkingHours?: number,
    recurringEventId?: string,
    event: EventParentPlannerRequestBodyType,
}

export type InitialEventPartType = {
    id: string,
    groupId: string,
    eventId: string,
    userId: string,
    title?: string,
    startDate: string,
    endDate: string,
    allDay?: boolean,
    recurrenceRule?: RecurrenceRuleType,
    location?: LocationType,
    notes?: string,
    attachments?: GoogleAttachmentType[],
    links?: LinkType[],
    timezone?: string,
    createdDate: string,
    deleted: boolean,
    taskId?: string,
    taskType?: string,
    priority: number,
    followUpEventId?: string,
    isFollowUp: boolean,
    isPreEvent: boolean,
    isPostEvent: boolean,
    preEventId?: string,
    postEventId?: string,
    modifiable: boolean,
    forEventId?: string,
    conferenceId?: string,
    maxAttendees?: number,
    sendUpdates?: SendUpdatesType,
    anyoneCanAddSelf: boolean,
    guestsCanInviteOthers: boolean,
    guestsCanSeeOtherGuests: boolean,
    originalStartDate: string,
    originalAllDay: boolean,
    status?: string,
    summary?: string,
    transparency?: TransparencyType,
    visibility?: VisibilityType,
    recurringEventId?: string,
    updatedAt: string,
    iCalUID?: string,
    htmlLink?: string,
    colorId?: string,
    creator?: CreatorType,
    organizer?: OrganizerType,
    endTimeUnspecified?: boolean,
    recurrence?: string[],
    originalTimezone?: string,
    attendeesOmitted?: boolean,
    extendedProperties?: ExtendedPropertiesType,
    hangoutLink?: string,
    guestsCanModify?: boolean,
    locked?: boolean,
    source?: GoogleSourceType,
    eventType?: string,
    privateCopy?: boolean,
    calendarId: string,
    backgroundColor?: string,
    foregroundColor?: string,
    useDefaultAlarms?: boolean,
    positiveImpactScore?: number,
    negativeImpactScore?: number,
    positiveImpactDayOfWeek?: number,
    positiveImpactTime?: Time,
    negativeImpactDayOfWeek?: number,
    negativeImpactTime?: Time,
    preferredDayOfWeek?: number,
    preferredTime?: Time,
    isExternalMeeting?: boolean,
    isExternalMeetingModifiable?: boolean,
    isMeetingModifiable?: boolean,
    isMeeting?: boolean,
    dailyTaskList?: boolean,
    weeklyTaskList?: boolean,
    isBreak?: boolean,
    preferredStartTimeRange?: Time,
    preferredEndTimeRange?: Time,
    copyAvailability?: boolean,
    copyTimeBlocking?: boolean,
    copyTimePreference?: boolean,
    copyReminders?: boolean,
    copyPriorityLevel?: boolean,
    copyModifiable?: boolean,
    copyCategories?: boolean,
    copyIsBreak?: boolean,
    timeBlocking?: BufferTimeNumberType,
    userModifiedAvailability?: boolean,
    userModifiedTimeBlocking?: boolean,
    userModifiedTimePreference?: boolean,
    userModifiedReminders?: boolean,
    userModifiedPriorityLevel?: boolean,
    userModifiedCategories?: boolean,
    userModifiedModifiable?: boolean,
    userModifiedIsBreak?: boolean,
    hardDeadline?: string,
    softDeadline?: string,
    copyIsMeeting?: boolean,
    copyIsExternalMeeting?: boolean,
    userModifiedIsMeeting?: boolean,
    userModifiedIsExternalMeeting?: boolean,
    duration?: number,
    copyDuration?: boolean,
    userModifiedDuration?: boolean,
    method?: 'create' | 'update',
    unlink?: boolean,
    copyColor?: boolean,
    userModifiedColor?: boolean,
    byWeekDay?: string[],
    localSynced?: boolean,
    part: number,
    lastPart: number,
    hostId: string,
    meetingId?: string,
}

export type InitialEventPartTypePlus = InitialEventPartType & { preferredTimeRanges?: PreferredTimeRangeType[] }


export type ReturnBodyForHostForOptaplannerPrepType = {
    userId: string,
    hostId: string,
    eventParts: EventPartPlannerRequestBodyType[],
    allEvents: EventPlusType[],
    breaks: EventPlusType[],
    oldEvents: EventPlusType[],
    timeslots: TimeSlotType[],
    userPlannerRequestBody: UserPlannerRequestBodyType,
    newHostReminders?: RemindersForEventType[],
    newHostBufferTimes?: BufferTimeObjectType[],
}

export type ReturnBodyForAttendeeForOptaplannerPrepType = {
    userIds: string[],
    hostId: string,
    eventParts: EventPartPlannerRequestBodyType[],
    allEvents: EventPlusType[],
    oldEvents: EventPlusType[],
    timeslots: TimeSlotType[],
    userList: UserPlannerRequestBodyType[],
    newHostReminders?: RemindersForEventType[],
    newHostBufferTimes?: BufferTimeObjectType[],
}

export type ReturnBodyForExternalAttendeeForOptaplannerPrepType = {
    userIds: string[],
    hostId: string,
    eventParts: EventPartPlannerRequestBodyType[],
    allEvents: EventPlusType[],
    oldAttendeeEvents: MeetingAssistEventType[],
    timeslots: TimeSlotType[],
    userList: UserPlannerRequestBodyType[],
}

export type PlannerRequestBodyType = {
    singletonId: string,
    hostId: string,
    timeslots: TimeSlotType[],
    userList: UserPlannerRequestBodyType[],
    eventParts: EventPartPlannerRequestBodyType[],
    fileKey: string,
    delay: number,
    callBackUrl: string,
}

export type FreemiumType = {
    id: string,
    userId: string,
    usage: number,
    period: 'MONTH' | 'YEAR' | 'DAY',
    updatedAt: string,
    createdDate: string,
}

export type ReturnValueForEachMeetingAssistType = {
    events: EventPlusType[],
    oldEvents: EventType[],
    meetingAssistEvents: MeetingAssistEventType[],
    meetingEventsPlus: EventMeetingPlusType[],
    internalAttendees: MeetingAssistAttendeeType[],
    externalAttendees?: MeetingAssistAttendeeType[],
}

export type esResponseBody = {
    took?: number,
    timed_out?: false,
    _shards?: {
        total: number,
        successful: number,
        skipped: number,
        failed: number
    },
    hits?: {
        total: {
            value: number,
            relation: string
        },
        max_score: number,
        hits?: [
            {
                _index: string,
                _type: string,
                _id: string,
                _score: number,
                _source: Source2type,
            }
        ]
    }
}

type Source2type = {
    [eventVectorName]: number[],
    userId: string,
}

type DefaultPreAndPostTimeBlockType = {
    beforeEvent: number
    afterEvent: number
}

type DefaultTimePreferenceType = {
    dayOfWeek?: number,
    startTime: Time,
    endTime: Time,
}

type DefaultReminderType = number

export type CategoryType = {
    id: string,
    userId: string,
    name: string,
    updatedAt: string,
    createdDate: string,
    deleted: boolean
    copyAvailability?: boolean,
    copyTimeBlocking?: boolean,
    copyTimePreference?: boolean,
    copyReminders?: boolean,
    copyPriorityLevel?: boolean,
    copyModifiable?: boolean,
    defaultAvailability?: boolean,
    defaultTimeBlocking?: DefaultPreAndPostTimeBlockType,
    defaultTimePreference?: DefaultTimePreferenceType[],
    defaultReminders?: DefaultReminderType[],
    defaultPriorityLevel?: number,
    defaultModifiable?: boolean,
    copyIsBreak?: boolean,
    defaultIsBreak?: boolean,
    color?: string,
    copyIsMeeting?: boolean,
    copyIsExternalMeeting?: boolean,
    defaultIsMeeting?: boolean,
    defaultIsExternalMeeting?: boolean,
    defaultMeetingModifiable?: boolean,
    defaultExternalMeetingModifiable?: boolean,
}

export type classificationResponseBody = {
    sequence: string,
    labels: string[],
    scores: number[]
}

export type CategoryEventType = {
    id: string,
    userId: string,
    categoryId: string,
    eventId: string,
    Category: CategoryType,
    updatedAt: string,
    createdDate: string,
    deleted: boolean
}

export type EventPlannerResponseBodyType = {
    id: string, // UUID
    groupId: string,
    eventId: string,
    part: number,
    lastPart: number,
    startDate: string,
    endDate: string,
    taskId?: string,
    softDeadline?: string,
    hardDeadline?: string,
    meetingId?: string,
    userId: string,
    hostId: string,
    user: UserPlannerRequestBodyType,
    priority: number,
    isPreEvent?: boolean,
    isPostEvent?: boolean,
    forEventId?: string,
    positiveImpactScore?: number,
    negativeImpactScore?: number,
    positiveImpactDayOfWeek?: DayOfWeekType,
    positiveImpactTime?: Time,
    negativeImpactDayOfWeek?: DayOfWeekType,
    negativeImpactTime?: Time,
    modifiable?: boolean,
    preferredDayOfWeek?: DayOfWeekType,
    preferredTime?: Time,
    isMeeting?: boolean,
    isExternalMeeting?: boolean,
    isExternalMeetingModifiable?: boolean,
    isMeetingModifiable?: boolean,
    dailyTaskList: boolean,
    weeklyTaskList: boolean,
    gap: boolean,
    preferredStartTimeRange?: Time,
    preferredEndTimeRange?: Time,
    totalWorkingHours?: number,
    timeslot: TimeSlotType,
    event: EventParentPlannerRequestBodyType
}

type hardType = number
type mediumType = number
type softType = number

export type OnOptaPlanBodyType = {
    timeslotList: TimeSlotType[],
    eventPartList: EventPlannerResponseBodyType[],
    userList: UserPlannerRequestBodyType[],
    score: `${hardType}hard/${mediumType}medium/${softType}soft` | null,
    fileKey: string,
    hostId: string,
}

export type PlannerBodyResponseType = {
    timeslotList: TimeSlotType[],
    eventPartList: EventPlannerResponseBodyType[],
    userList: UserPlannerRequestBodyType[],
    // hostId: string,
    // score: `${hardType}hard/${mediumType}medium/${softType}soft` | null,
}

export type ColorType = {
  id: string,
  background: string,
  foreground: string,
  itemType: 'calendar' | 'event',
}

export type CalendarIntegrationType = {
  id: string,
  userId: string,
  token?: string,
  refreshToken?: string,
  resource?: string,
  name?: string,
  enabled?: boolean,
  syncEnabled?: boolean,
  deleted?: boolean,
  appId?: string,
  appEmail?: string,
  appAccountId?: string,
  contactName?: string,
  contactEmail?: string,
  colors?: ColorType[],
  clientType?: 'ios' | 'android' | 'web' | 'atomic-web',
  expiresAt?: string,
  updatedAt: string,
  createdDate: string,
  pageToken?: string,
  syncToken?: string,
}

type OverrideType = {
    method?: 'email' | 'popup', // reminder type
    minutes?: number,
}

export type OverrideTypes = OverrideType[]

export type GoogleReminderType = {
    overrides: OverrideTypes,
    useDefault: boolean, // use calendar defaults
}

export type GoogleSendUpdatesType = 'all' | 'externalOnly' | 'none'

export type GoogleAttendeeType = {
    additionalGuests?: number,
    comment?: string,
    displayName?: string,
    email: string,
    id?: string,
    responseStatus?: 'needsAction' | 'declined' | 'tentative' | 'accepted',
}

type GoogleEntryPointType = {
  accessCode?: string,
  label?: string,
  entryPointType: 'video' | 'phone' | 'sip' | 'more',
  meetingCode?: string,
  passcode?: string,
  password?: string,
  pin?: string,
  uri?: string,
}

export type GoogleConferenceDataType = {
    type: 'hangoutsMeet' | 'addOn',
    iconUri?: string,
    name?: string,
    requestId?: string,
    conferenceId?: string,
    createRequest?: {
        "requestId": string,
        "conferenceSolutionKey": {
            "type": 'hangoutsMeet' | 'addOn',
        },
    },
    entryPoints?: GoogleEntryPointType[],
}

export type GoogleExtendedPropertiesType = {
  private?: object,
  shared?: object,
}

export type GoogleTransparencyType = 'opaque' | 'transparent' // available or not

export type GoogleVisibilityType = 'default' | 'public' | 'private' | 'confidential'

export type ZoomOccurrenceObjectType = {
    duration: number,
    occurrence_id: number,
    start_time: string,
    status: string,
}

export type ZoomRecurrenceObjectType = {
    end_date_time: string,
    end_times: number,
    monthly_day: number,
    monthly_week: number,
    monthly_week_day: number,
    repeat_interval: number,
    type: number,
    weekly_days: number
}

export type ZoomMeetingObjectType = {
    assistant_id: string,
    host_email: string,
    id: number,
    registration_url?: string,
    agenda: string,
    created_at: string,
    duration: number,
    h323_password?: number,
    join_url: string,
    occurrences?: ZoomOccurrenceObjectType[],
    password?: string,
    pmi: number,
    pre_schedule: boolean,
    recurrence: ZoomRecurrenceObjectType,
    settings: object,
    start_time: string,
    start_url: string,
    timezone: string,
    topic: string,
    tracking_fields: object[],
    type: number
}

export type CreateZoomMeetingRequestBodyType = {
    agenda?: string,
    default_password?: boolean,
    duration?: number,
    password?: string,
    pre_schedule?: boolean,
    recurrence?: {
        end_date_time: string, // utc format date
        end_times: number,
        monthly_day: number,
        monthly_week: number,
        monthly_week_day: number,
        repeat_interval: number,
        type: number,
        weekly_days: number
    },
    schedule_for?: string,
    settings?: {
        additional_data_center_regions?: string[],
        allow_multiple_devices?: boolean,
        alternative_hosts?: string,
        alternative_hosts_email_notification?: boolean,
        approval_type?: number,
        approved_or_denied_countries_or_regions?: {
            approved_list?: string[],
            denied_list?: string[],
            enable?: boolean,
            method?: string,
        },
        audio?: string,
        authentication_domains?: string,
        authentication_exception?: {
            email: string,
            name: string
        }[],
        authentication_option?: string,
        auto_recording?: string,
        breakout_room?: {
            enable: boolean,
            rooms: [{
                name: string,
                participants: string[]
            }]
        },
        calendar_type?: 1 | 2,
        close_registration?: boolean,
        contact_email?: string,
        contact_name: string,
        email_notification?: boolean,
        encryption_type?: string,
        focus_mode?: boolean,
        global_dial_in_countries?: string[],
        host_video?: boolean,
        jbh_time?: 0 | 5 | 10,
        join_before_host?: boolean,
        language_interpretation?: {
            enable: boolean,
            interpreters: {
                email: string,
                languages: string,
            }[]
        },
        meeting_authentication?: boolean,
        meeting_invitees?: {
            email: string
        }[],
        mute_upon_entry?: boolean,
        participant_video?: boolean,
        private_meeting?: boolean,
        registrants_confirmation_email?: boolean,
        registrants_email_notification?: boolean,
        registration_type?: 1 | 2 | 3,
        show_share_button?: boolean,
        use_pmi?: boolean,
        waiting_room?: boolean,
        watermark?: boolean,
        host_save_video_order?: boolean,
        alternative_host_update_polls?: boolean
    },
    start_time?: string, // date utc format
    template_id?: string,
    timezone?: string,
    topic?: string,
    tracking_fields?: {
        field: string,
        value: string
    }[],
    type?: 1 | 2 | 3 | 8
}


export type EntryPointType = {
  accessCode?: string,
  label?: string,
  entryPointType: 'video' | 'phone' | 'sip' | 'more',
  meetingCode?: string,
  passcode?: string,
  password?: string,
  pin?: string,
  uri?: string,
}

export type parameterType = {
  keys: string[],
  values: string[],
}



export type conferenceNameType = 'Zoom Meeting' | 'Google Meet'

export type ConferenceType = {
    id: string,
    userId: string,
    calendarId: string,
    app: appType,
    requestId?: string,
    type?: string,
    status?: string,
    iconUri?: string,
    name?: string,
    notes?: string,
    entryPoints?: EntryPointType[],
    parameters?: {
    addOnParameters?: {
        parameters?: parameterType[],
    }
    },
    key?: string,
    hangoutLink?: string,
    joinUrl?: string,
    startUrl?: string,
    zoomPrivateMeeting?: boolean,
    updatedAt: string,
    createdDate: string,
    deleted: boolean
    isHost: boolean
}

export type CreateGoogleEventResponseType = {
    id: string, 
    googleEventId: string, 
    generatedId: string, 
    calendarId: string, 
    generatedEventId: string,
}



export type AttendeeEmailType = {
    primary: boolean,
    value: string,
    type?: string,
    displayName?: string,
  }
  
  export type AttendeePhoneNumberType = {
    primary: boolean,
    value: string,
    type?: string,
  }
  
  export type AttendeeImAddressType = {
    primary: boolean,
    username: string,
    service: string,
    type?: string,
  }
  
  export type AttendeeType = {
    id: string,
    userId: string,
    name?: string,
    contactId?: string,
    emails: AttendeeEmailType[],
    phoneNumbers?: AttendeePhoneNumberType[],
    imAddresses?: AttendeeImAddressType[],
    eventId: string,
    additionalGuests?: number,
    comment?: string,
    responseStatus?: string,
    optional?: boolean,
    resource?: boolean,
    updatedAt: string,
    createdDate: string,
    deleted: boolean
  }


