import React from "react";
import Swipe from "swipe-js";

import pageState from '../states/page.js';

require('../styles/image-gallery.less');

class ImageGallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mySwipe: null
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const ids = 'slider' + this.props.index;

    const mySwipe = Swipe(document.getElementById(ids), {
      startSlide: 0,
      speed: 400
    });

    this.setState({ mySwipe });

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    const key = parseInt(event.keyCode || event.which || 0)

    if (this.props.index == pageState.active.valueOf() && key == 37) {
      this.slideLeft();
    } else if (this.props.index == pageState.active.valueOf() && key == 39) {
      this.slideRight();
    }
  }

  slideLeft() {
    const { mySwipe } = this.state;
    mySwipe.prev();
    this.setState({ mySwipe });
  }

  slideRight() {
    const { mySwipe } = this.state;
    mySwipe.next();
    this.setState({ mySwipe });
  }

  render() {
    const { mySwipe } = this.state;
    const { items } = this.props;

    const total = items.length;
    const index = mySwipe ? mySwipe.getPos() + 1 : 1;

    const listItems = items.map((image, index) => {
      return (
        <div className="image" key={index} >
          <img src={image} />
        </div>
      );
    });

    const ids = 'slider' + this.props.index;

    return (
      <div className="image-gallery">
        <div id={ids} className='swipe'>
          <div className='swipe-wrap'>
            {listItems}
          </div>
        </div>
        <div className='index'>{index}/{total}</div>

        <a className='image-gallery-left-nav'
          onTouchStart={this.slideLeft.bind(this)}
          onClick={this.slideLeft.bind(this)} />

        <a className='image-gallery-right-nav'
          onTouchStart={this.slideRight.bind(this)}
          onClick={this.slideRight.bind(this)} />
      </div>
    );
  }
}

export default ImageGallery;
