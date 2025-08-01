/* eslint-disable no-param-reassign */

import moment from "moment";


const MONTH_NAMES = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];
const DAYS_REMIND = 7;

export default {
  padding(input:number) {
    return `${input > 9 ? input : `0${input}`}`;
  },
  formatDate(date:Date) {
    if (date && typeof date.getDate === 'function') {
      return `${this.padding(date.getDate())}/${this.padding(
        date.getMonth() + 1,
      )}/${date.getFullYear().toString()}`;
    }
    return null;
  },
  getDayOfDate(date:Date) {
    const WEEKDAYSNAME = [
      'Thứ hai',
      'Thứ ba',
      'Thứ tư',
      'Thứ năm',
      'Thứ sáu',
      'Thứ bảy',
      'Chủ nhật',
    ];
    let day = date.getDay();
    if (date.getDay() === 0) {
      day = 7;
    }
    return WEEKDAYSNAME[day - 1];
  },
  formatFullDate(date:Date) {
    const dateFormatted = this.formatDate(date);
    const day = this.getDayOfDate(date);
    return `${day}, ${dateFormatted}`;
  },
  formatMMM_yyyy(date:Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return `${MONTH_NAMES[month]}/${year}`;
  },
  isDate(date:Date) {
    return date != null && typeof date.getDate === 'function';
  },
  addDate(date:Date, type:string, count:number) {
    if (
      this.isDate(date) &&
      typeof type === 'string' &&
      typeof count === 'number'
    ) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      switch (type) {
        case 'month':
          return new Date(year, month + count, day);
        default:
          return date;
      }
    }
    return date;
  },
  formatMillisecondToDate(time:any) {
    const date = new Date(time);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return [day, month, date.getFullYear()].join('/');
  },
  getRemindDays(time:any) {
    const currentTime = new Date().getTime();
    const difference = time - currentTime;
    if (difference > 0) {
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > DAYS_REMIND) {
        return null;
      } else if (hours < 24 && hours > 0) {
        // return SwitchLanguage.voucherRemindHour.replace('{hours}', hours);
      } else if (minutes < 60 && minutes > 0) {
        // return SwitchLanguage.voucherRemindMinute.replace('{minutes}', minutes);
      } else if (seconds < 60 && seconds > 0) {
        // return SwitchLanguage.voucherRemindSecond.replace('{seconds}', seconds);
      }
      // return SwitchLanguage.voucherRemindDay.replace('{days}', days);
    }
    return null;
  },
  roundNumber(number:any) {
    return number > 9 ? number : `0${number}`;
  },
  getDate(date:any) {
    const daytmp = new Date(parseInt(date)).getDate();
    const daytmpStr = this.roundNumber(daytmp);
    const monthtmp = new Date(parseInt(date)).getMonth() + 1;
    const monthtmpStr = this.roundNumber(monthtmp);
    const yeartmp = new Date(parseInt(date)).getFullYear();
    const hourTmp = new Date(parseInt(date)).getHours();
    const hourTmpStr = this.roundNumber(hourTmp);
    const minuteTmp = new Date(parseInt(date)).getMinutes();
    const minuteTmpStr = this.roundNumber(minuteTmp);
    return {
      day: daytmpStr,
      month: monthtmpStr,
      year: yeartmp,
      hour: hourTmpStr,
      minute: minuteTmpStr,
    };
  },
  findMax(symbol:any) {
    const mapMax:any = {
      dd: 31,
      mm: 12,
      yyyy: 9999,
    };
    return mapMax[symbol!] || 0;
  },

  min(num1:string, num2:string) {
    if (parseInt(num2) < parseInt(num1)) {
      return num2.toString();
    }
    return num1.toString();
  },

  /**
   *
   * @param {*} value
   * value 10102020
   * @param {*} formatDate
   * formatDate ['dd/mm/yyyy', 'dd-mm-yyyy', 'yyyy-mm-dd', 'yyyy/mm/dd']
   * Return a day in format 10/10/2020 or 10-10-2020
   */
  stringToDate(value:string, formatDate:any, backup = '') {
    if (value && typeof value === 'string') {
      const sign = formatDate.includes('/') ? '/' : '-';
      const date = formatDate.split(sign);
      const countSymbol = (backup.match(new RegExp(`${sign}`, 'g')) || [])
        .length;

      const valueNoneSign = value.replace(/\//g, '').replace(/-/g, '');
      const s1 = valueNoneSign.substring(0, date[0].length);
      const s2 = valueNoneSign.substring(
        date[0].length,
        date[0].length + date[1].length,
      );
      const s3 = valueNoneSign.substring(
        date[0].length + date[1].length,
        date[0].length + date[1].length + date[2].length,
      );
      const dateArray = [];
      if (s1) {
        dateArray.push(this.min(this.findMax(date[0]), s1));
      }
      if (s2) {
        dateArray.push('/');
        dateArray.push(this.min(this.findMax(date[1]), s2));
      } else if (s1.length === date[0].length && !s2 && countSymbol === 0) {
        dateArray.push('/');
      }
      if (s3) {
        dateArray.push('/');
        dateArray.push(this.min(this.findMax(date[2]), s3));
      } else if (s2.length === date[1].length && !s3 && countSymbol === 1) {
        dateArray.push('/');
      }
      return dateArray.join('');
    }
    return value;
  },
};

export const getLunarDate = (dateString: string) => {
  const lunarMoment = moment(dateString, 'YYYY-MM-DD').lunar();
  const lunarDay = lunarMoment.format('D'); // Get lunar day
  const lunarMonth = lunarMoment.format('M'); // Get lunar month
  return lunarDay === '1' ? `${lunarDay}/${lunarMonth}` : lunarDay;
};
  export const getEarthlyBranch = (dateString: string): string => {
    const lunarMoment = moment(dateString, 'YYYY-MM-DD').lunar();
    const lunarYear = lunarMoment.year();
    const chiIndex = (lunarYear - 4) % 12; // Công thức tính Địa Chi
    const chiNames = [
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
    return chiNames[chiIndex];
  };
  export const HOANG_DAO: any = {
    Tý: ['Thanh Long', 'Minh Đường'],
    Sửu: ['Minh Đường', 'Kim Quỹ'],
    Dần: ['Thiên Hỷ', 'Bảo Quang'],
    Mão: ['Thanh Long', 'Ngọc Đường'],
    Thìn: ['Minh Đường', 'Tư Mệnh'],
    Tỵ: ['Kim Quỹ', 'Ngọc Đường'],
    Ngọ: ['Thanh Long', 'Bảo Quang'],
    Mùi: ['Minh Đường', 'Tư Mệnh'],
    Thân: ['Kim Quỹ', 'Ngọc Đường'],
    Dậu: ['Thanh Long', 'Minh Đường'],
    Tuất: ['Minh Đường', 'Kim Quỹ'],
    Hợi: ['Thiên Hỷ', 'Ngọc Đường'],
  };
  export const isHoangDao = (dateString: string) => {
    const earthlyBranch = getEarthlyBranch(dateString);
    return HOANG_DAO[earthlyBranch] !== undefined;
  };
