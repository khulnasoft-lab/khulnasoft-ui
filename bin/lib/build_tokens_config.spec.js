import { stripDescriptionsPreprocessor } from './build_tokens_config';

describe('buildTokens', () => {
  describe('stripDescriptionsPreprocessor', () => {
    const token1 = {
      $value: '#cbbbf23d',
      $type: 'color',
      $description: 'Purple background.',
    };
    const token2 = {
      $value: { default: '{color.red.600}', dark: '{color.red.300}' },
      $type: 'color',
      $description: 'Indicates a problem.',
    };

    it('strips description from token', () => {
      expect(stripDescriptionsPreprocessor(token1)).toEqual({
        $value: '#cbbbf23d',
        $type: 'color',
      });
    });

    it('strips description from array of tokens', () => {
      expect(stripDescriptionsPreprocessor([token1, token2])).toEqual([
        {
          $value: '#cbbbf23d',
          $type: 'color',
        },
        {
          $value: { default: '{color.red.600}', dark: '{color.red.300}' },
          $type: 'color',
        },
      ]);
    });

    it('preserves arrays of primitives', () => {
      expect(
        stripDescriptionsPreprocessor({
          path: ['color', 'alpha', '0'],
          numbers: [0, 1, 2],
        })
      ).toEqual({
        path: ['color', 'alpha', '0'],
        numbers: [0, 1, 2],
      });
    });

    it('strips description from deeply nested tokens', () => {
      expect(
        stripDescriptionsPreprocessor({
          component: { theme: { token1, token2 } },
        })
      ).toEqual({
        component: {
          theme: {
            token1: { $type: 'color', $value: '#cbbbf23d' },
            token2: {
              $type: 'color',
              $value: { dark: '{color.red.300}', default: '{color.red.600}' },
            },
          },
        },
      });
    });
  });
});
