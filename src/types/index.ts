export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;      
  watchers_count: number;  
  subscribers_count: number;
  language: string;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

export interface LanguageData {
  [key: string]: number; 
}

export interface WeeklyCommitActivity {
  week: number;
  total: number;
}