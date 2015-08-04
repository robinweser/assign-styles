/**
 * Assigns two styles and optionally overwrites existing values
 * Built to assign inline-style objects and respects CSS's !important annotation
 * @param {Object} styles - style objects which get merged together
 * Note: The first style object will serve as base
 * Existing values will get overwritten by default
 */
export default function assignStyles(...styles) {
	let property;

	let newStyles = styles.splice(1);
	let base = styles[0];

	newStyles.forEach(styleObj => {
		if (styleObj) {
			for (property in styleObj) {
				if (!(base.hasOwnProperty(property) && isImportant(base[property]))) {
					base[property] = styleObj[property];
				}
			}
		}
	})

	return base;
}

/**
 * Checks if a property value is an css important rule with !important
 * @param {string} property - property thats value gets checked 
 */
function isImportant(value) {
	return typeof value == 'string' && value.toLowerCase().indexOf('!important') > -1;
}