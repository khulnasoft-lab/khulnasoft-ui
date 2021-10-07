import { newButtonSizeOptionsMap } from '../../utils/constants';

export const ButtonMixin = {
  computed: {
    buttonSize() {
      return newButtonSizeOptionsMap[this.size];
    },
  },
};
