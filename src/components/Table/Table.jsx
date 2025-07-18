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

const Table = ({ type, anim, isFetching, list = [] }) => {
  const { showModal } = useModal();

  const handlerOpenFlow = (row) => {
    if (type === 'transactions') {
      showModal('TRANSACTION', { data: row });
    }
    if (type === 'extractions') {
      showModal('EXTRACTION', { data: row });
    }
    if (type === 'accounts') {
      showModal('ACCOUNT_INFO', { data: row });
    }
  };

  if (isFetching) {
    return <TableSceleton isLoading={isFetching} />;
  }

  return (
    <table className={classNames(s.root, anim && s.root_anim, isFetching && s.root_fetch)}>
      <thead>
        <TableHeader type={type} />
      </thead>

      <tbody>
        {list.map((row) => (
          <tr
            key={row.id}
            className={classNames(s.dataRow, type === 'extractions' && s.noPointer)}
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
