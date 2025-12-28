import axios from 'axios';
import type { Repository, LanguageData, WeeklyCommitActivity } from '../types';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export const githubService = {
  getRepository: async (term: string = ''): Promise<Repository | null> => {
    try {
      const q = term || 'stars:>100000';
      
      const searchResponse = await api.get('/search/repositories', {
        params: {
          q,
          sort: 'stars',
          order: 'desc',
          per_page: 1,
        },
      });

      if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
        return null;
      }

      const foundRepo = searchResponse.data.items[0];

      const detailsResponse = await api.get(`/repos/${foundRepo.owner.login}/${foundRepo.name}`);
      
      return detailsResponse.data;
    } catch (error) {
      console.error('Erro ao buscar repositório:', error);
      return null;
    }
  },


  getLanguages: async (owner: string, repo: string): Promise<LanguageData> => {
    try {
      const response = await api.get(`/repos/${owner}/${repo}/languages`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar linguagens:', error);
      return {};
    }
  },


  getCommits: async (owner: string, repo: string): Promise<WeeklyCommitActivity[]> => {
    try {
      const response = await api.get(`/repos/${owner}/${repo}/stats/commit_activity`);
      
      if (!Array.isArray(response.data)) return [];

      const last4Weeks = response.data.slice(-4);
      
      return last4Weeks.map((week: any) => ({
        week: week.week,
        total: week.total
      }));
    } catch (error) {
      console.error('Erro ao buscar commits:', error);
      return [];
    }
  }
};