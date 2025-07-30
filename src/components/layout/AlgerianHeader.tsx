import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flag, MapPin, Shield, Heart } from 'lucide-react';

interface AlgerianHeaderProps {
  language: string;
  onLanguageChange: (lang: string) => void;
}

export const AlgerianHeader: React.FC<AlgerianHeaderProps> = ({ 
  language, 
  onLanguageChange 
}) => {
  const { t } = useTranslation();

  return (
    <header className="bg-gradient-to-r from-green-600 via-white to-red-500 shadow-lg border-b-4 border-green-800">
      {/* Bandeau gouvernemental algérien */}
      <div className="bg-green-800 text-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Flag className="h-4 w-4" />
            <div className="flex flex-col space-y-1">
              <span className="leading-tight">République Algérienne Démocratique et Populaire</span>
              <span className="text-green-200 algerian-republic-text-banner leading-tight">الجمهورية الجزائرية الديمقراطية الشعبية</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>100% Local & Indépendant</span>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo et titre */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">دز</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-green-800">
                    Dalil.dz
                  </h1>
                  <p className="text-sm text-gray-600">
                    {t('header.subtitle')}
                  </p>
                </div>
              </div>
            </div>

            {/* Indicateurs algériens */}
            <div className="flex items-center space-x-6">
              {/* Localisation algérienne */}
              <div className="flex items-center space-x-2 text-green-700">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Algérie</span>
                <span className="text-sm text-gray-500">🇩🇿</span>
              </div>

              {/* Sélecteur de langue */}
              <div className="flex items-center space-x-2">
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="px-3 py-1 border border-green-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="fr">Français</option>
                  <option value="ar">العربية</option>
                </select>
              </div>

              {/* Badge indépendance */}
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-green-800">
                  100% Algérien
                </span>
              </div>
            </div>
          </div>

          {/* Barre de recherche algérienne */}
          <div className="mt-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                className="w-full px-4 py-3 pr-12 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition-colors">
                بحث
              </button>
            </div>
          </div>

          {/* Slogan algérien */}
          <div className="mt-3 text-center">
            <p className="text-sm text-green-700 font-medium">
              {t('header.slogan')}
            </p>
            <p className="text-xs text-gray-500 mt-1" dir="rtl">
              خدمة جزائرية محلية ومستقلة بالكامل
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};