import CardEditField from './cardEditField';

const CardTextField = ({ title, value, ...rest }) => {
	return <CardEditField title={title} value={value} disabled={true} onChange={() => {}} {...rest} />;
};

export default CardTextField;
