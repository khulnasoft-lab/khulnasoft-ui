import description from './button.md';

export default {
  description,
  followsDesignSystem: true,
  bootstrapComponent: 'b-button',
  bootstrapPropsInfo: {
    category: {
      enum: 'buttonCategoryOptions',
    },
    variant: {
      enum: 'buttonVariantOptions',
    },
    size: {
      enum: 'buttonSizeOptions',
    },
  },
  events: [
    {
      event: 'click',
      description: 'Emitted when clicked on button',
    },
  ],
};
