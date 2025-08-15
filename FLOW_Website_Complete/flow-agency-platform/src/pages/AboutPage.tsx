import React from 'react';
import { Award, Users, Globe, TrendingUp, Building, Target, Zap } from 'lucide-react';
import { companyInfo, services } from '../data/company';

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'We strive for maximum accuracy in every research study and forecast'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We use cutting-edge data analysis methods and AI technologies'
    },
    {
      icon: Users,
      title: 'Client-Centricity',
      description: 'Every research study is tailored to specific client needs'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'We cover markets in 35 countries worldwide with local expertise'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About FLOW
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {companyInfo.description}
          </p>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <Building className="w-5 h-5 mr-2" />
            <span>Established in {companyInfo.established}</span>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {companyInfo.mission}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide our work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center group hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyInfo.achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {achievement.metric}
                </div>
                <div className="text-gray-600">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Expertise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Areas of Expertise
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyInfo.expertise.map((area, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-500 flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            We Work Worldwide
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companyInfo.offices.map((office, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <p className="text-white font-medium">{office}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;