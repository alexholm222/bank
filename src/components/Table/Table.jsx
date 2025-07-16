import React from 'react';
import classNames from 'classnames';
import 'react-toastify/dist/ReactToastify.css';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import TableSceleton from 'components/TableSceleton/TableSceleton';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

// Styles
import s from './Table.module.scss';

const Table = ({ type, anim, isFetch, list = [] }) => {
  const { showModal } = useModal();

  const handlerOpenFlow = (row) => {
    console.log('row:', row);
    if (type === 1) {
      showModal('TRANSACTION', { data: row });
    }
    if (type === 2) {
      showModal('EXTRACTION', { data: row });
    }
    if (type === 3) {
      showModal('ACCOUNT_INFO', { data: row });
    }
  };

  if (isFetch) {
    return <TableSceleton isLoading={isFetch} />;
  }

  return (
    <table className={classNames(s.root, anim && s.root_anim, isFetch && s.root_fetch)}>
      <thead>
        <TableHeader type={type} />
      </thead>

      <tbody>
        {list.map((row) => (
          <tr
            key={row.id}
            className={classNames(s.dataRow, type === 2 && s.noPointer)}
            onClick={() => handlerOpenFlow(row)}
          >
            <TableRow row={row} type={type} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
