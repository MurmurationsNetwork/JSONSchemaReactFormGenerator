/*
 * use regex to get the array and object path.
 * For example, array[0].relationships[0].respects[0].domain will be parsed as ['array', '0', 'relationships', '0', 'respects', '0', 'domain']
 * @param {String} parentFieldName - The name of the parent field
 * @returns {Array} - The array of the path
 */
export const parsePath = (parentFieldName: string): string[] => {
  const regex = /(?<=\[)\d+(?=\])|\w+/g
  const matches = parentFieldName.match(regex)
  return matches ? Array.from(matches) : []
}
