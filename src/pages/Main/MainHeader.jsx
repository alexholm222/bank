import { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

//redux
import { useGetTableDataInfiniteQuery } from '../../redux/services/tableDataApiActions';
import { useGetTransactionsInfiniteQuery } from '../../redux/services/transactionsApi';

import { useSelector, useDispatch } from 'react-redux';
import { setTabData } from '../../redux/tableData/tableDataSlice';

// Hooks
import { useModal } from 'hooks/useModal';

// Components
import Search from 'components/General/Search/Search';
import UniButton from 'components/General/UniButton/UniButton';
import Information from 'components/Information/Information';
import SectionButtons from 'components/SectionButtons/SectionButtons';
import Table from 'components/Table/Table';
import FiltersContainer from 'components/Filters/FiltersContainer';

// Icons
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';
import { ReactComponent as IconUploadWhite } from 'assets/icons/iconUploadWhite.svg';

// Styles
import s from './Main.module.scss';
import formatDate from 'utils/formatDate';

const TABS = [
  { id: 1, title: 'Транзакции' },
  { id: 2, title: 'Выписки' },
  { id: 3, title: 'Банковские счета' },
];

const MainHeader = ({
  activeTab,
  setActiveTab,
  showAddAccountBtn,
  handleAddAccount,
  handleUpload,
  isLoading,
}) => {
  return (
    <header className={s.header}>
      <Information onClick={() => {}} open={true} />
      <div className={s.block}>
        <SectionButtons load={isLoading} list={TABS} active={activeTab} setActive={setActiveTab} />
        <div className={s.buttons}>
          {showAddAccountBtn ? (
            <UniButton onClick={handleAddAccount} text="Добавить счет" icon={IconPlus} />
          ) : (
            <UniButton onClick={handleUpload} text="Загрузить выписку" icon={IconUploadWhite} />
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
