import { Component, h } from 'preact';
import styles from './Countdown.scss';

export interface CountdownProps {
  endDate: number;
}

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export class Countdown extends Component<CountdownProps, CountdownState> {
  private intervalId: number;
  constructor(props: CountdownProps) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.intervalId = 0;
  }

  public componentDidMount() {
    const { endDate } = this.props;
    this.setCountDown(endDate);
    this.calculateCountdown(endDate);
  }

  public componentDidUpdate(prevProps: CountdownProps) {
    const { endDate } = this.props;
    if (prevProps.endDate !== endDate) {
      this.calculateCountdown(endDate);
      this.clearInterval();
      this.setCountDown(endDate);
    }
  }

  public componentWillUnmount() {
    this.clearInterval();
  }

  private setCountDown = (endDate: CountdownProps['endDate']) => {
    this.intervalId = window.setInterval(() => {
      this.calculateCountdown(endDate);
    }, 1000);
  };

  private clearInterval = () => {
    clearInterval(this.intervalId);
  };

  private calculateCountdown = (endDate: number) => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const currentDate = new Date().getTime();
    const gap = endDate - currentDate;
    if (gap <= 0) return false;
    this.setState({
      days: Math.floor(gap / day),
      hours: Math.floor((gap % day) / hour),
      minutes: Math.floor((gap % hour) / minute),
      seconds: Math.floor((gap % minute) / second),
    });
  };

  render() {
    const { days, minutes, hours, seconds } = this.state;
    return (
      <div className={styles.container}>
        <div className={[styles.item, styles.day].join(' ')}>
          {days}
          <span>Days</span>
        </div>
        <div className={[styles.item, styles.hour].join(' ')}>
          {hours}
          <span>Hours</span>
        </div>
        <div className={[styles.item, styles.minute].join(' ')}>
          {minutes}
          <span>Minutes</span>
        </div>
        <div className={[styles.item, styles.second].join(' ')}>
          {seconds}
          <span>Seconds</span>
        </div>
      </div>
    );
  }
}

export default Countdown;
