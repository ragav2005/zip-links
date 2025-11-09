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

interface geoRule {
  country: string;
  destinationUrl: string;
}
