export interface SpacingToken {
  name: string;
  value: string;
  description?: string;
}

export interface SpacingScale {
  [key: string]: SpacingToken;
}

export const spacingTokens: SpacingScale = {
  '0': { name: '0', value: '0px', description: '0px' },
  'px': { name: 'px', value: '1px', description: '1px' },
  '0.5': { name: '0.5', value: '0.125rem', description: '2px' },
  '1': { name: '1', value: '0.25rem', description: '4px' },
  '1.5': { name: '1.5', value: '0.375rem', description: '6px' },
  '2': { name: '2', value: '0.5rem', description: '8px' },
  '2.5': { name: '2.5', value: '0.625rem', description: '10px' },
  '3': { name: '3', value: '0.75rem', description: '12px' },
  '3.5': { name: '3.5', value: '0.875rem', description: '14px' },
  '4': { name: '4', value: '1rem', description: '16px (Base size)' },
  '5': { name: '5', value: '1.25rem', description: '20px' },
  '6': { name: '6', value: '1.5rem', description: '24px (Base size)' },
  '7': { name: '7', value: '1.75rem', description: '28px' },
  '8': { name: '8', value: '2rem', description: '32px' },
  '9': { name: '9', value: '2.25rem', description: '36px' },
  '10': { name: '10', value: '2.5rem', description: '40px' },
  '11': { name: '11', value: '2.75rem', description: '44px' },
  '12': { name: '12', value: '3rem', description: '48px' },
  '14': { name: '14', value: '3.5rem', description: '56px' },
  '16': { name: '16', value: '4rem', description: '64px' },
  '20': { name: '20', value: '5rem', description: '80px' },
  '24': { name: '24', value: '6rem', description: '96px' },
  '28': { name: '28', value: '7rem', description: '112px' },
  '32': { name: '32', value: '8rem', description: '128px' },
  '36': { name: '36', value: '9rem', description: '144px' },
  '40': { name: '40', value: '10rem', description: '160px' },
  '44': { name: '44', value: '11rem', description: '176px' },
  '48': { name: '48', value: '12rem', description: '192px' },
  '52': { name: '52', value: '13rem', description: '208px' },
  '56': { name: '56', value: '14rem', description: '224px' },
  '60': { name: '60', value: '15rem', description: '240px' },
  '64': { name: '64', value: '16rem', description: '256px' },
  '72': { name: '72', value: '18rem', description: '288px' },
  '80': { name: '80', value: '20rem', description: '320px' },
  '96': { name: '96', value: '24rem', description: '384px' },
};