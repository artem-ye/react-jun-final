import EditField from './editField';

const TextField = ({ title, value }) => {
    return (
        <EditField
            title={title}
            value={value}
            disabled={true}
            onChange={() => { }}
        />
    );
}

export default TextField;