export type PhotoLocation = {
  routeId: number;
  routeName: string;
};

export type Photo = PhotoLocation &{
  id: string;
  uri: string;
  takenAt: string; // ISO timestamp
};
