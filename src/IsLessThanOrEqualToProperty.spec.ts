import { validate } from 'class-validator';
import { IsLessThanOrEqualToProperty } from './IsLessThanOrEqualToProperty';

describe('IsLessThanOrEqualToProperty', () => {
  class TestObjectWithoutOpts {
    @IsLessThanOrEqualToProperty('fieldB')
    fieldA: any;
    fieldB: any;
  }
  class TestObjectWithEmptyOpts {
    @IsLessThanOrEqualToProperty('fieldB', {})
    fieldA: any;
    fieldB: any;
  }
  class TestObjectWithTransformA {
    @IsLessThanOrEqualToProperty('fieldB', {transformA: (v) => v + 1})
    fieldA: any;
    fieldB: any;
  }
  class TestObjectWithTransformB {
    @IsLessThanOrEqualToProperty('fieldB', {transformB: (v: number) => v - 1})
    fieldA: any;
    fieldB: any;
  }
  class TestObjectWithTransformAB {
    @IsLessThanOrEqualToProperty('fieldB', {transformA: (v) => v + 1, transformB: (v: number) => v - 1})
    fieldA: any;
    fieldB: any;
  }

  it('should validate without options provided', done => {
    const tests = [
      {a: 1, b: 1, expect: true },  // 1 <= 1
      {a: 1, b: 2, expect: true },  // 1 <= 2
      {a: 1, b: 0, expect: false }, // 1 <= 0
    ];
    const promises = tests.map(({a, b}) => {
      const object = new TestObjectWithoutOpts();
      object.fieldA = a;
      object.fieldB = b;
      return validate(object);
    });
    Promise.all(promises).then(errorsOfErrors => {
      return errorsOfErrors.reduce((acc, errors) => {
        return acc + errors.length;
      }, 0);
    }).then(errorsN => {
      const expectErrors = tests.map(({expect}) => expect).reduce((acc, expectVal) => expectVal === false ? acc + 1 : acc, 0);
      expect(errorsN === expectErrors).toBeTruthy();
      done();
    });
  });

  it('should validate empty options provided', done => {
    const tests = [
      {a: 1, b: 1, expect: true },  // 1 <= 1
      {a: 1, b: 2, expect: true },  // 1 <= 2
      {a: 1, b: 0, expect: false }, // 1 <= 0
    ];
    const promises = tests.map(({a, b}) => {
      const object = new TestObjectWithEmptyOpts();
      object.fieldA = a;
      object.fieldB = b;
      return validate(object);
    });
    Promise.all(promises).then(errorsOfErrors => {
      return errorsOfErrors.reduce((acc, errors) => {
        return acc + errors.length;
      }, 0);
    }).then(errorsN => {
      const expectErrors = tests.map(({expect}) => expect).reduce((acc, expectVal) => expectVal === false ? acc + 1 : acc, 0);
      expect(errorsN === expectErrors).toBeTruthy();
      done();
    });
  });

  it('should validate with tranformA provided', done => {
    const tests = [
      {a:  1, b: 2, expect: true },  //  1 + 1 <= 2
      {a:  1, b: 1, expect: false }, //  1 + 1 <= 1
      {a:  0, b: 1, expect: true },  //  0 + 1 <= 1
      {a: -1, b: 1, expect: true },  // -1 + 1 <= 1
    ];
    const promises = tests.map(({a, b}) => {
      const object = new TestObjectWithTransformA();
      object.fieldA = a;
      object.fieldB = b;
      return validate(object);
    });
    Promise.all(promises).then(errorsOfErrors => {
      return errorsOfErrors.reduce((acc, errors) => {
        return acc + errors.length;
      }, 0);
    }).then(errorsN => {
      const expectErrors = tests.map(({expect}) => expect).reduce((acc, expectVal) => expectVal === false ? acc + 1 : acc, 0);
      expect(errorsN === expectErrors).toBeTruthy();
      done();
    });
  });

  it('should validate with tranformB provided', done => {
    const tests = [
      {a: 1, b: 3, expect: true },  // 1 <= 3 - 1
      {a: 1, b: 2, expect: true },  // 1 <= 2 - 1
      {a: 1, b: 1, expect: false }, // 1 <= 1 - 1
    ];
    const promises = tests.map(({a, b}) => {
      const object = new TestObjectWithTransformB();
      object.fieldA = a;
      object.fieldB = b;
      return validate(object);
    });
    Promise.all(promises).then(errorsOfErrors => {
      return errorsOfErrors.reduce((acc, errors) => {
        return acc + errors.length;
      }, 0);
    }).then(errorsN => {
      const expectErrors = tests.map(({expect}) => expect).reduce((acc, expectVal) => expectVal === false ? acc + 1 : acc, 0);
      expect(errorsN === expectErrors).toBeTruthy();
      done();
    });
  });

  it('should validate with transformA and tranformB provided', done => {
    const tests = [
      {a:  1, b: 1, expect: false }, //  1 + 1 <= 1 - 1
      {a:  0, b: 1, expect: false }, //  0 + 1 <= 1 - 1
      {a: -1, b: 1, expect: true },  // -1 + 1 <= 1 - 1
      {a: -2, b: 1, expect: true },  // -2 + 1 <= 1 - 1
    ];
    const promises = tests.map(({a, b}) => {
      const object = new TestObjectWithTransformAB();
      object.fieldA = a;
      object.fieldB = b;
      return validate(object);
    });
    Promise.all(promises).then(errorsOfErrors => {
      return errorsOfErrors.reduce((acc, errors) => {
        return acc + errors.length;
      }, 0);
    }).then(errorsN => {
      const expectErrors = tests.map(({expect}) => expect).reduce((acc, expectVal) => expectVal === false ? acc + 1 : acc, 0);
      expect(errorsN === expectErrors).toBeTruthy();
      done();
    });
  });

});
