import Tippy from '@tippyjs/react';
import 'react-toastify/dist/ReactToastify.css';
/// Icons
import { ReactComponent as IconInfo } from 'assets/icons/iconInfo.svg';

// Styles
import s from './Table.module.scss';

const TableHeader = ({ type }) => {
  if (type === 1) {
    return (
      <tr>
        <th style={{ width: '80px' }}>Дата</th>
        <th style={{ width: '80px' }}>Номер</th>
        <th style={{ minWidth: '160px' }} className={s.amountCell}>
          Сумма, ₽
        </th>
        <th style={{ minWidth: '230px' }}>Плательщик</th>
        <th style={{ minWidth: '230px' }}>Получатель</th>
        <th style={{ minWidth: '300px' }}>Назначение</th>
        <th style={{ minWidth: '100px' }}>Вид</th>
        <th style={{ minWidth: '80px' }}></th>
      </tr>
    );
  }
  if (type === 2) {
    return (
      <tr>
        <th style={{ width: '160px' }}>Поступил</th>
        <th style={{ minWidth: '350px' }}>Компания</th>
        <th style={{ minWidth: '100px' }}>Счет</th>
        <th style={{ minWidth: '200px' }}>Файл</th>
        <th style={{ minWidth: '250px' }}>Кто загрузил</th>
        <th style={{ minWidth: '200px' }}></th>
        <th style={{ width: '180px' }}></th>
      </tr>
    );
  }
  if (type === 3) {
    return (
      <tr>
        <th style={{ width: '250px' }}>Банк</th>
        <th style={{ width: '120px' }}>БИК</th>
        <th style={{ width: '210px' }}>Корр. счет</th>
        <th style={{ width: '210px' }}>Расчетный счет</th>
        <th style={{ minWidth: '200px' }}>Компания</th>
        <th style={{ minWidth: '100px' }}>Добавлен</th>
        <th style={{ minWidth: '140px' }} className={s.agents}>
          Контрагенты{' '}
          <Tippy
            content="Количество контрагентов, у которых выбран данный счет в качестве основного"
            theme="custom"
          >
            <IconInfo />
          </Tippy>
        </th>
        <th style={{ minWidth: '90px' }}></th>
        <th style={{ minWidth: '40px' }}></th>
      </tr>
    );
  }
};

export default TableHeader;
