import { parsePath } from './parsePath'

/*
 * Get the current value of the array data based on the array path
 * @param {Array} arrayData - The parent array data
 * @param {String} arrayPath - The current state path of the array
 * @returns {Array}/{String}/{Integer} - The value of current state
 */
export const getCurrentValue = (arrayData: any[], arrayPath: string): any => {
  if (arrayData && arrayPath) {
    let result: any[] = arrayData
    const parts: string[] = parsePath(arrayPath)
    for (let part of parts) {
      const index = parseInt(part)
      if (!isNaN(index)) {
        part = index.toString()
      }
      result = result[part as any]
    }
    return result
  } else {
    return ''
  }
}
