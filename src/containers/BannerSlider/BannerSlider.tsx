import { Component, h } from 'preact';
import Slider from 'components/Slider/Slider';
import Promo, { PromoProps } from 'components/Promo/Promo';
import styles from './BannerSlider.scss';

export type BannerSliderData = (PromoProps & { href: string })[];

export interface BannerSliderProps {
  data: BannerSliderData;
}

export class BannerSlider extends Component<BannerSliderProps> {
  render() {
    const { data } = this.props;
    return (
      <Slider
        data={data}
        renderItem={item => {
          return (
            <a className={styles.link} href={item.href}>
              <Promo {...item} />
            </a>
          );
        }}
        animation="fade"
        duration={1000}
        loop
      />
    );
  }
}

export default BannerSlider;
