export const isEmail = (value) => {
	const strValue = value?.toString() || '';
	return strValue.split('@').length === 2;
};

export const isNotEmptyString = (value) => {
	const strValue = value?.toString().trim();
	return !!strValue;
};

export const isCount = (value) => {
	return value > 0 && value % 1 === 0;
};
