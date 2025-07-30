
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, File, X } from 'lucide-react';

interface FileUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
}

export function FileUploadField({ 
  label, 
  value, 
  onChange, 
  accept = "*" 
}: FileUploadFieldProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload the file and get a URL
      // For now, we'll just store the filename
      onChange(file.name);
    }
  };

  const clearFile = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      
      {value ? (
        <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-md bg-gray-50">
          <File className="w-4 h-4 text-blue-600" />
          <span className="flex-1 text-sm text-gray-700">{value}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearFile}
            className="text-red-500 hover:bg-red-50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="relative">
          <Input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors">
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Cliquer pour télécharger ou glisser-déposer
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Formats supportés: PDF, DOC, DOCX
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
