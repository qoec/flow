import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, MapPin, Tag, ShoppingCart, Download, Users, BarChart3, Award } from 'lucide-react';
import { useReport } from '../hooks/useReports';
import { useCart } from '../contexts/CartContext';

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id || '';
  const { report, loading, error } = useReport(reportId);
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return '$' + new Intl.NumberFormat('en-US').format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddToCart = () => {
    if (report) {
      addToCart(report);
    }
  };

  const handlePurchase = () => {
    // В реальной реализации это бы открыло форму платежа
    alert('Функция покупки будет доступна после интеграции платежной системы');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Отчет не найден</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/reports"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/reports"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Reports
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  <Tag className="w-4 h-4" />
                  <span>{report.category}</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{report.region}</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                  <FileText className="w-4 h-4" />
                  <span>{report.type}</span>
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {report.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                <span className="inline-flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Published: {formatDate(report.date)}</span>
                </span>
                <span className="inline-flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{report.pages} pages</span>
                </span>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {report.description}
              </p>
            </div>

            {/* Report Image */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <img 
                src={report.image} 
                alt={report.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Report Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                {report.shortDescription}
              </p>
            </div>

            {/* Key Findings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Insights</h2>
              <div className="grid gap-4">
                {report.keyInsights.map((finding, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{finding}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Содержание</h2>
              <ol className="space-y-3">
                {report.tableOfContents.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="bg-blue-100 text-blue-600 text-sm font-medium px-2 py-1 rounded min-w-[2rem] text-center">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Purchase Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {formatPrice(report.price)}
                </div>
                <p className="text-sm text-gray-500">разовая покупка</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <button
                  onClick={handlePurchase}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Купить сейчас
                </button>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Report includes:</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-green-600" />
                    <span>PDF-файл высокого качества</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                    <span>Графики и схемы</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span>Данные опросов</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <span>Экспертные рекомендации</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-100 pt-6 mt-6">
                <p className="text-xs text-gray-500 text-center">
                  Моментальная доставка на email после оплаты
                </p>
              </div>
            </div>
            
            {/* Contact Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Need a custom research?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                We will create a custom report tailored to your needs
              </p>
              <Link
                to="/contact"
                className="inline-block w-full text-center py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Обсудить проект
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailPage;