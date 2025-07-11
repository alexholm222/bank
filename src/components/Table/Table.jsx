import React from 'react';

import classNames from 'classnames';
// Hooks
import { useModal } from 'hooks/useModal';

import TableSceleton from 'components/TableSceleton/TableSceleton';
// Icons

// Styles
import s from './Table.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import TableRow from './TableRow';
import TableHeader from './TableHeader';

const Table = ({ type, anim, isFetch, list: items }) => {
  const { showModal } = useModal();

  const handlerOpenFlow = () => {
    if (type === 1) {
      showModal('TRANSACTION', { data: items });
    }
    if (type === 2) {
      showModal('EXTRACTION', { data: items });
    }
    if (type === 3) {
      showModal('ACCOUNT_INFO', { data: items });
    }
  };

  if (isFetch) {
    return <TableSceleton isLoading={isFetch} />;
  }

  return (
    <table className={classNames(s.root, anim && s.root_anim, isFetch && s.root_fetch)}>
      <thead>{TableHeader({ type })}</thead>
      <tbody>
        {items.map((row, index) => (
          <tr key={index} className={s.dataRow} onClick={handlerOpenFlow}>
            {TableRow({ row, type })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
