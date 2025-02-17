export interface Category {
  icon: unknown;
  title: string;
  cardNo: number;
}

export interface RecentActivity {
  img: string;
  title: string;
  account: string;
  activityType: string;
  time: string;
  date: string;
}

export interface CInputType {
  label?: string;
  type: string;
  placeholder?: string;
  id: string;
  ref?: any;
}

export interface CButtonType {
  label?: string;
  action: () => void;
}
