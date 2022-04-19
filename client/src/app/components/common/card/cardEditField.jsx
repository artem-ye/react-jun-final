const CardEditField = ({ title, value, disabled, onChange, error, ...rest }) => {
	const classList =
		'form-control form-control-plaintext card-text text-muted  bg-body' + (error ? ' is-invalid' : '');

	return (
		<>
			<h5 className='card-title text-nowrap'>{title}</h5>
			<input disabled={disabled} type='text' className={classList} value={value} onChange={onChange} {...rest} />
			<div className='invalid-feedback'>{error}</div>
		</>
	);
};

export default CardEditField;
