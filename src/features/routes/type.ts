export type Route = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  provincie: string;
  address: string;
  omgeving: string;
  km: number;
  hoogtemeters: number;
  marking: {
    type: string;
    description: string;
  }[];
};

export type Favorite = {
  id: number;
  favorite: boolean;
};
