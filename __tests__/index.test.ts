import { myTsPkg } from '../src/index';

describe('myTsPkg', () => {
  it('converts decimal to binary', () => {
    expect(myTsPkg('42', 10, 2)).toBe('101010');
  });

  it('converts binary to decimal', () => {
    expect(myTsPkg('101010', 2, 10)).toBe('42');
  });
});
