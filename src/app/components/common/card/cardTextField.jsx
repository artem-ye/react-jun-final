import CardEditField from './cardEditField';

const CardTextField = ({ title, value }) => {
    return (
        <CardEditField
            title={title}
            value={value}
            disabled={true}
            onChange={() => { }}
        />
    );
};

export default CardTextField;