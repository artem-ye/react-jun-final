import React from 'react';

const ListRowColumn = ({ children: formField, width, className, withOnFocusSelect, ...formFieldProps }) => {
	const containerClassName = 'card-body col-md' + (!!width ? `-${width}` : '') + (!!className ? ` ${className}` : '');

	if (!formField) {
		return 'children not provided!';
	}

	const newFormFieldProps = { ...formFieldProps };
	if (withOnFocusSelect) {
		newFormFieldProps.onFocus = (event) => event.target.select();
	}

	return <div className={containerClassName}>{React.cloneElement(formField, newFormFieldProps)}</div>;
};

export default ListRowColumn;
