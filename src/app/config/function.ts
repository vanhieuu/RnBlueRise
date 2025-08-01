import moment from 'moment';
import 'moment-lunar';

export const randomUniqueId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Function to get the Vietnamese lunar date string
export const convertToVietnameseLunarDate = (dateString: string) => {
  // Convert to moment object
  const solarDate = moment(dateString, 'DD/MM/YYYY').lunar();

  // Extract lunar day, month, and year
  const lunarDay = solarDate.format('D');
  const lunarMonth = solarDate.format('M');
  const lunarYear = solarDate.format('YYYY');

  // Get Vietnamese zodiac year name
  const vietnameseYearName = getVietnameseZodiacYear(parseInt(lunarYear));

  // Format the final string
  return `Ngày ${lunarDay} tháng ${lunarMonth} năm ${vietnameseYearName}`;
};
export const getVietnameseMonthYear = (dateString: string) => {
  // Convert to moment object
  const solarDate = moment(dateString, 'DD/MM/YYYY').lunar();

  // Extract lunar day, month, and year
  const lunarMonth = solarDate.format('M');
  const lunarYear = solarDate.format('YYYY');

  // Get Vietnamese zodiac year name
  // const vietnameseYearName = getVietnameseZodiacYear(parseInt(lunarYear));

  // Format the final string
  return `Tháng ${lunarMonth} năm ${lunarYear}`;
};
export const formatVietnameseDate = (dateString: string) => {
  // Chuyển đổi chuỗi ngày thành đối tượng moment
  const date = moment(dateString, 'DD/MM/YYYY');

  // Trả về định dạng mong muốn
  return `Tháng ${date.format('MM')} năm ${date.format('YYYY')}`;
};
// Function to get the Vietnamese zodiac year name
export const getVietnameseZodiacYear = (year: number) => {
  const can = [
    'Giáp',
    'Ất',
    'Bính',
    'Đinh',
    'Mậu',
    'Kỷ',
    'Canh',
    'Tân',
    'Nhâm',
    'Quý',
  ];
  const chi = [
    'Tý',
    'Sửu',
    'Dần',
    'Mão',
    'Thìn',
    'Tỵ',
    'Ngọ',
    'Mùi',
    'Thân',
    'Dậu',
    'Tuất',
    'Hợi',
  ];

  const canIndex = (year - 4) % 10;
  const chiIndex = (year - 4) % 12;

  return `${can[canIndex]} ${chi[chiIndex]}`;
};

const getHeavenlyStem = (lunarNumber: number): string => {
  const stems = [
    'Canh',
    'Tân',
    'Nhâm',
    'Quý',
    'Giáp',
    'Ất',
    'Bính',
    'Đinh',
    'Mậu',
    'Kỷ',
  ];
  return stems[lunarNumber % 10];
};

// Xác định Địa Chi của năm hoặc ngày
const getEarthlyBranch = (lunarNumber: number): string => {
  const branches = [
    'Tý',
    'Sửu',
    'Dần',
    'Mão',
    'Thìn',
    'Tị',
    'Ngọ',
    'Mùi',
    'Thân',
    'Dậu',
    'Tuất',
    'Hợi',
  ];
  return branches[lunarNumber % 12];
};

// Xác định tuổi xung trong ngày
export const getConflictZodiac = (branch: string): string[] => {
  const conflictMap: Record<string, string[]> = {
    Tý: ['Ngọ', 'Mão', 'Dậu'],
    Sửu: ['Mùi', 'Thìn', 'Tuất'],
    Dần: ['Thân', 'Tỵ', 'Hợi'],
    Mão: ['Dậu', 'Tý', 'Mùi'],
    Thìn: ['Tuất', 'Sửu', 'Mùi'],
    Tị: ['Hợi', 'Dần', 'Thân'],
    Ngọ: ['Tý', 'Mão', 'Dậu'],
    Mùi: ['Sửu', 'Thìn', 'Tuất'],
    Thân: ['Dần', 'Tỵ', 'Hợi'],
    Dậu: ['Mão', 'Tý', 'Ngọ'],
    Tuất: ['Thìn', 'Sửu', 'Mùi'],
    Hợi: ['Tỵ', 'Dần', 'Thân'],
  };
  return conflictMap[branch] || [];
};

// Xác định ngày Hoàng Đạo và Hắc Đạo
export const getDayType = (branch: string): string => {
  const auspiciousDays = ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu']; // Ngày Hoàng Đạo
  const inauspiciousDays = ['Dần', 'Thìn', 'Tị', 'Mùi', 'Tuất', 'Hợi']; // Ngày Hắc Đạo

  if (auspiciousDays.includes(branch)) return 'Hoàng Đạo';
  if (inauspiciousDays.includes(branch)) return 'Hắc Đạo';
  return 'Bình Thường';
};

// Xác định giờ hoàng đạo theo Thiên Can của ngày
export const getZodiacHoursWithConflict = (dateString: string) => {
  const lunarDate = moment(dateString, 'YYYY-MM-DD').lunar(); // Chuyển ngày sang âm lịch
  const lunarYear = parseInt(lunarDate.format('YYYY'), 10);
  const lunarDay = parseInt(lunarDate.format('DD'), 10);

  const heavenlyStem = getHeavenlyStem(lunarDay);
  const earthlyBranch = getEarthlyBranch(lunarDay);
  const dayType = getDayType(earthlyBranch);
  const conflictZodiacs = getConflictZodiac(earthlyBranch);

  // Danh sách giờ hoàng đạo theo Can của ngày
  const zodiacHourData: Record<string, string[]> = {
    Giáp: [
      'Tý (23h-01h)',
      'Sửu (01h-03h)',
      'Mão (05h-07h)',
      'Ngọ (11h-13h)',
      'Thân (15h-17h)',
      'Dậu (17h-19h)',
    ],
    Ất: [
      'Dần (03h-05h)',
      'Mão (05h-07h)',
      'Tị (09h-11h)',
      'Thân (15h-17h)',
      'Tuất (19h-21h)',
      'Hợi (21h-23h)',
    ],
    Bính: [
      'Tý (23h-01h)',
      'Dần (03h-05h)',
      'Mão (05h-07h)',
      'Ngọ (11h-13h)',
      'Mùi (13h-15h)',
      'Dậu (17h-19h)',
    ],
    Đinh: [
      'Sửu (01h-03h)',
      'Thìn (07h-09h)',
      'Tị (09h-11h)',
      'Mùi (13h-15h)',
      'Tuất (19h-21h)',
      'Hợi (21h-23h)',
    ],
    Mậu: [
      'Tý (23h-01h)',
      'Sửu (01h-03h)',
      'Thìn (07h-09h)',
      'Tị (09h-11h)',
      'Mùi (13h-15h)',
      'Tuất (19h-21h)',
    ],
    Kỷ: [
      'Tý (23h-01h)',
      'Sửu (01h-03h)',
      'Mão (05h-07h)',
      'Ngọ (11h-13h)',
      'Thân (15h-17h)',
      'Dậu (17h-19h)',
    ],
    Canh: [
      'Dần (03h-05h)',
      'Mão (05h-07h)',
      'Tị (09h-11h)',
      'Thân (15h-17h)',
      'Tuất (19h-21h)',
      'Hợi (21h-23h)',
    ],
    Tân: [
      'Tý (23h-01h)',
      'Dần (03h-05h)',
      'Mão (05h-07h)',
      'Ngọ (11h-13h)',
      'Mùi (13h-15h)',
      'Dậu (17h-19h)',
    ],
    Nhâm: [
      'Sửu (01h-03h)',
      'Thìn (07h-09h)',
      'Tị (09h-11h)',
      'Mùi (13h-15h)',
      'Tuất (19h-21h)',
      'Hợi (21h-23h)',
    ],
    Quý: [
      'Tý (23h-01h)',
      'Sửu (01h-03h)',
      'Thìn (07h-09h)',
      'Tị (09h-11h)',
      'Mùi (13h-15h)',
      'Tuất (19h-21h)',
    ],
  };

  return {
    date: dateString,
    lunarDate: lunarDate.format('YYYY-MM-DD'),
    heavenlyStem,
    earthlyBranch,
    zodiacHours: zodiacHourData[heavenlyStem] || [],
    conflictZodiacs,
    dayType, // Hoàng Đạo, Hắc Đạo, Bình Thường
  };
};
