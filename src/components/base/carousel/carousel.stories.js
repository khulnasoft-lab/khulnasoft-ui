import readme from './carousel.md';
import GlCarousel from './carousel.vue';
import GlCarouselSlide from './carousel_slide.vue';

const template = `
    <gl-carousel
      :interval="0"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <!-- Text slides with image -->
      <gl-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="./img/carousel_slide1.jpg"
      />

      <!-- Slides with custom text -->
      <gl-carousel-slide img-src="./img/carousel_slide2.jpg">
        <h1>Hello world!</h1>
      </gl-carousel-slide>

      <!-- Slides with image only -->
      <gl-carousel-slide img-src="./img/carousel_slide3.jpg"/>
    </gl-carousel> 
  `;

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GlCarousel, GlCarouselSlide },
  template,
});

export const Default = Template.bind({});

export default {
  title: 'base/carousel',
  component: GlCarousel,
  parameters: {
    bootstrapComponent: 'b-carousel',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
