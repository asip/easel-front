import type { Maybe, RegleRuleDefinition } from '@regle/core';
import { createRule } from '@regle/core';
import { isFilled } from '@regle/rules';

/**
 * Requires non-empty data.
 */
export const requiredForBlob = createRule({
  type: 'requiredForBlob',
  validator: (value: Maybe<Blob>) => {
    return isFilled(value);
  },
  message: 'This field is required',
});
