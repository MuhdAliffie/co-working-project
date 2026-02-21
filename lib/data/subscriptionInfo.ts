export type SubscriptionRecord = {
  SubscriptionID: string
  PassID: string
  StartDateTime: string
  EndDateTime: string
  DurationDays: number
}

export type SubscriptionDataset = Record<string, SubscriptionRecord[]>

export const subscriptionData: SubscriptionDataset = {
  '124124': [
    {
      SubscriptionID: '111111',
      PassID: 'PASS-MU',
      StartDateTime: '2024-04-24T00:00:00Z',
      EndDateTime: '2024-05-24T00:00:00Z',
      DurationDays: 30,
    },
  ],
  '843843': [
    {
      SubscriptionID: '333333',
      PassID: 'PASS-CF',
      StartDateTime: '2024-06-01T00:00:00Z',
      EndDateTime: '2024-09-01T00:00:00Z',
      DurationDays: 92,
    },
    {
      SubscriptionID: '444444',
      PassID: 'PASS-WE',
      StartDateTime: '2024-06-15T00:00:00Z',
      EndDateTime: '2024-07-15T00:00:00Z',
      DurationDays: 30,
    },
  ],
}
