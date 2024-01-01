import { ObjectType } from '@/entities';
import { ModelState } from '@/enums';

export function trackChanges(
  originalList: any[],
  updatedList: any[],
  keyExpr: string = 'ID',
  ignoreFields: string[] = []
) {
  // Create a copy of the original list
  const copiedOriginalList = originalList.slice();

  // Create a hash map of original items by ID
  const originalMap: ObjectType = {};
  for (const originalItem of copiedOriginalList) {
    originalMap[originalItem[keyExpr]] = originalItem;
  }

  // Initialize a set to track processed IDs
  const processedIDs = new Set();

  // Loop through the updated list to check for additions, edits, and deletions
  for (const updatedItem of updatedList) {
    const originalItem = originalMap[updatedItem[keyExpr]];

    if (!originalItem) {
      // Item exists in updated list but not in the original list (added)
      updatedItem.State = ModelState.Insert; // Added
      copiedOriginalList.push(updatedItem);
      processedIDs.add(updatedItem[keyExpr]);
    } else {
      // Item exists in both lists, check for edits
      let hasEdits = false;

      for (const key in updatedItem) {
        if (
          key !== keyExpr &&
          !ignoreFields.includes(key) &&
          originalItem[key] !== updatedItem[key]
        ) {
          hasEdits = true;
          break;
        }
      }

      if (hasEdits) {
        updatedItem.state = ModelState.Update; // Edited
        Object.assign(originalItem, updatedItem); // Update original item
      }

      processedIDs.add(updatedItem[keyExpr]);
    }
  }

  // Check for deletions by looping through the original list
  for (const originalItem of copiedOriginalList) {
    if (!processedIDs.has(originalItem[keyExpr])) {
      originalItem.state = ModelState.Delete; // Deleted
    }
  }

  return copiedOriginalList;
}
