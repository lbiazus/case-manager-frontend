import toast from 'cogo-toast';

const getDefaultProperties = properties => {
	if (!properties) {
		return {
			position: 'top-right'
		};
	}
	return properties;
};

let showWarningMessage = (message, properties) => {
	return toast.warn(message, getDefaultProperties(properties));
};
let showErrorMessage = (message, properties) => {
	return toast.error(message, getDefaultProperties(properties));
};

let showSuccessMessage = (message, properties) => {
	return toast.success(message, getDefaultProperties(properties));
};

let showInfoMessage = (message, properties) => {
	return toast.info(message, getDefaultProperties(properties));
};

let showMessage = (type, message, properties) => {
	switch (type) {
		case "error":
			return showErrorMessage(message, properties);
		case "info":
			return showInfoMessage(message, properties);
		case "warning":
			return showWarningMessage(message, properties);
		default:
			return showSuccessMessage(message, properties);
	}
}

export default {
	showWarningMessage,
	showErrorMessage,
	showSuccessMessage,
	showInfoMessage,
	showMessage
};
