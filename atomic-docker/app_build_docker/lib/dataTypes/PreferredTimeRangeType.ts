import { Time } from '@lib/dataTypes/EventType';

export type PreferredTimeRangeType = {
    id: string,
    eventId: string,
    dayOfWeek?: -1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | null,
    startTime: Time,
    endTime: Time,
    updatedAt: string,
    createdDate: string,
    userId: string
}
