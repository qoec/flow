import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { items, removeFromCart, clearCart, getTotalPrice, getItemCount } = useCart();

  const formatPrice = (price: number) => {
    return '$' + new Intl.NumberFormat('en-US').format(price);
  };

  const handleCheckout = () => {
    // В реальной реализации это бы открыло форму оплаты
    alert('Платежная система будет доступна после интеграции с backend');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/reports"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Empty Cart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Корзина пуста
            </h1>
            
            <p className="text-gray-600 mb-8">
              It looks like you haven't selected any reports for purchase yet.
            </p>
            
            <Link
              to="/reports"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/reports"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Продолжить покупки
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900">
            Cart ({getItemCount()} {getItemCount() === 1 ? 'report' : 'reports'})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Selected Reports
                  </h2>
                  
                  {items.length > 1 && (
                    <button
                      onClick={clearCart}
                      className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.report.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={item.report.image} 
                        alt={item.report.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          <Link 
                            to={`/reports/${item.report.id}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {item.report.title}
                          </Link>
                        </h3>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                            {item.report.category}
                          </span>
                          <span className="inline-block bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs">
                            {item.report.region}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {item.report.shortDescription}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold text-gray-900">
                            {formatPrice(item.report.price)}
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.report.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Итог заказа
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Number of reports:</span>
                  <span className="font-medium">{getItemCount()}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Стоимость:</span>
                  <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">К оплате:</span>
                    <span className="text-xl font-bold text-gray-900">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>Перейти к оплате</span>
              </button>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">В стоимость входит:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• PDF-файлы высокого качества</li>
                  <li>• Моментальная доставка на email</li>
                  <li>• Поддержка по вопросам</li>
                </ul>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Безопасная оплата через защищенное соединение
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;