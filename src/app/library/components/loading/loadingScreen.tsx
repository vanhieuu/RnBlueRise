import React from 'react';
import {Animated, Image, Keyboard, StyleSheet, View} from 'react-native';
import Dot from './components/Dot';

type Props = Record<string, never>;

type State = {
  show: boolean;
  message: string;
};

class LoadingScreen extends React.Component<Props, State> {
  showMessageTimeout: NodeJS.Timeout | null = null;

  hideLoadingTimeout: NodeJS.Timeout | null = null;

  textOpacity = new Animated.Value(0);

  static modal: LoadingScreen;

  showing = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
      message: '',
    };
    LoadingScreen.modal = this;
  }

  static show() {
    LoadingScreen.modal.show();
  }

  static hide() {
    LoadingScreen.modal.hide();
  }

  static setMessage(message: string) {
    LoadingScreen.modal.setMessage(message);
  }

  clearMessageTimeout() {
    if (this.showMessageTimeout) {
      clearTimeout(this.showMessageTimeout);
      this.showMessageTimeout = null;
    }
  }

  clearLoadingTimeout() {
    if (this.hideLoadingTimeout) {
      clearTimeout(this.hideLoadingTimeout);
      this.hideLoadingTimeout = null;
    }
  }

  show() {
    this.clearLoadingTimeout();
    if (!this.showing) {
      Keyboard.dismiss();
      this.showing = true;
      this.setState({show: true});
      if (!this.state.message) {
        this.showMessageTimeout = setTimeout(() => {
          this.setMessage('Xin vui lòng chờ trong giây lát');
        }, 5 * 1000);
      }
    }
  }

  hide() {
    if (this.showing) {
      this.hideLoadingTimeout = setTimeout(() => {
        this.showing = false;
        this.setState({show: false, message: ''});
        this.clearMessageTimeout();
        this.clearLoadingTimeout();
      }, 500);
    }
  }

  setMessage(message: string) {
    Animated.timing(this.textOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      this.setState({message}, () => {
        Animated.timing(this.textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    });
    this.clearMessageTimeout();
  }

  render() {
    // const {show} = this.state;
    return (
      <>
        {
          <View {...StyleSheet.absoluteFillObject} style={styles.root as any}>
            {/* <Image
              source={{
                // uri: Images.vnpt_logo_white,
              }}
              style={styles.image}
              resizeMode="contain"
            /> */}
            <View style={styles.sub as any}>
              <Dot active={1} />
            </View>
          </View>
        }
      </>
    );
  }
}

export default LoadingScreen;
const styles = StyleSheet.create({
  root: {
    // backgroundColor: 'rgba(0,0,0,0.22)',
    backgroundColor: '#3079FF',
    // justifyContent: 'center',q
    alignItems: 'center',
  },
  sub: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    width: 300,
    height: 150,
    marginTop: 40,
  },
});
