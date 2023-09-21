
import { BufferTimeNumberType } from "@chat/_libs/types/ChatMeetingPreferencesType"
import DayOfWeekType from "@chat/_libs/types/DayOfWeekType"
import { RecurrenceFrequencyType, TransparencyType, VisibilityType } from "@chat/_libs/types/EventType"
import { AppType, MutatedCalendarExtractedJSONAttendeeType } from "@chat/_libs/types/UserInputToJSONType"
import TimePreferenceType from "@chat/_libs/types/TimePreferenceType"
import ByMonthDayType from '../../../types/ByMonthDayType';

// create-event-forward | create-event-backward | create-deadline-forward | move-deadline-forward | move-deadline-backward | move-event-forward | move-event-backward | increase-duration | decrease-duration | create-time-preferences | remove-time-preferences | edit-add-time-preferences | edit-remove-time-preferences | edit-event-property


type MethodType = 'edit-event-property'

export type UpdateMeetingType = {
    userId: string,
    timezone: string,
    title: string,
    oldTitle?: string,
    attendees?: MutatedCalendarExtractedJSONAttendeeType[],
    method: MethodType,
    duration?: number,
    description?: string,
    conferenceApp?: AppType,
    startDate?: string,
    bufferTime?: BufferTimeNumberType,
    reminders?: number[],
    priority?: number,
    timePreferences?: TimePreferenceType[],
    location?: string,
    transparency?: TransparencyType
    visibility?: VisibilityType,
    isFollowUp?: boolean,
    recur?: {
        frequency: RecurrenceFrequencyType,
        endDate?: string,
        occurrence?: number,
        interval: number,
        byWeekDay?: DayOfWeekType[],
        byMonthDay?: ByMonthDayType[]
    },
}

