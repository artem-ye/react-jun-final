export const isEmail = (value) => {
	const strValue = value?.toString() || '';
	return strValue.split('@').length === 2;
};

export const isNotEmptyString = (value) => {
	const strValue = value?.toString().trim();
	return !!strValue;
};
