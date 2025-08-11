import {client, CSV_RESPONSE, get} from '@config/client';
import {
  ApiResp,
  BussinessReportTypes,
  ClassReportTypes,
  CRMReportTypes,
  CsvResp,
  OverviewReportTypes,
  StudentReportTypes,
  StudyReportTypes,
  TATypes,
  TeacherReportTypes,
} from '@model/erpApiType';

/* =========================
 * 1) BussinessReportController
 * ========================= */
export namespace BussinessReportAPI {
  export function getOverviewBusiness(
    params: BussinessReportTypes.CommonQuery,
  ) {
    return get<ApiResp<BussinessReportTypes.OverviewBusinessData>>(
      '/api/BussinessReport/get-overview-business',
      params,
    );
  }

  export function getRevenueAnalytics(
    params: BussinessReportTypes.CommonQuery,
  ) {
    return get<ApiResp<BussinessReportTypes.RevenueAnalyticsItem[]>>(
      '/api/BussinessReport/get-revenue-analytics',
      params,
    );
  }

  export async function exportRevenueAnalytics(
    params: BussinessReportTypes.CommonQuery,
  ) {
    const resp = await client.get<CsvResp>(
      '/api/BussinessReport/export-revenue-analytics',
      {
        params,
        ...CSV_RESPONSE,
      },
    );
    return resp.data;
  }

  export function getOrderAnalytics(
    params: BussinessReportTypes.OrderAnalyticsQuery,
  ) {
    return get<ApiResp<BussinessReportTypes.OrderAnalyticsData>>(
      '/api/BussinessReport/get-order-analytics',
      params,
    );
  }

  export async function exportOrderAnalytics(
    params: BussinessReportTypes.OrderAnalyticsQuery,
  ) {
    const resp = await client.get<CsvResp>(
      '/api/BussinessReport/export-order-analytics',
      {
        params,
        ...CSV_RESPONSE,
      },
    );
    return resp.data;
  }

  export function getSaleAnalytics(
    params: BussinessReportTypes.SaleAnalyticsQuery,
  ) {
    return get<ApiResp<BussinessReportTypes.SaleAnalyticsData>>(
      '/api/BussinessReport/get-sale-analytics',
      params,
    );
  }

  export async function exportSaleAnalytics(
    params: Omit<
      BussinessReportTypes.SaleAnalyticsQuery,
      'page' | 'rowPerPage'
    >,
  ) {
    const resp = await client.get<CsvResp>(
      '/api/BussinessReport/export-sale-analytics',
      {
        params,
        ...CSV_RESPONSE,
      },
    );
    return resp.data;
  }
}

/* =========================
 * 2) ClassReportController
 * ========================= */
export namespace ClassReportAPI {
  export function getClassAnalytics(params: ClassReportTypes.Query) {
    return get<ApiResp<ClassReportTypes.Data>>(
      '/api/ClassReport/get-class-analytics',
      params,
    );
  }

  export async function exportClassAnalytics(
    params: Omit<ClassReportTypes.Query, 'page' | 'rowPerPage'>,
  ) {
    const resp = await client.get<CsvResp>(
      '/api/ClassReport/export-class-analytics',
      {
        params,
        ...CSV_RESPONSE,
      },
    );
    return resp.data;
  }

  export async function exportClassStudent(classID: string) {
    const resp = await client.get<CsvResp>(
      '/api/ClassReport/export-class-student',
      {
        params: {classID},
        ...CSV_RESPONSE,
      },
    );
    return resp.data;
  }
}

/* =========================
 * 3) CRMReportController
 * ========================= */
export namespace CRMReportAPI {
  export function getCRMAnalytics(params: CRMReportTypes.Query) {
    return get<ApiResp<CRMReportTypes.Data>>(
      '/api/CRMReport/get-crm-analytics',
      params,
    );
  }

  export async function exportCRMAnalytics(
    params: Omit<CRMReportTypes.Query, 'page' | 'rowPerPage'>,
  ) {
    const resp = await client.get<CsvResp>(
      '/api/CRMReport/export-crm-analytics',
      {
        params,
        ...CSV_RESPONSE,
      },
    );
    return resp.data;
  }
}

/* =========================
 * 4) OverviewReportController
 * ========================= */
export namespace OverviewReportAPI {
  export function getOverviewReport(params: OverviewReportTypes.Query) {
    return get<ApiResp<OverviewReportTypes.DataOverView>>(
      '/api/OverviewReport/get-overview-report',
      params,
    );
  }
}

/* =========================
 * 5) StudentReportController
 * ========================= */
export namespace StudentReportAPI {
  export function getOverviewStudentAnalytics(
    params: StudentReportTypes.OverviewQuery,
  ) {
    return get<ApiResp<StudentReportTypes.OverviewStudentData>>(
      '/api/StudentReport/get-overview-student-analytics',
      params,
    );
  }

  export function getStudentAnalytics(params: StudentReportTypes.DetailQuery) {
    return get<ApiResp<StudentReportTypes.DetailData>>(
      '/api/StudentReport/get-student-analytics',
      params,
    );
  }

  export async function exportStudentAnalytics(
    params: StudentReportTypes.ExportQuery,
  ) {
    const resp = await client.get<CsvResp>(
      '/api/StudentReport/export-student-analytics',
      {
        params,
        ...CSV_RESPONSE,
      },
    );
    return resp.data;
  }
}

/* =========================
 * 6) StudyReportController
 * ========================= */
export namespace StudyReportAPI {
  export function getStudyData(params: StudyReportTypes.Query) {
    return get<ApiResp<StudyReportTypes.Data>>(
      '/api/StudyReport/get-study-data',
      params,
    );
  }

  export async function exportStudyData(params: StudyReportTypes.ExportQuery) {
    const resp = await client.get<CsvResp>(
      '/api/StudyReport/export-study-data',
      {
        params,
        ...CSV_RESPONSE,
      },
    );
    return resp.data;
  }

  export async function exportStudyCheckin(
    params: StudyReportTypes.ExportCheckinQuery,
  ) {
    const resp = await client.get<CsvResp>(
      '/api/StudyReport/export-study-checkin',
      {
        params,
        ...CSV_RESPONSE,
      },
    );
    return resp.data;
  }
}

/* =========================
 * 7) TAController
 * ========================= */
export namespace TAAPI {
  export function getTAAnalytics(params: TATypes.Query) {
    return get<ApiResp<TATypes.Data>>('/api/TA/get-ta-analytics', params);
  }

  export async function exportTAAnalytics(
    params: Omit<TATypes.Query, 'page' | 'rowPerPage'>,
  ) {
    const resp = await client.get<CsvResp>('/api/TA/export-ta-analytics', {
      params,
      ...CSV_RESPONSE,
    });
    return resp.data;
  }
}

/* =========================
 * 8) TeacherReportController
 * ========================= */
export namespace TeacherReportAPI {
  export function getTeacherAnalytics(params: TeacherReportTypes.Query) {
    return get<ApiResp<TeacherReportTypes.Data>>(
      '/api/TeacherReport/get-teacher-analytics',
      params,
    );
  }

  export async function exportTeacherAnalytics(
    params: Omit<TeacherReportTypes.Query, 'page' | 'rowPerPage'>,
  ) {
    const resp = await client.get<CsvResp>(
      '/api/TeacherReport/export-teacher-analytics',
      {
        params,
        ...CSV_RESPONSE,
      },
    );
    return resp.data;
  }
}
