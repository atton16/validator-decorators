import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';
import * as numeral from 'numeral';

export function IsNumeral(culture = 'en', validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      name: 'isNumeral',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [culture],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [culture] = args.constraints;;
          return numeral.validate(value, culture);
        }
      }
    });
  };
}
