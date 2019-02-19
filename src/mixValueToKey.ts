// tslint:disable-next-line import-name
import chance from './initChance';
import { CommonObject } from './CommonObject';

// one-to-one, one-to-many
export default function mixValueToKey(
  arrayOfObjects: CommonObject[],
  key: string,
  valuesArray: any[],
  toMany: boolean = false,
  maxPropagation: number = 100,
  minPropagation: number = 0
): CommonObject[] {
  if (arrayOfObjects.some((item: any) => typeof item !== 'object')) {
    throw new Error('For first parameter you can only specify array of objects');
  }
  if (typeof key !== 'string') {
    throw new Error('For second parameter you can only provide String');
  }
  if (!Array.isArray(valuesArray)) {
    throw new Error('For third parameter you can only provide Array');
  }
  if (maxPropagation > 100 || maxPropagation < minPropagation) {
    throw new Error('maxPropagation must be less then 100 and not then minPropagation');
  }
  if (minPropagation < 0) {
    throw new Error('minPropagation must be greater then zero');
  }

  // todo const max: number = Math.ceil((valuesArray.length * 100) / maxPropagation);
  // todo const min: number = Math.floor((valuesArray.length * 100) / minPropagation);
  return arrayOfObjects.map(item => ({
    ...item,
    [key]: toMany ? chance.pickset(valuesArray) : chance.pickone(valuesArray)
  }));
}
