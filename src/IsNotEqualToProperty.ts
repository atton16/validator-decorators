import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';
import { ComparePropertyValidateFnFactory } from './factory/ComparePropertyValidateFnFactory';
import { ComparePropertyOptions } from './type/ComparePropertyOptions';

const validate = ComparePropertyValidateFnFactory((a, b) => a !== b);

export function IsNotEqualToProperty(property: string, opts?: ComparePropertyOptions, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string): void => {
    registerDecorator({
      name: 'isNotEqualToProperty',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property, opts],
      options: validationOptions,
      validator: {
        validate,
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `$property must NOT equal to ${relatedPropertyName}!`;
        },
      },
    });
  };
}
