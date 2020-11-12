import { Component, h } from 'preact';
import Countdown, { CountdownProps } from 'components/Countdown/Countdown';
import styles from './Promo.scss';

export interface PromoProps {
  bgUrl: string;
  image: string;
  text: string;
  discount: string;
  discountLabel: string;
  countDownEndDate: CountdownProps['endDate'];
  buttonText: string;
  containerWidth?: number;
}

class Promo extends Component<PromoProps, {}> {
  static defaultProps: Pick<PromoProps, 'containerWidth'> = {
    containerWidth: 1200,
  };
  render() {
    const { bgUrl, buttonText, countDownEndDate, discount, discountLabel, image, text, containerWidth } = this.props;
    return (
      <div className={[styles.container, bgUrl ? styles.withBg : ''].join(' ')} style={{ backgroundImage: `url('${bgUrl}')` }}>
        <div className={styles.inner} style={{ maxWidth: containerWidth }}>
          <div className={styles.left}>
            <div className={styles.imgContainer}>
              <img src={image} alt="" />
            </div>
            <p className={styles.desc}>{text}</p>
          </div>
          <div className={styles.center}>
            <div className={styles.discount}>
              <p className={styles.discountLabel}>{discountLabel}</p>
              <p className={styles.discountPercent}>{discount}</p>
            </div>
          </div>
          <div className={styles.right}>
            <Countdown endDate={countDownEndDate} />
            <button className={styles.btn}>{buttonText}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Promo;
