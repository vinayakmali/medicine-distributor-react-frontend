import Button from '@material-ui/core/Button';

const InputButton = (props) => {
	return (
		<Button {...props.attributes}>{props.children}</Button>
	);
}

export default InputButton;