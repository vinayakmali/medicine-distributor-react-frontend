import TextField from '@material-ui/core/TextField';

const InputText = (props) => {

	const handleChange = (e) => {
		props.onChange(e.target.value);
	}
	return (
		<TextField {...props.attributes} onChange={handleChange} />
	);
}

export default InputText;