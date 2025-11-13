export interface StatsData {
  overview: {
    totalClicks: {
      value: number;
      change: number;
    };
    totalLinks: {
      value: number;
      change: number;
    };
    uniqueClicks: {
      value: number;
      change: number;
    };
    avgClicksPerLink: number;
  };
  trends: {
    todayClickTrend: {
      clicks: number;
      time: string;
    }[];
    sevenDayTrend: {
      clicks: number;
      date: string;
      unique: number;
    }[];
  };
  charts: {
    deviceBreakdown: {
      value: number;
      name: string;
    }[];
    geoDistribution: {
      clicks: number;
      country: string;
      percentage: string;
    }[];
  };
  topLinks: {
    shortCode: string;
    title: string | null;
    clicks: number;
    uniqueVisitors: number;
  }[];
}
