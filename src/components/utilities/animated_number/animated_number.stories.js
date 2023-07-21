import { setStoryTimeout } from '../../../utils/test_utils';
import readme from './animated_number.md';
import GlAnimatedNumber from './animated_number.vue';

const template = `
  <div>
    <gl-animated-number :number="updatedNumber" :decimalPlaces="decimalPlaces" :use-delimiters="useDelimiters" :duration="duration" :animateOnMount="animateOnMount"/>
    <button @click="updateNumber">Update number</button>
  </div>
`;

const defaultValue = (prop) => GlAnimatedNumber.props[prop].default;

const generateProps = ({
  initialNumber = 100,
  decimalPlaces = defaultValue('decimalPlaces'),
  useDelimiters = false,
  duration = 1000,
  animateOnMount = defaultValue('animateOnMount'),
} = {}) => ({
  initialNumber,
  decimalPlaces,
  useDelimiters,
  duration,
  animateOnMount,
});

const Template = (args, { argTypes }) => ({
  components: { GlAnimatedNumber },
  props: Object.keys(argTypes),
  template,
  data() {
    return {
      isLoading: false,
      loadTimer: null,
      updatedNumber: this.initialNumber,
    };
  },
  methods: {
    loadView() {
      clearTimeout(this.loadTimer);
      this.isLoading = true;
      this.loadTimer = setStoryTimeout(() => {
        this.isLoading = false;
      }, 1500);
    },
    updateNumber() {
      this.updatedNumber = Math.floor(Math.random() * 100);
    },
  },
  mounted() {
    this.loadView();
  },
});

export const InitialAnimate = Template.bind({});
InitialAnimate.args = generateProps({
  animateOnMount: true,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'utilities/animated-number',
  component: GlAnimatedNumber,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};
