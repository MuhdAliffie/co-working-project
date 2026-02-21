export type SpaceCatalogEntry = {
  SpaceType: string
  Capacity: number
  Location: string
  Availability: 'Available' | 'Booked'
}

export const spaceCatalog: Record<number, SpaceCatalogEntry> = {
  101: { SpaceType: 'Focus Pod', Capacity: 1, Location: 'Focus Zone, Pod 1', Availability: 'Available' },
  102: { SpaceType: 'Focus Pod', Capacity: 1, Location: 'Focus Zone, Pod 2', Availability: 'Available' },
  103: { SpaceType: 'Focus Pod', Capacity: 1, Location: 'Focus Zone, Pod 3', Availability: 'Booked' },
  201: { SpaceType: 'Flow Zone', Capacity: 1, Location: 'Flow Zone, Desk 1', Availability: 'Available' },
  202: { SpaceType: 'Flow Zone', Capacity: 1, Location: 'Flow Zone, Desk 2', Availability: 'Available' },
  203: { SpaceType: 'Flow Zone', Capacity: 1, Location: 'Flow Zone, Desk 3', Availability: 'Booked' },
  204: { SpaceType: 'Flow Zone', Capacity: 1, Location: 'Flow Zone, Desk 4', Availability: 'Available' },
  205: { SpaceType: 'Flow Zone', Capacity: 1, Location: 'Flow Zone, Desk 5', Availability: 'Available' },
  206: { SpaceType: 'Flow Zone', Capacity: 1, Location: 'Flow Zone, Desk 6', Availability: 'Available' },
  301: { SpaceType: 'Creative Zone', Capacity: 4, Location: 'Creative Zone, Table 1', Availability: 'Available' },
  302: { SpaceType: 'Creative Zone', Capacity: 4, Location: 'Creative Zone, Table 2', Availability: 'Booked' },
  303: { SpaceType: 'Creative Zone', Capacity: 4, Location: 'Creative Zone, Table 3', Availability: 'Available' },
  304: { SpaceType: 'Creative Zone', Capacity: 4, Location: 'Creative Zone, Table 4', Availability: 'Available' },
  401: { SpaceType: 'Meeting Room', Capacity: 12, Location: 'Floor 1, Room 401', Availability: 'Available' },
  402: { SpaceType: 'Meeting Room', Capacity: 12, Location: 'Floor 1, Room 402', Availability: 'Booked' },
  403: { SpaceType: 'Meeting Room', Capacity: 12, Location: 'Floor 1, Room 403', Availability: 'Available' },
}
