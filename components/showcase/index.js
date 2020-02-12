import React, { Component } from "react";
import { InView } from "react-intersection-observer";
import Browser from "./browser";
import Indicators from "./indicators";
import classes from "./showcase.module.css";

class Showcase extends Component {
  constructor(props) {
    super(props);

    let slides = [
      props.backgrounds[props.backgrounds.length - 1],
      ...props.backgrounds,
      props.backgrounds[0]
    ];

    this.state = {
      running: false,
      timeout: undefined,
      currentSlide: 1,
      slides
    };
  }

  componentDidMount() {
    let c = this.refs.carousel;
    c.addEventListener("click", this.handleSlideClick);
  }

  componentWillUnmount() {
    this.refs.carousel.removeEventListener("click", this.handleSlideClick);
    this.stop();
  }

  start = async () => {
    let current = this.state.currentSlide;
    let { duration } = this.state.slides[current];
    let timeout = setTimeout(this.loop, duration);
    this.setState({ timeout, running: true });
  };

  loop = () => {
    let current = this.state.currentSlide;
    let { duration } = this.state.slides[current];
    this.nextSlide();
    let timeout = setTimeout(this.loop, duration);
    this.setState({ timeout });
  };

  stop = () => {
    clearTimeout(this.state.timeout);
    this.setState({ running: false });
  };

  changeSlide = slide => {
    let c = this.refs.carousel;

    function noAnimate(pos) {
      // TODO: if mid-animation, get its current pos and use that instead;
      c.style.transition = "none";
      c.style.transform = `translate3d(-${pos}px, 0px, 0px)`;
      // flush pending css
      c.offsetHeight;
      // restore transition
      c.style.transition = "all 700ms";
    }

    // backwards
    if (slide < 1) {
      let pos = (this.state.slides.length - 1) * c.offsetWidth;
      noAnimate(pos);
      slide = this.state.slides.length - 2;
    }

    // forwards
    if (slide >= this.state.slides.length - 1) {
      noAnimate(0);
      slide = 1;
    }

    let pos = slide * c.offsetWidth;
    c.style.transform = `translate3d(-${pos}px, 0px, 0px)`;

    this.setState({ currentSlide: slide });
  };

  nextSlide = () => this.changeSlide(this.state.currentSlide + 1);
  prevSlide = () => this.changeSlide(this.state.currentSlide - 1);

  handleSlideClick = event => {
    let width = this.refs.carousel.offsetWidth;
    event.layerX > width / 2 ? this.nextSlide() : this.prevSlide();

    this.stop();
    this.start();
  };

  handleScroll = inView => (inView ? this.start() : this.stop());

  render() {
    const { currentSlide, slides, running } = this.state;

    return (
      <InView
        as="section"
        className={classes.Showcase}
        onChange={this.handleScroll}
        threshold={0.9}
      >
        <Indicators
          running={running}
          passed={currentSlide - 1}
          slides={slides}
        />
        <div className={classes.Carousel} ref="carousel">
          {this.state.slides.map(({ background, src }, index) => (
            <div className={classes.Slide} key={index} style={{ background }}>
              <Browser>
                <img className={classes.Image} src={src} alt="" />
              </Browser>
            </div>
          ))}
        </div>
      </InView>
    );
  }
}

export default Showcase;
