import { validate } from 'class-validator';
import { IsEqualToProperty } from './IsEqualToProperty';

describe('IsEqualToProperty', () => {
  class TestObjectWithoutOpts {
    @IsEqualToProperty('fieldB')
    fieldA: any;
    fieldB: any;
  }
  class TestObjectWithEmptyOpts {
    @IsEqualToProperty('fieldB', {})
    fieldA: any;
    fieldB: any;
  }
  class TestObjectWithTransformAString {
    @IsEqualToProperty('fieldB', {transformA: (v) => v.toUpperCase()})
    fieldA: any;
    fieldB: any;
  }
  class TestObjectWithTransformANumber {
    @IsEqualToProperty('fieldB', {transformA: (v) => v.toString()})
    fieldA: any;
    fieldB: any;
  }
  class TestObjectWithTransformBString {
    @IsEqualToProperty('fieldB', {transformB: (v) => v.toUpperCase()})
    fieldA: any;
    fieldB: any;
  }
  class TestObjectWithTransformBNumber {
    @IsEqualToProperty('fieldB', {transformB: (v) => v.toString()})
    fieldA: any;
    fieldB: any;
  }
  class TestObjectWithTransformABString {
    @IsEqualToProperty('fieldB', {transformA: (v) => v.toUpperCase(), transformB: (v) => v.toUpperCase()})
    fieldA: any;
    fieldB: any;
  }

  it('should validate without options provided', done => {
    const tests = [
      {a: 'Foo', b: 'Foo',     expect: true },
      {a: 'Foo', b: 'foo',     expect: false },
      {a: 'Foo', b: undefined, expect: false },
      {a: true,  b: 1,         expect: false },
      {a: 1,  b: 1,            expect: true },
      {a: 2,  b: 1,            expect: false },
      {a: true,  b: true,      expect: true },
      {a: true,  b: false,     expect: false },
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
      {a: 'Foo', b: 'Foo',     expect: true },
      {a: 'Foo', b: 'foo',     expect: false },
      {a: 'Foo', b: undefined, expect: false },
      {a: true,  b: 1,         expect: false },
      {a: 1,  b: 1,            expect: true },
      {a: 2,  b: 1,            expect: false },
      {a: true,  b: true,      expect: true },
      {a: true,  b: false,     expect: false },
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

  it('should validate with tranformA provided (string)', done => {
    const tests = [
      {a: 'Foo', b: 'Foo', expect: false },
      {a: 'Foo', b: 'FOO', expect: true },
    ];
    const promises = tests.map(({a, b}) => {
      const object = new TestObjectWithTransformAString();
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

  it('should validate with tranformA provided (number)', done => {
    const tests = [
      {a: 1, b: '1', expect: true },
      {a: 1, b: 1,   expect: false },
    ];
    const promises = tests.map(({a, b}) => {
      const object = new TestObjectWithTransformANumber();
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

  it('should validate with tranformB provided (string)', done => {
    const tests = [
      {a: 'Foo', b: 'Foo', expect: false },
      {a: 'FOO', b: 'Foo', expect: true },
    ];
    const promises = tests.map(({a, b}) => {
      const object = new TestObjectWithTransformBString();
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

  it('should validate with tranformB provided (number)', done => {
    const tests = [
      {a: '1', b: 1, expect: true },
      {a: 1, b: 1,   expect: false },
    ];
    const promises = tests.map(({a, b}) => {
      const object = new TestObjectWithTransformBNumber();
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
      {a: 'Foo', b: 'Foo', expect: true },
      {a: 'Foo', b: 'FOO', expect: true },
      {a: 'F0O', b: 'FOO', expect: false },
    ];
    const promises = tests.map(({a, b}) => {
      const object = new TestObjectWithTransformABString();
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
