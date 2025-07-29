import Tippy from '@tippyjs/react';
import 'react-toastify/dist/ReactToastify.css';
/// Icons
import { ReactComponent as IconInfo } from 'assets/icons/iconInfo.svg';

// Styles
import s from './Table.module.scss';
import classNames from 'classnames';

const TableHeader = ({ type }) => {
  if (type === 'transactions') {
    return (
      <div className={classNames(s.gridRow, s.gridHeader, s.transactions)} key={'transactions'}>
        <div>Дата</div>
        <div className={classNames(s.gridCell, s.center)}>Номер</div>
        <div className={classNames(s.gridCell, s.right, s.amount)}>Сумма, ₽</div>
        <div>Плательщик</div>
        <div>Получатель</div>
        <div>Назначение</div>
        <div>Вид</div>
        <div></div>
      </div>
    );
  }

  if (type === 'extractions') {
    return (
      <div
        className={classNames(s.gridRow, s.gridHeader, s.extractions, s.noPointer)}
        key={'extractions'}
      >
        <div>Поступил</div>
        <div>Компания</div>
        <div>Счет</div>
        <div>Файл</div>
        <div className={s.rightAlign}>Кто загрузил</div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (type === 'accounts') {
    return (
      <div className={classNames(s.gridRow, s.gridHeader, s.accounts)} key={'accounts'}>
        <div>Банк</div>
        <div>БИК</div>
        <div>Корр. счет</div>
        <div>Расчетный счет</div>
        <div>Компания</div>
        <div>Добавлен</div>
        <div className={classNames(s.agents)}>
          Контрагенты{' '}
          <Tippy
            content="Количество контрагентов, у которых выбран данный счет в качестве основного"
            theme="custom"
          >
            <IconInfo />
          </Tippy>
        </div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return null;
};

export default TableHeader;
