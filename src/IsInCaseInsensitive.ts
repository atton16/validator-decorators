import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator';

export function IsInCaseInsensitive(values: string[], validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    if (!validationOptions) {
      validationOptions = {
        message: `${propertyName} must be one of the following values (case insensitive): ${values.join(',')}`,
      }
    }
    registerDecorator({
      name: 'IsInCaseInsensitive',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [values],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [values] = args.constraints;
          if (typeof value !== 'string') {
            return false;
          }
          return values.find(v => v.toLowerCase() === value.toLowerCase()) ? true : false;
        }
      }
    });
  };
}
