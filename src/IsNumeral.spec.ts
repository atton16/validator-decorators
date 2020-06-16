import { validate } from 'class-validator';
import { IsNumeral } from './IsNumeral';

describe('IsNumeral', () => {
  class TestObject {
    @IsNumeral()
    field: string;
  }

  it('should validate numbers', done => {
    const tests = [
      ['100.00', true],
      ['100', true],
      ['1', true],
      [' 123.456789', true],
      ['1,234,567', true],
      ['1,2,3,345.065', true],
      ['-1', false],
      ['1,,0', false],
      ['1..0', false],
    ];
    const values = tests.map(t => t[0] as string);
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
