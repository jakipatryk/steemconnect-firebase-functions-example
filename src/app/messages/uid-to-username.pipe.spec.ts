import { UidToUsernamePipe } from './uid-to-username.pipe';

describe('UidToUsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new UidToUsernamePipe();
    expect(pipe).toBeTruthy();
  });
});
