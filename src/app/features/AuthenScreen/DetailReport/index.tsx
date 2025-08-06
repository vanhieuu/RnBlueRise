import {images} from '@assets/image';
import {
  BarSeries,
  BaseScreenLayout,
  Block,
  MonthPicker,
  PieChartCard,
  PieSlice,
  StackedBarChartCard,
  SvgIcon,
  Text,
  OrderSlice,
  OrderValueChart,
  StatusSlice,
  ClassStatusChart,
  TeacherHoursChart,
} from '@components';
import {APP_SCREEN, RootStackParamList} from '@navigation/screen-type';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppTheme, useTheme} from '@theme';
import {createThemedStyles, StatusData} from '@utils';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {ReportType} from '../BottomScreen/Report/components/report';
import {goBack} from '@navigation/navigation-services';
import RenderOverviewDetail from './components/RenderOverviewDetail';

const pieData: PieSlice[] = [
  {key: 'cn1', label: 'Chi nhánh 1', value: 25, color: '#4caf50'},
  {key: 'cn2', label: 'Chi nhánh 2', value: 12, color: '#f44336'},
  {key: 'cn3', label: 'Chi nhánh 3', value: 63, color: '#2196f3'},
];

const barSeries: BarSeries[] = [
  {
    key: 'collected',
    label: 'Tiền đã thu',
    color: '#4caf50',
    data: [
      {branch: 'CN1', value: 200},
      {branch: 'CN2', value: 150},
      {branch: 'CN3', value: 300},
      {branch: 'CN4', value: 180},
    ],
  },
  {
    key: 'debt',
    label: 'Tiền đơn nợ',
    color: '#ff9800',
    data: [
      {branch: 'CN1', value: 50},
      {branch: 'CN2', value: 70},
      {branch: 'CN3', value: 40},
      {branch: 'CN4', value: 60},
    ],
  },
  {
    key: 'promo',
    label: 'Tiền khuyến mãi',
    color: '#2196f3',
    data: [
      {branch: 'CN1', value: 30},
      {branch: 'CN2', value: 20},
      {branch: 'CN3', value: 50},
      {branch: 'CN4', value: 25},
    ],
  },
];

const branches = ['CN 1', 'CN 2', 'CN 3', 'CN 4'];
const slices: OrderSlice[] = [
  {key: 'new', label: 'Cơ hội mới', color: '#ccc', values: [50, 40, 30, 60]},
  {key: 'contact', label: 'Liên hệ', color: '#69f', values: [30, 20, 15, 25]},
  {key: 'trial', label: 'Trải nghiệm', color: '#fa0', values: [20, 15, 10, 30]},
  {key: 'think', label: 'Chờ suy nghĩ', color: '#90f', values: [10, 8, 5, 15]},
  {
    key: 'win',
    label: 'Chốt thành công',
    color: '#4c4',
    values: [15, 12, 8, 20],
  },
  {key: 'lose', label: 'Từ chối', color: '#e44', values: [5, 3, 2, 10]},
];

const branchesClasses = [
  'Chi nhánh 1',
  'Chi nhánh 2',
  'Chi nhánh 3',
  'Chi nhánh 4',
];
const statusSlices: StatusSlice[] = [
  {key: 'pending', label: 'Chưa bắt đầu', color: '#fa0', values: [5, 4, 3, 6]},
  {
    key: 'ongoing',
    label: 'Đang diễn ra',
    color: '#4c4',
    values: [15, 12, 13, 18],
  },
  {key: 'done', label: 'Đã hoàn thành', color: '#69f', values: [8, 6, 7, 10]},
  {key: 'early', label: 'Kết thúc sớm', color: '#e44', values: [1, 2, 1, 2]},
];
const teachers = ['Giáo viên A', 'Giáo viên B', 'Giáo viên C', 'Giáo viên D'];

// 2. The four raw data arrays (same length as `teachers`):
//    - mainLessons: số buổi dạy chính
//    - subLessons:  số buổi dạy thay
//    - mainMinutes: số phút dạy chính
//    - subHours:    số giờ dạy thay
const mainLessons = [20, 18, 22, 15];
const subLessons = [5, 3, 7, 2];
const mainMinutes = [1200, 1100, 1300, 900];
const subHours = [0.5, 1.0, 0.75, 0.25];

const DetailReportScreen = () => {
  const params =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.DETAIL_REPORT>>().params;
  const theme = useTheme();
  const styles = detailReportStyle(theme);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const renderData = (type: ReportType) => {
    switch (type) {
      case ReportType.BUSINESS:
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: theme.colors.white}}>
            <RenderOverviewDetail data={StatusData} />
            <Block paddingHorizontal={16} paddingTop={15}>
              <Text fontSize={14} fontWeight="bold" colorTheme="text">
                Thống kê tháng này
              </Text>
            </Block>
            <PieChartCard
              title="Phân bố doanh thu theo chi nhánh"
              data={pieData}
            />
            <StackedBarChartCard
              title="Giá trị các Đơn hàng tháng này"
              series={barSeries}
            />
          </ScrollView>
        );
      case ReportType.ADMISSION:
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: theme.colors.white}}>
            <RenderOverviewDetail data={StatusData} />
            <Block paddingHorizontal={16} paddingTop={15}>
              <Text fontSize={14} fontWeight="bold" colorTheme="text">
                Thống kê tháng này
              </Text>
            </Block>
            <OrderValueChart
              title="Giá trị các Đơn hàng tháng này"
              branches={branches}
              slices={slices}
            />
          </ScrollView>
        );
      case ReportType.CLASSROOM:
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: theme.colors.white}}>
            <RenderOverviewDetail data={StatusData} />
            <Block paddingHorizontal={16} paddingTop={15}>
              <Text fontSize={14} fontWeight="bold" colorTheme="text">
                Thống kê tháng này
              </Text>
            </Block>
            <ClassStatusChart
              title="Số lớp học theo trạng thái"
              branches={branchesClasses}
              slices={statusSlices}
            />
          </ScrollView>
        );
      case ReportType.STUDENTS:
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: theme.colors.white}}>
            <RenderOverviewDetail data={StatusData} />
            <Block paddingHorizontal={16} paddingTop={15}>
              <Text fontSize={14} fontWeight="bold" colorTheme="text">
                Thống kê tháng này
              </Text>
            </Block>
            <PieChartCard
              horizontal={true}
              isCheckBox={true}
              title="Số học viên đang học theo chi nhánh"
              data={pieData}
              content={`Tổng số :${pieData.reduce(
                (sum, slice) => sum + slice.value,
                0,
              )}`}
            />

            <PieChartCard
              horizontal={true}
              isCheckBox={true}
              title="Số học viên đang học theo chi nhánh"
              data={pieData}
              content={`Tổng số :${pieData.reduce(
                (sum, slice) => sum + slice.value,
                0,
              )}`}
            />
          </ScrollView>
        );
      case ReportType.TEACHERS:
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: theme.colors.white}}>
            <RenderOverviewDetail data={StatusData} />
            <Block paddingHorizontal={16} paddingTop={15}>
              <Text fontSize={14} fontWeight="bold" colorTheme="text">
                Thống kê tháng này
              </Text>
            </Block>
            <TeacherHoursChart
              title="Hoạt động giảng dạy"
              teachers={teachers}
              mainLessons={mainLessons}
              subLessons={subLessons}
              mainMinutes={mainMinutes}
              subHours={subHours}
            />
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <BaseScreenLayout
      contentStyle={styles.root}
      backgroundImage={images.bgFull}
      isFullScreenBackground={true}>
      <Block
        direction="row"
        marginTop={0}
        paddingHorizontal={16}
        justifyContent="space-between"
        alignItems="center">
        <TouchableOpacity onPress={goBack}>
          <SvgIcon source="ArrowLeft" size={30} colorTheme="white" />
        </TouchableOpacity>
        <Block alignSelf="center" block paddingVertical={10}>
          <Text colorTheme="white" fontSize={24} textAlign="center">
            {' '}
            {params.title || 'Báo cáo'}{' '}
          </Text>
        </Block>
      </Block>

      <Block colorTheme="white">
        <MonthPicker
          selectedMonth={selectedMonth}
          onChange={newMonthIndex => setSelectedMonth(newMonthIndex)}
        />
      </Block>

      {renderData(params.type)}
    </BaseScreenLayout>
  );
};
export default React.memo(DetailReportScreen);

const detailReportStyle = (theme: AppTheme) =>
  createThemedStyles({
    root: {
      flex: 1,
      backgroundColor: theme.colors.transparent,
    },
  });
