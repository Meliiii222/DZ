/**
 * Utilitaire pour la conversion et formatage des dates
 */

// Mapping des mois français vers numéros
const FRENCH_MONTHS: { [key: string]: string } = {
  'janvier': '01',
  'février': '02', 
  'fevrier': '02',
  'mars': '03',
  'avril': '04',
  'mai': '05',
  'juin': '06',
  'juillet': '07',
  'août': '08',
  'aout': '08',
  'septembre': '09',
  'octobre': '10',
  'novembre': '11',
  'décembre': '12',
  'decembre': '12'
};

/**
 * Convertit une date du format français "15 janvier 2024" vers le format ISO "2024-01-15"
 */
export function convertFrenchDateToISO(frenchDate: string): string {
  if (!frenchDate || typeof frenchDate !== 'string') {
    return '';
  }

  // Si c'est déjà au format ISO, retourner tel quel
  if (/^\d{4}-\d{2}-\d{2}$/.test(frenchDate)) {
    return frenchDate;
  }

  try {
    // Pattern pour "15 janvier 2024" ou "15/01/2024" ou "15-01-2024"
    const frenchPattern = /^(\d{1,2})\s+(\w+)\s+(\d{4})$/i;
    const numericPattern = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/;

    let day: string, month: string, year: string;

    if (frenchPattern.test(frenchDate)) {
      // Format "15 janvier 2024"
      const match = frenchDate.match(frenchPattern);
      if (!match) return '';

      day = match[1].padStart(2, '0');
      const monthName = match[2].toLowerCase();
      month = FRENCH_MONTHS[monthName] || '01';
      year = match[3];
    } else if (numericPattern.test(frenchDate)) {
      // Format "15/01/2024" ou "15-01-2024"
      const match = frenchDate.match(numericPattern);
      if (!match) return '';

      day = match[1].padStart(2, '0');
      month = match[2].padStart(2, '0');
      year = match[3];
    } else {
      // Essayer de parser avec Date
      const parsed = new Date(frenchDate);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split('T')[0];
      }
      return '';
    }

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.warn('Erreur lors de la conversion de date:', frenchDate, error);
    return '';
  }
}

/**
 * Convertit une date ISO vers le format français lisible
 */
export function convertISOToFrenchDate(isoDate: string): string {
  if (!isoDate || typeof isoDate !== 'string') {
    return '';
  }

  try {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) {
      return isoDate; // Retourner tel quel si invalide
    }

    const day = date.getDate();
    const monthNames = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch (error) {
    console.warn('Erreur lors de la conversion ISO vers français:', isoDate, error);
    return isoDate;
  }
}

/**
 * Valide et nettoie une date pour les champs de formulaire
 */
export function sanitizeDateForInput(dateValue: string | Record<string, unknown>): string {
  if (!dateValue) return '';
  
  const stringValue = String(dateValue).trim();
  if (!stringValue) return '';

  // Si c'est déjà au format ISO, retourner tel quel
  if (/^\d{4}-\d{2}-\d{2}$/.test(stringValue)) {
    return stringValue;
  }

  // Sinon, essayer de convertir
  return convertFrenchDateToISO(stringValue);
}