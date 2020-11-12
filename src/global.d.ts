import { BannerSliderData } from 'containers/BannerSlider/BannerSlider';

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare global {
  // eslint-disable-next-line
  var __wilBannerSlider__: Record<string, BannerSliderData>;
}
