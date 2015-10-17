/**
 * Assigns two styles and optionally overwrites existing values
 * Built to assign inline-style objects and respects CSS's !important annotation
 * @param {Object} styles - style objects which get merged together
 * Note: The first style object will serve as base
 * Existing values will get overwritten by default
 */
export default function assignStyles(...styles) {
  let property

  let newStyles = styles.splice(1)
  let base = styles[0];

  newStyles.forEach(styleObj => {
    if (styleObj instanceof Object) {
      Object.keys(styleObj).forEach(property => {
        let value = styleObj[property]
        if (!(base.hasOwnProperty(property) && isImportant(base[property]))) {
          if (base[property] instanceof Object && value instanceof Object) {
            base[property] = assignStyles({}, base[property], value)
          } else {
            base[property] = value
          }
        }
      })
    }
  })
  return base
}

/**
 * Checks if a property value is an css important rule with !important
 * @param {string} property - property thats value gets checked 
 */
const isImportant = (value) => typeof value == 'string' && value.toLowerCase().indexOf('!important') > -1