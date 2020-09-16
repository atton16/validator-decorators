import { ComparePropertyTransformFn } from './ComparePropertyTransformFn';

export type ComparePropertyOptions = {
  transformA?: ComparePropertyTransformFn;
  transformB?: ComparePropertyTransformFn;
};
