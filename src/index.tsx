import { h, render } from 'preact';
import 'styles/main.scss';
import BannerSlider from 'containers/BannerSlider/BannerSlider';

const options = window.__wilBannerSlider__;

function init() {
  const els: HTMLElement[] = Array.from(document.querySelectorAll('.wil-banner-slider'));
  els.forEach(el => {
    const optionId = el.getAttribute('data-option-id') as string;
    const option = options[optionId];
    render(<BannerSlider data={option} />, el);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  init();
});
