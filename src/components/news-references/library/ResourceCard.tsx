
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';

interface ResourceCardProps {
  id: number;
  title: string;
  author?: string;
  speaker?: string;
  publisher?: string;
  journal?: string;
  year?: string;
  date?: string;
  pages?: number | string;
  duration?: string;
  articles?: number;
  number?: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  actionLabel?: string;
}

export function ResourceCard({
  title,
  author,
  speaker,
  publisher,
  journal,
  year,
  date,
  pages,
  duration,
  articles,
  number,
  category,
  description,
  icon,
  iconBgColor,
  iconColor,
  actionLabel = "Consulter"
}: ResourceCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${iconBgColor} rounded-lg`}>
            <div className={iconColor}>
              {icon}
            </div>
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {(author || speaker) && (
              <p className="text-sm text-gray-600 mt-1">
                Par {author || speaker}
              </p>
            )}
            {date && (
              <p className="text-sm text-gray-600 mt-1">{date}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{category}</Badge>
              {year && <Badge variant="secondary">{year}</Badge>}
              {duration && <Badge variant="secondary">{duration}</Badge>}
              {articles && <Badge variant="secondary">{articles} articles</Badge>}
              {number && <Badge variant="secondary">{number}</Badge>}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          {publisher && <span>{publisher}</span>}
          {journal && <span>{journal}</span>}
          {pages && <span>{typeof pages === 'number' ? `${pages} pages` : `Pages ${pages}`}</span>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            {actionLabel}
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Download className="w-4 h-4 mr-1" />
            Télécharger
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
