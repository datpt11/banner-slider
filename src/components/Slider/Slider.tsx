import { Component, ComponentChildren, h } from 'preact';
import delay from 'utils/delay';
import styles from './Slider.scss';

export interface SliderProps<ItemT extends any> {
  data: ItemT[];
  animation?: 'fade' | 'none';
  renderItem: (item: ItemT) => ComponentChildren;
  duration?: number;
  loop?: boolean;
}

interface SliderState {
  activeIndex: number;
  prevActiveIndex: number;
  fade: boolean;
}

export class Slider<ItemT extends any> extends Component<SliderProps<ItemT>, SliderState> {
  static defaultProps: Pick<SliderProps<any>, 'animation' | 'duration' | 'loop'> = {
    animation: 'none',
    duration: 300,
    loop: false,
  };

  constructor(props: SliderProps<ItemT>) {
    super(props);

    this.state = {
      activeIndex: 0,
      prevActiveIndex: 0,
      fade: false,
    };
  }

  private handlePrevSlide = () => {
    const { animation, data, loop } = this.props;
    const { fade, activeIndex } = this.state;
    if (!fade) {
      this.setState(
        prevState => ({
          activeIndex: Math.max(prevState.activeIndex - 1, 0),
          prevActiveIndex: prevState.activeIndex,
          fade: animation === 'fade',
        }),
        this.resetFade,
      );
      if (loop && activeIndex === 0) {
        this.setState({
          activeIndex: data.length - 1,
        });
      }
    }
  };

  private handleNextSlide = () => {
    const { data, animation, loop } = this.props;
    const { fade, activeIndex } = this.state;
    if (!fade) {
      this.setState(
        prevState => ({
          activeIndex: Math.min(prevState.activeIndex + 1, data.length - 1),
          prevActiveIndex: prevState.activeIndex,
          fade: animation === 'fade',
        }),
        this.resetFade,
      );
      if (loop && activeIndex === data.length - 1) {
        this.setState({
          activeIndex: 0,
        });
      }
    }
  };
  private resetFade = async () => {
    const { animation, duration } = this.props;
    if (animation === 'fade') {
      await delay(duration);
      this.setState({
        fade: false,
      });
    }
  };
  render() {
    const { renderItem, data, duration } = this.props;
    const { activeIndex, prevActiveIndex, fade } = this.state;
    const fadeClass = fade ? styles.fade : '';
    console.log('current item', data[activeIndex]);
    console.log('prev Item', data[prevActiveIndex]);
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={fadeClass} style={{ animationDuration: `${duration}ms`, width: '100%' }}>
            {renderItem(data[activeIndex])}
          </div>
          <div className={styles.prevSlide} style={{ width: '100%' }}>
            {renderItem(data[prevActiveIndex])}
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button className={[styles.buttonnDefault, styles.prevBtn].join(' ')} onClick={this.handlePrevSlide}></button>
          <button className={[styles.buttonnDefault, styles.nextBtn].join(' ')} onClick={this.handleNextSlide}></button>
        </div>
      </div>
    );
  }
}

export default Slider;
