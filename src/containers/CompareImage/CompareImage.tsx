import { Component, ComponentChildren, h } from 'preact';
import styles from './CompareImage.scss';

export interface CompareImageProps {
  beforeImageUri: string;
  afterImageUri: string;
  lineWidth?: number;
  lineColor?: string;
  beforeText: string;
  afterText: string;
  renderButton: () => ComponentChildren;
}

export interface CompareImageState {
  position: number;
  isStartDraggable: boolean;
}

export default class CompareImage extends Component<CompareImageProps, CompareImageState> {
  private containerRef!: HTMLElement | null;
  static defaultProps = {
    lineWidth: 2,
    lineColor: '#fff',
    renderBeforeText: () => null,
    renderAfterText: () => null,
    renderButton: () => <div className={styles.buttonDefault} />,
  };

  state: CompareImageState = {
    position: 50,
    isStartDraggable: false,
  };

  componentDidMount() {
    window.addEventListener('mousedown', this.handleStartDraggable);
    window.addEventListener('touchstart', this.handleStartDraggable);
    window.addEventListener('mousemove', this._handleDraggable);
    window.addEventListener('touchmove', this._handleDraggable);
    window.addEventListener('mouseup', this._handleDraggableEnd);
    window.addEventListener('touchend', this._handleDraggableEnd);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleStartDraggable);
    window.removeEventListener('touchstart', this.handleStartDraggable);
    window.removeEventListener('mousemove', this._handleDraggable);
    window.removeEventListener('touchmove', this._handleDraggable);
    window.removeEventListener('mouseup', this._handleDraggableEnd);
    window.removeEventListener('touchend', this._handleDraggableEnd);
  }

  private handleStartDraggable = (event: MouseEvent | TouchEvent) => {
    const { pageX, target } = (event as TouchEvent).touches ? (event as TouchEvent).touches[0] : (event as MouseEvent);
    if (this.containerRef?.contains(target as Node)) {
      const position = this._getValueDragging(pageX);
      this.setState({ position, isStartDraggable: true });
    }
  };

  _handleDraggableEnd = () => {
    this.setState({
      isStartDraggable: false,
    });
  };

  _getValueDragging = (pageX: number) => {
    const { containerWidth, containerOffsetLeft } = this._getContainerMeasure();
    if (pageX <= containerOffsetLeft) {
      return 0;
    }
    if (pageX >= containerWidth + containerOffsetLeft) {
      return 100;
    }
    return ((pageX - containerOffsetLeft) / containerWidth) * 100;
  };

  _handleDraggable = (event: MouseEvent | TouchEvent) => {
    const { isStartDraggable } = this.state;
    const { pageX, target } = (event as TouchEvent).touches ? (event as TouchEvent).touches[0] : (event as MouseEvent);
    if (isStartDraggable && this.containerRef?.contains(target as Node)) {
      const position = this._getValueDragging(pageX);
      this.setState({ position });
    }
  };

  _getContainerMeasure = () => {
    if (!this.containerRef) {
      return {
        containerWidth: 0,
        containerOffsetLeft: 0,
      };
    }
    const { width, left } = this.containerRef.getBoundingClientRect();
    return {
      containerWidth: width,
      containerOffsetLeft: left + window.pageXOffset,
    };
  };

  _setContainerRef = (c: HTMLElement | null) => {
    this.containerRef = c;
  };

  _renderBeforeText = () => {
    const { beforeText } = this.props;
    return <div className={styles.beforeText}>{beforeText}</div>;
  };

  _renderAfterText = () => {
    const { afterText } = this.props;
    return <div className={styles.afterText}>{afterText}</div>;
  };

  _renderBeforeImage = () => {
    const { beforeImageUri } = this.props;
    const { position, isStartDraggable } = this.state;
    return (
      <div
        className={styles.beforeImage}
        style={{
          width: `${position}%`,
        }}
      >
        <div
          className={styles.beforeImageInner}
          style={{
            backgroundImage: `url(${beforeImageUri})`,
          }}
        />
        {!isStartDraggable && this._renderBeforeText()}
      </div>
    );
  };

  _renderAfterImage = () => {
    const { beforeImageUri, afterImageUri } = this.props;
    return <img className={styles.afterImage} src={afterImageUri || beforeImageUri} alt="" />;
  };

  _renderDragItem = () => {
    const { lineWidth, lineColor, renderButton } = this.props;
    const { position } = this.state;
    return (
      <div className={styles.dragItemWrap}>
        <div
          className={styles.dragItem}
          style={{
            left: `${position}%`,
          }}
        >
          <div
            className={styles.beforeLine}
            style={{
              width: lineWidth as number,
              backgroundColor: lineColor as string,
            }}
          />
          <div className={styles.button}>{renderButton()}</div>
          <div
            className={styles.afterLine}
            style={{
              width: lineWidth as number,
              backgroundColor: lineColor as string,
            }}
          />
        </div>
      </div>
    );
  };

  render() {
    const { isStartDraggable } = this.state;
    return (
      <div className={styles.container} ref={this._setContainerRef}>
        {this._renderBeforeImage()}
        {this._renderAfterImage()}
        {this._renderDragItem()}
        {!isStartDraggable && this._renderAfterText()}
      </div>
    );
  }
}
