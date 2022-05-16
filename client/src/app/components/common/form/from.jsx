import React, { useEffect, useState } from 'react';

const Form = ({ children, data, validate, onSubmit, ...rest }) => {
	const [formData, setFormData] = useState({ ...data });

	const [errors, setErrors] = useState({});

	useEffect(() => {
		const errors = validate(formData);
		setErrors(errors);
	}, [formData]);

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;

		if (!name) {
			return;
		}

		setFormData((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const layout = React.Children.map(children, (child) => {
		const { datafieldname, ...props } = child.props;

		if (!datafieldname) {
			return child;
		}

		props.name = datafieldname;
		props.value = formData[datafieldname];
		props.onChange = handleChange;
		props.error = errors[datafieldname];

		return React.cloneElement(child, props);
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		const submitter = event.nativeEvent.submitter;
		onSubmit({ submitter, data: formData, errors });
	};

	return (
		<form onSubmit={handleSubmit} {...rest}>
			{layout}
		</form>
	);
};

export default Form;
