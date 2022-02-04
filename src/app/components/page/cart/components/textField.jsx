const TextField = ({ title, value }) => {
    return (
        <>
            <h5 className='card-title text-nowrap'>{title}</h5>
            <p className='card-text text-muted'>{value}</p>
        </>
    );
}

export default TextField;