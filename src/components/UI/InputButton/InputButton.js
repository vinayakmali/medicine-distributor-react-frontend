import Button from '@material-ui/core/Button';

const InputButton = (props) => {
	return (
		<Button {...props.attributes} data-testid={ props.attributes.testid } disabled={props.disabled}>{props.children}</Button>
	);
}

export default InputButton;