import HeaderView from './header-view';
import ConfirmScreen from '../confirm/confirm-screen';
import Application from '../../Application';

export default (state) => {
  const headerView = new HeaderView(state);

  headerView.goBack = () => {
    if (!state) {
      Application.start();
      return;
    }

    const confirm = new ConfirmScreen(`Хотите вернуться на экран приветствия? Все ваши ответы будут потеряны!`);
    confirm.isOk = () => {
      Application.start();
    };
  };

  return headerView;
};
