import {showMessage, MessageOptions} from 'react-native-flash-message';

const notify = (msg: MessageOptions) => {
  showMessage(msg);
};

export {notify};
