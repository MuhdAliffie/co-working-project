export type BookingRecord = {
  BookingID: number
  SpaceID: number
  StartDateTime: string
  EndDateTime: string
  StatusID: 'Completed' | 'Cancelled' | 'Confirmed'
}

export type BookingDataset = Record<string, BookingRecord[]>

export const bookingData: BookingDataset = {
  '124124': [
    {
      BookingID: 50001,
      SpaceID: 301,
      StartDateTime: '2024-05-12T10:00:00Z',
      EndDateTime: '2024-05-12T11:30:00Z',
      StatusID: 'Completed',
    },
    {
      BookingID: 50002,
      SpaceID: 205,
      StartDateTime: '2024-05-15T14:00:00Z',
      EndDateTime: '2024-05-15T16:00:00Z',
      StatusID: 'Confirmed',
    },
    {
      BookingID: 50003,
      SpaceID: 103,
      StartDateTime: '2024-05-20T09:00:00Z',
      EndDateTime: '2024-05-20T17:00:00Z',
      StatusID: 'Cancelled',
    },
  ],
  '843843': [
    {
      BookingID: 60001,
      SpaceID: 401,
      StartDateTime: '2024-06-18T08:00:00Z',
      EndDateTime: '2024-06-18T12:00:00Z',
      StatusID: 'Completed',
    },
    {
      BookingID: 60002,
      SpaceID: 205,
      StartDateTime: '2024-06-22T15:00:00Z',
      EndDateTime: '2024-06-22T17:30:00Z',
      StatusID: 'Confirmed',
    },
  ],
}
