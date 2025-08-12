


type FakeData = {
    value:number,
    title:string,
    percent:any,
    previousValue:number
}


export const StatusData:FakeData[] = [
    {
    title: "Học sinh mới",
    value: 138,
    previousValue: 120,
    percent: 15, // (138-120)/120*100
  },
  {
    title: "Doanh thu (×1,000₫)",
    value: 1_000,
    previousValue: 1_000,
    percent: 0, // no change
  },
  {
    title: "Số Leads mới",
    value: 717,
    previousValue: 766,
    percent: -6.4, // (717-766)/766*100 ≈ -6.4
  },
  {
    title: "Tổng số lớp",
    value: 15,
    previousValue: 15,
    percent: 0,
  },
  {
    title: "Tổng số buổi học",
    value: 138,
    previousValue: 120,
    percent: 15, 
  },
  {
    title: "Tiến dộ thu (×1,000₫)",
    value: 750,
    previousValue: 700,
    percent: 7.1, // (750-700)/700*100 ≈ 7.1
  },
]