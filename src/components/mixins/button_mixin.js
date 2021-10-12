import { buttonSizeOptionsMap } from '../../utils/constants';

export const ButtonMixin = {
  computed: {
    buttonSize() {
      return buttonSizeOptionsMap[this.size];
    },
  },
};
