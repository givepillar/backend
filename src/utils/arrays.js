export const omit = (obj, exclude) =>
  Object.entries(obj)
    .filter(([key]) => !exclude.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})
