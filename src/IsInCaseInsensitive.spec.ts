import { validate } from 'class-validator';
import { IsInCaseInsensitive } from './IsInCaseInsensitive';

describe('IsInCaseInsensitive', () => {
  class TestObject {
    @IsInCaseInsensitive(['foO', 'bAr', 'Hello World'])
    field: any;
  }

  it('should validate string', done => {
    const tests = [
      ['Foo', true],
      ['FOO', true],
      ['BAR', true],
      ['bar', true],
      ['hello world', true],
      ['HELLO WORLD', true],
      ['Foo', true],
      ['fo0', false],
      ['b@r', false],
      ['hello-world', false],
      ['HELLO_WORLD', false],
      [' ', false],
      [123, false],
    ];
    const values = tests.map(t => t[0] as string|number);
    const promises = values.map(v => {
      const object = new TestObject();
      object.field = v;
      return validate(object);
    });
    Promise.all(promises).then(errorsOfErrors => {
      return errorsOfErrors.reduce((acc, errors) => {
        return acc + errors.length;
      }, 0);
    }).then(errorsN => {
      const expectErrors = tests.map(t => t[1] as boolean).reduce((acc, expectVal) => expectVal === false ? acc + 1 : acc, 0);
      expect(errorsN === expectErrors).toBeTruthy();
      done();
    });
  });
});
