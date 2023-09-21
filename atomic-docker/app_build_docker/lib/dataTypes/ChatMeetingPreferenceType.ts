import { SendUpdatesType, TransparencyType, VisibilityType } from "@lib/calendarLib/types";
import { AppType } from "./ConferenceType"
import { BufferTimeNumberType } from "./MeetingAssistType"

export type ChatMeetingPreferencesType = {
    id: string,
    userId: string,
    timezone?: string,
    sendUpdates?: SendUpdatesType,
    guestsCanInviteOthers?: boolean,
    transparency?: TransparencyType,
    visibility?: VisibilityType,
    useDefaultAlarms?: boolean,
    reminders?: number[],
    duration?: number,
    enableConference?: boolean,
    conferenceApp?: AppType,
    bufferTime?: BufferTimeNumberType,
    anyoneCanAddSelf?: boolean,
    guestsCanSeeOtherGuests?: boolean,
    name?: string,
    primaryEmail?: string,
    updatedAt: string,
    createdDate: string,
    lockAfter?: boolean,
}