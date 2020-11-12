import { Component, h } from 'preact';
import Slider from 'components/Slider/Slider';
import Promo, { PromoProps } from 'components/Promo/Promo';
import styles from './BannerSlider.scss';

export type BannerSliderDataItem = PromoProps & { href: string };

export type BannerSliderData = BannerSliderDataItem[];

export interface BannerSliderProps {
  data: BannerSliderData;
  containerWidth?: PromoProps['containerWidth'];
}

export class BannerSlider extends Component<BannerSliderProps> {
  private renderSliderItem = (item: BannerSliderDataItem) => {
    const { containerWidth } = this.props;
    return (
      <a className={styles.link} href={item.href}>
        <Promo {...item} containerWidth={containerWidth} />
      </a>
    );
  };
  render() {
    const { data } = this.props;
    return <Slider data={data} renderItem={this.renderSliderItem} animation="fade" duration={300} loop />;
  }
}

export default BannerSlider;
