export type City = {
  id: number;
  name: string;
  country: string;
  coord: { lon: number; lat: number };
};

export type SimpleWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
