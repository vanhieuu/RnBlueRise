/** Common generic response wrapper */
export type ApiResp<T> = {code: number; data: T};
export type CsvResp = ArrayBuffer;

/* =========================
 * 1) BussinessReport Types
 * ========================= */
export namespace BussinessReportTypes {
  export type CommonQuery = {
    departmentId?: number;
    start?: Date | string;
    end?: Date | string;
    orderType?: number; // default -1
    assigneeId?: number; // default -1
    campainId?: number; // default -1
    sourceId?: number; // default -1
  };

  export interface OverviewBusinessData {
    totalOrder: number;
    totalNewOrder: number;
    totalReOrder: number;
    totalSession: number;
    totalPrice: number;
    totalDiscount: number;
    totalRevenue: number;
    totalDebt: number;
    revenues: {revenue: number; departmentName: string}[];
  }

  export interface RevenueAnalyticsItem {
    DepartmentName: string;
    Date: string; // yyyy-MM-dd
    TotalSession: number;
    NewOrder: number;
    ReOrder: number;
    TotalPrice: number;
    TotalDiscountValue: number;
    Revenue: number;
  }

  export interface OrderAnalyticsQuery extends CommonQuery {
    sourceType?: number; // default -1
    page?: number; // default 1
    rowPerPage?: number; // default 10
    status?: number; // default -1
  }
  export interface OrderAnalyticsItem {
    OrderCode: string;
    StudentName: string;
    StudentCode: string;
    DepartmentID: string;
    DepartmentName: string;
    SourceName: string;
    Campain: string;
    SourceType: string;
    AssigneeID: string;
    AssigneeName: string;
    CreatedTime: string; // yyyy-MM-dd
    OrderType: number;
    TotalPrice: number;
    TotalPaidByCustomer: number;
    Status: number;
  }
  export interface OrderAnalyticsData {
    Total: number;
    TotalPrice: number;
    TotalPaid: number;
    orderList: OrderAnalyticsItem[];
  }

  export interface SaleAnalyticsQuery {
    departmentId?: number;
    start?: Date | string;
    end?: Date | string;
    page?: number; // default 1
    rowPerPage?: number; // default 10
    status?: number; // default -1
  }
  export interface SaleItem {
    ID: number;
    StudentName: string;
    StudentCode: string;
    ParentName: string;
    ParentID: number;
    AssigneeID: number;
    AssigneeName: string;
    OrderCode: string;
    ReceiptCode: string;
    PaymentType: number;
    PaymentMethod: number;
    DepartmentID: number;
    DepartmentName: string;
    OrderCreatedTime: string;
    PaidTime: string;
    TotalValue: number;
    Status: number;
  }
  export interface SaleAnalyticsData {
    totalOrder: number;
    orderList: SaleItem[];
  }
}

/* =========================
 * 2) ClassReport Types
 * ========================= */
export namespace ClassReportTypes {
  export interface Query {
    departmentId?: number;
    start?: Date | string;
    end?: Date | string;
    assigneeId?: number;
    teacherId?: number;
    programId?: number;
    levelId?: number;
    courseId?: number;
    tppId?: number;
    page?: number; // default 1
    rowPerPage?: number; // default 20
    status?: number; // default -1
  }

  export interface Overview {
    totalActiveClass: number;
    totalStudent: number;
    totalTrialStudent: number;
    totalNewClass: number;
    totalCloseClass: number;
    totalLesson: number;
    totalStudentRunOutFee: number;
    statistics: {
      totalComming: number;
      totalLearning: number;
      totalDone: number;
      totalCloseEarly: number;
      departmentName: string;
    }[];
  }

  export interface ClassItem {
    classId: number;
    classCode: string;
    className: string;
    startTime: string;
    tppName: string;
    status: number;
    endTime: string;
    totalUsedSession: number;
    totalSession: number;
    teachers: string;
    assignee: string;
    teachingAssistants: string;
    programName: string;
    courseName: string;
    levelName: string;
    schedule: string;
    totalStudent: number;
    totalTrialStudent: number;
    totalStudentRunOutFee: number;
    totalStudentOutFee: number;
  }

  export interface Data {
    overview: Overview;
    totalRec: number;
    items: ClassItem[];
  }
}

/* =========================
 * 3) CRMReport Types
 * ========================= */
export namespace CRMReportTypes {
  export interface Query {
    departmentId?: number;
    start?: Date | string;
    end?: Date | string;
    page?: number; // default 1
    rowPerPage?: number; // default 20
    assigneeId?: string; // default "-1"
    campainId?: string; // default "-1"
    sourceId?: string; // default "-1"
    status?: number; // default -1
  }

  export interface OverviewCRM {
    totalOpportunities: number;
    totalTakeCare: number;
    totalSuccess: number;
    total: number;
    totalExperience: number;
    totalRejected: number;
    statistics: {
      totalOpportunities: number;
      totalTakeCare: number;
      totalSuccess: number;
      total: number;
      totalExperience: number;
      totalRejected: number;
      departmentName: string;
    }[];
  }

  export interface ItemCRM {
    departmentName: string;
    studentCode: string;
    studentName: string;
    customerCode: string;
    customerName: string;
    createdTime: string;
    sourceName: string;
    campainName: string;
    status: number;
    assignName: string;
    assignTime: string;
  }

  export interface Data {
    Overview: OverviewCRM;
    totalRec: number;
    items: ItemCRM[];
  }
}

/* =========================
 * 4) OverviewReport Types
 * ========================= */
export namespace OverviewReportTypes {
  export interface Query {
    departmentId?: number;
    start?: Date | string;
    end?: Date | string;
  }

  export interface OrderOverview {
    newOrder: number;
    reOrder: number;
    newOpportunities: number;
    totalDebt: number;
    revenues: {revenue: number; date: string}[];
  }

  export interface ClassOverview {
    totalClass: number;
    totalLesson: number;
    totalTuition: number;
    newStudent: number;
    reOrderStudent: number;
    outFeeStudent: number;
    debtStudent: number;
  }

  export interface DataOverView {
    orderOverview: OrderOverview;
    classOverview: ClassOverview;
  }
}

/* =========================
 * 5) StudentReport Types
 * ========================= */
export namespace StudentReportTypes {
  export interface OverviewQuery {
    departmentId?: number;
    start?: Date | string;
    end?: Date | string;
  }

  export interface OverviewStudentData {
    totalStudent: number;
    newStudent: number;
    outFeeStudent: number;
    debtStudent: number;
    totalLessonRegister: number;
    totalLesson: number;
    totalPrice: number;
    statistics: {
      departmentName: string;
      totalStudent: number;
      totalNewStudent: number;
    }[];
  }

  export interface DetailQuery extends OverviewQuery {
    page?: number; // default 1
    rowPerPage?: number; // default 20
  }

  export interface DetailItem {
    studentCode: string;
    studentName: string;
    customerCode: string;
    customerName: string;
    assignee: string;
    classCode: string;
    className: string;
    classStatus: number;
    teachers: string;
    classTraningStaff: string;
    totalEnjoySession: number;
    totalEnrollSession: number;
    totalNotStudy: number;
    studentStatus: number;
    tppName: string;
    pricePerUnit: number;
    totalPrice: number;
    totalPaid: number;
    totalRemainFromTPP: number;
  }

  export interface DetailData {
    totalRec: number;
    items: DetailItem[];
  }

  export interface ExportQuery extends OverviewQuery {
    studyStatus?: number; // default -1
    tppStatus?: number; // default -1
  }
}

/* =========================
 * 6) StudyReport Types
 * ========================= */
export namespace StudyReportTypes {
  export interface Query {
    departmentId?: number;
    teacherID?: number;
    managerID?: number;
    status?: number; // default -1
    page?: number; // default 1
    rowPerPage?: number; // default 20
    classCode?: string;
  }

  export interface Item {
    className: string;
    totalStudent: number;
    status: number;
    totalRate: number;
    avgRate: number;
    rateCompleteAssignment: number;
    nearestScoreAssignment: number;
    avgScoreAssignment: number;
    teachers: string;
    managerName: string;
    departmentName: string;
    courseName: string;
  }

  export interface Data {
    total: number;
    items: Item[];
  }

  export interface ExportQuery {
    departmentId?: number;
    teacherID?: number;
    managerID?: number;
    status?: number; // default -1
    classCode?: string;
  }

  export interface ExportCheckinQuery {
    start?: Date | string;
    end?: Date | string;
    classID?: number; // default -1
    departmentId?: number; // default -1
  }
}

/* =========================
 * 7) TA Types
 * ========================= */
export namespace TATypes {
  export interface Query {
    departmentId?: number;
    page?: number; // default 1
    rowPerPage?: number; // default 20
    startDate?: Date | string;
    endDate?: Date | string;
    filterText?: string;
  }

  export interface Item {
    id: number;
    departmentId: number;
    totalMinutes: number;
    departmentName: string;
    fullName: string;
    email: string;
    day: string;
    shiftStartTime: string;
    shiftEndTime: string;
    classId: number;
    className: string;
    classCode: string;
  }

  export interface Data {
    total: number;
    items: Item[];
  }
}

/* =========================
 * 8) TeacherReport Types
 * ========================= */
export namespace TeacherReportTypes {
  export interface Query {
    departmentId?: number;
    page?: number; // default 1
    rowPerPage?: number; // default 20
    startDate?: Date | string;
    endDate?: Date | string;
    filterText?: string;
  }

  export interface Item {
    id: number;
    departmentId: number;
    totalMinutes: number;
    departmentName: string;
    fullName: string;
    email: string;
    day: string;
    shiftStartTime: string;
    shiftEndTime: string;
    classId: number;
    className: string;
    classCode: string;
  }

  export interface Data {
    total: number;
    items: Item[];
  }
}
