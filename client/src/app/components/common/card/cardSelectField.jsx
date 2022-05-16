const CardSelectField = ({ title, name, value, options, disabled, onChange, error, ...rest }) => {
	return (
		<>
			<h5 className='card-title text-nowrap'>{title}</h5>
			<select
				className='form-select form-select-lg mb-3 text-muted card-text form-control-plaintext'
				aria-label='.form-select-lg example'
				value={value}
				onChange={onChange}
				disabled={disabled}
				name={name}
			>
				{options.map((option) => {
					return (
						<option key={option.value} value={option.value}>
							{option.title}
						</option>
					);
				})}
			</select>
			<div className='invalid-feedback'>{error}</div>
		</>
	);
};

export default CardSelectField;
