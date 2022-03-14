const FormInputField = ({ title, name, value, onChange, errors, type = 'text', ...restInputProps }) => {
	const error = errors?.join(', ') || errors;
	const inputClassList = 'form-control' + (!!error ? ' is-invalid' : '');
	const inputId = 'input' + name;

	return (
		<>
			<label htmlFor={inputId} className='col-sm-3 col-form-label'>
				{title}
			</label>
			<div className='col-sm-9'>
				<input
					type={type} // text/email/password/file
					className={inputClassList}
					id={inputId}
					name={name}
					value={value}
					onChange={onChange}
					{...restInputProps}
				/>
				<div id='validationServerUsernameFeedback' className='invalid-feedback'>
					{error}
				</div>
			</div>
		</>
	);
};

export default FormInputField;
