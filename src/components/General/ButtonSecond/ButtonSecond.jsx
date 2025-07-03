import classNames from 'classnames';

import s from './ButtonSecond.module.scss';

//components
import LoaderButton from './LoaderButton/LoaderButton';

const ButtonSecond = ({ handler, buttonText, Icon, isLoading, width, type }) => {
  return (
    <div
      style={{ width: width ? `${width}px` : 'auto' }}
      onClick={handler}
      className={classNames(s.root, type === 'red' && s.root_red)}
    >
      <p>{buttonText}</p>
      <Icon className={classNames(s.icon, isLoading && s.icon_hidden)} />
      <div className={classNames(s.loader, isLoading && s.loader_vis)}>
        <LoaderButton color={'#002CFB'} />
      </div>
    </div>
  );
};

export default ButtonSecond;
