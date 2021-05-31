import TextField from '@material-ui/core/TextField';

const InputText = (props) => {

	const handleChange = (e) => {
		props.onChange(e.target.value);
	}
	return (
		<TextField {...props.attributes} data-testid={ props.attributes.testid } onChange={handleChange} />
	);
}

export default InputText;