import { ValidationArguments } from 'class-validator';
import { ComparePropertyOptions } from '../type/ComparePropertyOptions';
import { ComparePropertyCompareFn } from '../type/ComparePropertyCompareFn';

export function ComparePropertyValidateFnFactory(compareFn: ComparePropertyCompareFn) {
  return function validate(value: any, args: ValidationArguments): boolean {
    const [relatedPropertyName, opts] = args.constraints as [string, ComparePropertyOptions];
    let relatedValue = (args.object as any)[relatedPropertyName];
    if (opts && typeof opts.transformA === 'function') {
      value = opts.transformA(value);
    }
    if (opts && typeof opts.transformB === 'function') {
      relatedValue = opts.transformB(relatedValue);
    }
    return compareFn(value, relatedValue);
  }
}
