// reports.ts
import {SvgIconTypes} from '@assets/svgIcon';
import React from 'react';

export enum ReportType {
  BUSINESS = 1, //BÁO CÁO KINH DOANH
  ADMISSION = 2, //BÁO CÁO TUYỂN SINH
  CLASSROOM = 3, //BÁO CÁO LỚP HOCK
  STUDENTS = 4, //BÁO CÁO HỌC VIÊN
  TEACHERS = 5, //BÁO CÁO GIÁO VIÊN
  DOCUMENT = 6, //TÀI LIỆU SỐ HOÁ
}

export type Report = {
  Icon: SvgIconTypes;
  title: string;
  entries: string[];
  type: ReportType;
};

export const reportData: Report[] = [
  {
    type: ReportType.BUSINESS,
    Icon: 'DollarIcon', // ← replace with your SVG import
    title: 'Báo cáo kinh doanh',
    entries: ['Tình trạng doanh thu', 'Tình trạng đơn hàng', 'Nộp học phí'],
  },
  {
    type: ReportType.ADMISSION,
    Icon: 'LeadMagnetIcon',
    title: 'Báo cáo tuyển sinh',
    entries: ['Số Leads mới', 'Trạng thái Leads', 'Hiệu suất tư vấn'],
  },
  {
    type: ReportType.CLASSROOM,
    Icon: 'ClassRoomIcon',
    title: 'Báo cáo lớp học',
    entries: [
      'Số lượng lớp theo khóa học',
      'Trạng thái lớp học',
      'Thống kê buổi học',
    ],
  },
  {
    type: ReportType.STUDENTS,
    Icon: 'StudentsIcon',
    title: 'Báo cáo học viên',
    entries: [
      'Học viên đang theo học',
      'Thống kê cá học',
      'Tình trạng đóng học phí',
    ],
  },
  {
    type: ReportType.TEACHERS,
    Icon: 'TeachingIcon',
    title: 'Báo cáo giờ dạy giáo viên',
    entries: ['Tổng số giáo viên', 'Tổng số buổi dạy', 'Tổng số giờ dạy'],
  },
  // {
  //   type: ReportType.DOCUMENT,
  //   Icon: 'DigitizedDocumentIcon',
  //   title: 'Học liệu số hoá',
  //   entries: ['Tổng số câu hỏi, nhóm câu', 'Tổng số đề thi', 'Số lượt sử dụng'],
  // },
];
