import {processColor} from 'react-native';

export const hexStringFromCSSColor = (color: string) => {
  const processedColor = processColor(color);
  const colorStr = `${(processedColor ?? '').toString(16)}`;
  const withoutAlpha = colorStr.substring(2, colorStr.length);
  const alpha = colorStr.substring(0, 2);
  return `#${withoutAlpha}${alpha}`;
};
export const removeVietnameseAccents = (text: string) => {
  const diacriticsMap: { [key: string]: string } = {
    'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
    'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
    'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
    'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
    'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
    'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
    'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
    'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
    'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
    'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
    'Ý': 'Y', 'Ỳ': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
    'ý': 'y', 'ỳ': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
    'Đ': 'D', 'đ': 'd'
  };

  return text.replace(/[ÀÁẢÃẠàáảãạÈÉẺẼẸèéẻẽẹÌÍỈĨỊìíỉĩịÒÓỎÕỌòóỏõọÙÚỦŨỤùúủũụÝỳỶỹỴýỳỷỹỵĐđ]/g, (match) => diacriticsMap[match] || match);
};
export const formatMoney = (amount: any) => {
  // Convert amount to a number
  const numericAmount = parseFloat(amount);

  // Check if the numericAmount is a valid number
  if (isNaN(numericAmount)) {
    return '';
  }

  // Convert numeric amount to money format
  const formattedAmount = numericAmount.toLocaleString('vi-VN', {
    minimumFractionDigits: 0,
  });

  return formattedAmount;
};