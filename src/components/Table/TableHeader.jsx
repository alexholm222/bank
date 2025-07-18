import Tippy from '@tippyjs/react';
import 'react-toastify/dist/ReactToastify.css';
/// Icons
import { ReactComponent as IconInfo } from 'assets/icons/iconInfo.svg';

// Styles
import s from './Table.module.scss';
import classNames from 'classnames';

// const TableHeader = ({ type }) => {
//   console.log('header type:', type);
//   if (type === 'transactions') {
//     return (
//       <tr>
//         <th style={{ width: '100px' }}>Дата</th>
//         <th style={{ width: '100px', textAlign: 'center' }}>Номер</th>
//         <th style={{ width: '250px', paddingRight: '40px', textAlign: 'right' }}>Сумма, ₽</th>
//         <th style={{ minWidth: '200px' }}>Плательщик</th>
//         <th style={{ minWidth: '150px' }}>Получатель</th>
//         <th style={{ minWidth: '300px' }}>Назначение</th>
//         <th style={{ width: '210px' }}>Вид</th>
//         <th style={{ width: '80px' }}></th>
//       </tr>
//     );
//   }
//   if (type === 'extractions') {
//     return (
//       <tr>
//         <th style={{ width: '160px' }}>Поступил</th>
//         <th style={{ minWidth: '300px' }}>Компания</th>
//         <th style={{ minWidth: '100px' }}>Счет</th>
//         <th style={{ minWidth: '200px' }}>Файл</th>
//         <th style={{ minWidth: '200px' }}>Кто загрузил</th>
//         <th style={{ minWidth: '200px' }}></th>
//         <th style={{ width: '180px' }}></th>
//       </tr>
//     );
//   }
//   if (type === 'accounts') {
//     return (
//       <tr>
//         <th style={{ width: '200px' }}>Банк</th>
//         <th style={{ width: '120px' }}>БИК</th>
//         <th style={{ width: '210px' }}>Корр. счет</th>
//         <th style={{ width: '210px' }}>Расчетный счет</th>
//         <th style={{ minWidth: '200px' }}>Компания</th>
//         <th style={{ width: '120px' }}>Добавлен</th>
//         <th style={{ width: '120px' }} className={s.agents}>
//           Контрагенты{' '}
//           <Tippy
//             content="Количество контрагентов, у которых выбран данный счет в качестве основного"
//             theme="custom"
//           >
//             <IconInfo />
//           </Tippy>
//         </th>
//         <th style={{ width: '90px' }}></th>
//         <th style={{ width: '40px' }}></th>
//       </tr>
//     );
//   }
// };

// export default TableHeader;

const TableHeader = ({ type }) => {
  if (type === 'transactions') {
    return (
      <div className={classNames(s.gridRow, s.gridHeader, s.transactions)}>
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
      <div className={classNames(s.gridRow, s.gridHeader, s.extractions, s.noPointer)}>
        <div>Поступил</div>
        <div>Компания</div>
        <div>Счет</div>
        <div>Файл</div>
        <div>Кто загрузил</div>
        <div></div>
        <div></div>
      </div>
    );
  }

  if (type === 'accounts') {
    return (
      <div className={classNames(s.gridRow, s.gridHeader, s.accounts)}>
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
