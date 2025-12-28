import React, { useState, useEffect } from 'react';
import { Search, Star, GitFork, Eye, Github, Moon, Sun } from 'lucide-react';
import { githubService } from '../services/api';

import { StatCard } from '../components/StatCard';
import { CommitChart, LanguageChart } from '../components/Charts';

import type { Repository, LanguageData, WeeklyCommitActivity } from '../types';

export const Dashboard: React.FC = () => {
  const [repo, setRepo] = useState<Repository | null>(null);
  const [languages, setLanguages] = useState<LanguageData>({});
  const [commits, setCommits] = useState<WeeklyCommitActivity[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const fetchData = async (term: string = '') => {
    setLoading(true);
    setError('');
    setRepo(null); 
    
    try {
      const repoData = await githubService.getRepository(term);
      
      if (!repoData) {
        setError('Repositório não encontrado.');
        setLoading(false);
        return;
      }

      setRepo(repoData);

      const [langsData, commitsData] = await Promise.all([
        githubService.getLanguages(repoData.owner.login, repoData.name),
        githubService.getCommits(repoData.owner.login, repoData.name)
      ]);

      setLanguages(langsData);
      setCommits(commitsData);
    } catch (err) {
      setError('Erro ao carregar dados. Verifique sua conexão ou o limite da API.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); 
    fetchData(searchTerm);
  };

  const hasCommits = commits.reduce((acc, curr) => acc + curr.total, 0) > 0;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        
        <div className="header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <h1>GitHub Dashboard</h1>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Buscar repositório (ex: facebook/react)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ minWidth: '250px' }}
                />
                <button 
                  type="submit" 
                  style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <Search size={18} />
                </button>
              </form>

              <button onClick={toggleTheme} className="theme-toggle" title={darkMode ? "Mudar para Claro" : "Mudar para Escuro"}>
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>

        {loading && <p style={{ textAlign: 'center', marginTop: '20px' }}>Carregando dados...</p>}
        {error && <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '20px' }}>{error}</p>}

        {!loading && repo && (
          <>
            <div className="repo-header">
              <img 
                src={repo.owner.avatar_url} 
                alt={repo.owner.login} 
                style={{ width: '64px', height: '64px', borderRadius: '50%' }}
              />
              <div style={{ flex: 1 }}>
                <h2 className="repo-title" style={{ margin: 0, fontSize: '1.5rem' }}>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.full_name}
                  </a>
                </h2>
                <p style={{ color: 'var(--text-secondary)', margin: '5px 0' }}>{repo.description}</p>
              </div>
              <div style={{ paddingLeft: '20px' }}>
                  <Github size={40} className="text-gray-800 dark:text-white" />
              </div>
            </div>

            <div className="stats-grid">
              <StatCard title="Stars" value={repo.stargazers_count} icon={Star} />
              <StatCard title="Forks" value={repo.forks_count} icon={GitFork} />
              <StatCard title="Watchers" value={repo.subscribers_count} icon={Eye} />
            </div>

            <div className="charts-container">
              {/* Só exibe o gráfico se houver commits > 0 */}
              {hasCommits ? (
                <CommitChart data={commits} />
              ) : (
                <div className="chart-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', gap: '10px' }}>
                  <GitFork size={40} style={{ opacity: 0.5 }} />
                  <p>Sem atividade de commits recente.</p>
                </div>
              )}
              
              <LanguageChart data={languages} />
            </div>
          </>
        )}
        <footer style={{ marginTop: '4rem', padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Kayo Bacelar | Desafio Técnico
          </p>
        </footer>
        {/* -------------------------------- */}
      </div>
    </div>
  );
};