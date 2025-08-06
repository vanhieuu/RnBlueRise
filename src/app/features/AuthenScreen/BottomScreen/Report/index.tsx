import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
} from 'react-native';
import React, {useCallback, useMemo, useState, useTransition} from 'react';
import {BaseScreenLayout, Block, Header, SearchBar} from '@components';
import {images} from '@assets/image';
import {AppTheme, useTheme} from '@theme';
import {createThemedStyles} from '@utils';
import SearchComponent from '../TrendingUp/components/SearchComponent';
import {ReportList} from './components/ReportList';
import {Report, reportData} from './components/report';
import {navigate} from '@navigation/navigation-services';
import {APP_SCREEN} from '@navigation/screen-type';

const ReportTabScreen = () => {
  const theme = useTheme();
  const styles = rootStyles(theme);
  const [isPending, startEffect] = useTransition();
  const [show, setShow] = useState(false);
  const [valueSearch, setValueSearch] = useState<string>('');
  const onChangeText = useCallback((text: string) => {
    startEffect(() => {
      setValueSearch(text);
    });
  }, []);

  const onSubmitText = useCallback((text: string) => {
    setValueSearch(text);
  }, []);

  function normalizeText(str: string): string {
    return str
      .normalize('NFD') // decompose combined letters
      .replace(/[\u0300-\u036f]/g, '') // strip diacritics
      .toLowerCase(); // case‐insensitive
  }

  const filteredReportData = useMemo(
    () =>
      reportData.filter(item => {
        // normalize both sides
        const title = normalizeText(item.title);
        const query = normalizeText(valueSearch);
        return title.includes(query);
      }),
    [valueSearch],
  );

  const onPressItem = useCallback((item: Report) => {
    navigate(APP_SCREEN.DETAIL_REPORT, {type: item.type, title: item.title});
  }, []);

  return (
    <BaseScreenLayout
      backgroundImage={images.bgFull}
      contentStyle={styles.root}
      isFullScreenBackground={true}
      renderHeader={() => (
        <Header
          userName={'Tên user'}
          nameOfEducationCenter={'Tên trung tâm GD'}
          imageUrl={''}
          setShow={setShow}
        />
      )}>
      <Block block colorTheme="body" paddingTop={10}>
        <SearchComponent
          value={valueSearch}
          onChangeText={onChangeText}
          onSubmitText={onSubmitText}
        />
        <ReportList data={filteredReportData} onPressItem={onPressItem} />
      </Block>
    </BaseScreenLayout>
  );
};

export default ReportTabScreen;

const rootStyles = (theme: AppTheme) =>
  createThemedStyles({
    root: {
      flex: 1,
      backgroundColor: theme.colors.transparent,
    },
  });
