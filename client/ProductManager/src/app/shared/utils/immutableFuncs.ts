import { Product } from "../models";

interface HasId<TId> { id: TId }

/** WARNING: Immutable function */
export function addToArray<TItem>(array: TItem[], item: TItem) {
  return [...array, item];
};

/** WARNING: Immutable function */
export function findByIdAndRemoveFromArray<TId>(array: HasId<TId>[], idToDelete: TId) {
  return array.filter(({ id }) => id !== idToDelete);
}