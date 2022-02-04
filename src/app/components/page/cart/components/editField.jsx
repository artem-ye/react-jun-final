const EditField = ({ title, value, disabled, onChange }) => {
    return (
        <>
            <h5 className='card-title text-nowrap'>{title}</h5>
            <input
                disabled={disabled}
                type='text'
                className='form-control-plaintext card-text text-muted'
                id='staticEmail'
                value={value}
                onChange={onChange}
            />
        </>
    );
}

export default EditField;