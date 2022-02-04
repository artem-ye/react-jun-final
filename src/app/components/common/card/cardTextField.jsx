import CardEditField from './cardEditField';

const TextField = ({ title, value }) => {
    return (
        <CardEditField
            title={title}
            value={value}
            disabled={true}
            onChange={() => { }}
        />
    );
};

export default TextField;