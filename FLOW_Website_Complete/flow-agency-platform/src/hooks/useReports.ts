import { useState, useEffect } from 'react';
import { Report } from '../types/report';

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Old static fetch code:
  // useEffect(() => {
  //   const fetchReports = async () => {
  //     try {
  //       const response = await fetch('/data/reports.json');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch reports');
  //       }
  //       const data = await response.json();
  //       setReports(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'Unknown error');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchReports();
  // }, []);

  // New Strapi fetch code:
  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Change this to your Strapi API URL if needed
        const response = await fetch('https://credible-luck-2382057333.strapiapp.com/api/product');
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        // Map Strapi response to your Report type
        const mappedReports = data.data.map((item: any) => ({
          id: item.id,
          title: item.attributes.name,
          category: item.attributes.category || '',
          region: item.attributes.region || '',
          type: item.attributes.type || '',
          price: item.attributes.price,
          currency: item.attributes.currency || 'USD',
          pages: item.attributes.pages || 0,
          date: item.attributes.date || '',
          description: item.attributes.description || '',
          shortDescription: item.attributes.shortDescription || '',
          keyInsights: item.attributes.keyInsights || [],
          tableOfContents: item.attributes.tableOfContents || [],
          whatIncludes: item.attributes.whatIncludes || [],
          image: item.attributes.image?.data
            ? 'http://localhost:1337' + item.attributes.image.data.attributes.url
            : '',
          featured: item.attributes.featured || false,
        }));
        setReports(mappedReports);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const getFeaturedReports = () => reports.filter(report => report.featured);
  
  const getReportsByCategory = (category: string) => 
    reports.filter(report => report.category === category);
  
  const searchReports = (query: string) => 
    reports.filter(report => 
      report.title.toLowerCase().includes(query.toLowerCase()) ||
      report.description.toLowerCase().includes(query.toLowerCase()) ||
      report.category.toLowerCase().includes(query.toLowerCase())
    );

  const filterReports = (filters: {
    category?: string;
    region?: string;
    type?: string;
    priceRange?: [number, number];
  }) => {
    return reports.filter(report => {
      if (filters.category && report.category !== filters.category) return false;
      if (filters.region && report.region !== filters.region) return false;
      if (filters.type && report.type !== filters.type) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (report.price < min || report.price > max) return false;
      }
      return true;
    });
  };

  return {
    reports,
    loading,
    error,
    getFeaturedReports,
    getReportsByCategory,
    searchReports,
    filterReports
  };
};

export const useReport = (id: string) => {
  const { reports, loading, error } = useReports();
  const report = reports.find(r => r.id === id);
  
  return {
    report,
    loading,
    error: error || (!loading && !report ? 'Report not found' : null)
  };
};