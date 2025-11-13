export interface RecentActivities {
  _id: string;
  userId: string;
  eventType:
    | "URL_CREATED"
    | "GEO_RULE_CREATED"
    | "GEO_RULE_DELETED"
    | "URL_DELETED";

  message: string;
  relatedUrlId: string;
  createdAt: string;
}
