import React, { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useReports } from '../hooks/useReports';
import ReportCard from '../components/ReportCard';

const ReportsPage: React.FC = () => {
  const { reports, loading, error } = useReports();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filters
  const categories = useMemo(() => 
    [...new Set(reports.map(r => r.category))].sort(), [reports]
  );
  
  const regions = useMemo(() => 
    [...new Set(reports.map(r => r.region))].sort(), [reports]
  );
  
  const types = useMemo(() => 
    [...new Set(reports.map(r => r.type))].sort(), [reports]
  );

  // Filtered and sorted reports
  const filteredReports = useMemo(() => {
    let filtered = reports.filter(report => {
      const matchesSearch = !searchQuery || 
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || report.category === selectedCategory;
      const matchesRegion = !selectedRegion || report.region === selectedRegion;
      const matchesType = !selectedType || report.type === selectedType;
      const matchesPrice = report.price >= priceRange[0] && report.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesRegion && matchesType && matchesPrice;
    });

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title, 'ru');
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [reports, searchQuery, selectedCategory, selectedRegion, selectedType, priceRange, sortBy, sortOrder]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedRegion('');
    setSelectedType('');
    setPriceRange([0, 10000]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Loading error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Research Reports
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional market research studies across various industries and global regions
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search by title, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Found: {filteredReports.length} reports
              </span>
              
              {/* Sort */}
              <div className="flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">By Date</option>
                  <option value="price">By Price</option>
                  <option value="title">By Title</option>
                </select>
                
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {sortOrder === 'asc' ? 
                    <SortAsc className="w-4 h-4" /> : 
                    <SortDesc className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Regions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Research Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price: ${new Intl.NumberFormat('en-US').format(priceRange[0])} - ${new Intl.NumberFormat('en-US').format(priceRange[1])}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Clear Filters */}
          {(searchQuery || selectedCategory || selectedRegion || selectedType || priceRange[1] < 10000) && (
            <div className="flex justify-end pt-4">
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Reports Grid */}
        {filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reports found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search parameters or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} featured={report.featured} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;