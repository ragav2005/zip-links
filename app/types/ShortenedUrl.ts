export default interface ShortenedUrl {
  _id: string;
  creator: string;
  linkType: "geo" | "normal";
  shortCode: string;
  defaultUrl: string;
  title?: string;
  geoRules?: geoRule[];
  totalClicks: number;
  createdAt: string;
  updatedAt: string;
}

export interface geoRule {
  _id: string;
  country: string;
  countryCode: string;
  clicks: number;
  destinationUrl: string;
}
