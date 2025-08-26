declare global {
  interface Window {
    __userInfoSent?: boolean;
  }
}
// Collect user info and send to Strapi once on app load
/*
if (typeof window !== 'undefined') {
  if (!window.__userInfoSent) {
    window.__userInfoSent = true;
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const userInfo = {
          region: data.region,
          ip: data.ip,
          userAgent: navigator.userAgent,
          language: navigator.language
        };
        fetch('https://credible-luck-2382057333.strapiapp.com/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: userInfo })
        });
      })
      .catch(() => {});
  }
}
*/
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
        const response = await fetch('https://reliable-crown-c39c2b69e7.strapiapp.com/api/reports?populate=picture');
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        // Map Strapi response to your Report type (fields at top level)
        const mappedReports = data.data.map((item: any) => {
          const attrs = item.attributes || item;
          return {
            id: item.id,
            name: attrs.name,
            title: attrs.name || attrs.title,
            category: attrs.category || '',
            region: attrs.region || '',
            type: attrs.type || '',
            price: attrs.price,
            currency: attrs.currency || 'USD',
            pages: attrs.pages || 0,
            date: attrs.date || '',
            description: attrs.description || '',
            shortDescription: attrs.shortDescription || '',
            keyInsights: attrs.keyInsights || [],
            tableOfContents: attrs.tableOfContents || [],
            whatIncludes: attrs.whatIncludes || [],
            image: Array.isArray(attrs.picture) && attrs.picture.length > 0
              ? attrs.picture[0].formats?.thumbnail?.url || attrs.picture[0].url
              : (attrs.picture?.formats?.thumbnail?.url || attrs.picture?.url || ''),
            featured: attrs.featured || false,
            documentId: attrs.documentId || '',
            picture: attrs.picture || [],
          };
        });
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