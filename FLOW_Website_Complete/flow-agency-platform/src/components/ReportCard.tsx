import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, MapPin, Tag, ShoppingCart } from 'lucide-react';
import { Report } from '../types/report';
import { useCart } from '../contexts/CartContext';

interface ReportCardProps {
  report: Report;
  featured?: boolean;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, featured = false }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return '$' + new Intl.NumberFormat('en-US').format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(report);
  };

  // Stripe one-time purchase handler
  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const backendUrl = process.env.REACT_APP_STRAPI_URL || 'https://reliable-crown-c39c2b69e7.strapiapp.com/';
      // You may need to adjust the endpoint and payload based on your backend
      const res = await fetch(`${backendUrl}/stripe-payment/api/purchases/checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId: report.id,
          // Add user/org info if needed
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to start checkout');
      }
    } catch (err) {
      alert('Error connecting to payment gateway');
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
      featured ? 'ring-2 ring-blue-100' : ''
    }`}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={report.image} 
          alt={report.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {report.pages} pages
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
            <Tag className="w-3 h-3" />
            <span>{report.category}</span>
          </span>
          <span className="inline-flex items-center space-x-1 bg-gray-50 text-gray-600 px-2 py-1 rounded-md text-xs">
            <MapPin className="w-3 h-3" />
            <span>{report.region}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link to={`/reports/${report.id}`}>
            {report.title}
          </Link>
        </h3>

        {/* Type & Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="inline-flex items-center space-x-1">
            <FileText className="w-4 h-4" />
            <span>{report.type}</span>
          </span>
          <span className="inline-flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(report.date)}</span>
          </span>
        </div>

        {/* Preview */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {report.shortDescription}
        </p>

        {/* Key Findings */}
        {report.keyInsights.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 mb-2">Key Insights:</p>
            <ul className="space-y-1">
              {report.keyInsights.slice(0, 2).map((finding, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-start space-x-2">
                  <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="line-clamp-1">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(report.price)}
            </span>
            <span className="text-xs text-gray-500">one-time purchase</span>
          </div>
          
          <div className="flex space-x-2">
            <Link
              to={`/reports/${report.id}`}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              View Details
            </Link>
            <button
              onClick={handleBuyNow}
              className="p-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors group"
              title="Buy now"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors group"
              title="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;