import getId from './index';

describe('simple test', () => {
  it('should work', () => {
    const id = getId();
    expect(id).toBeDefined();
  });
});
