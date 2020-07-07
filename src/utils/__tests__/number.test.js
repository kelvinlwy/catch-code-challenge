import { formatCentsToDollars } from "../number";

describe('test number utils function', () => {
  test('should convert cents value correctly and place cents value of dollar-cent amount in correct decimal places', () => {
    const mockCents = '1234';
    expect(formatCentsToDollars(mockCents)).toEqual('$12.34');
  });

  test('should convert cents value correctly and have tailing zero cent appended to the dollar amount', () => {
    const mockCents = '1200';
    expect(formatCentsToDollars(mockCents)).toEqual('$12.00');
  });

  test('should throw error if the input is not a number', () => {
    try {
      formatCentsToDollars({})
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError)
    }
  });
});
