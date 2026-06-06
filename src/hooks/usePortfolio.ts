import type { PortfolioData } from '../types/portfolio';
import portfolioDataJson from '../data/portfolio.json';

export const usePortfolio = (): PortfolioData => {
  return portfolioDataJson as PortfolioData;
};
