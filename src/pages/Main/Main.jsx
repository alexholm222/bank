import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames';

import Button from 'components/General/Button/Button';
import Search from 'components/General/Search/Search';
import UniButton from 'components/General/UniButton/UniButton';
import Information from 'components/Information/Information';
import SectionButtons from 'components/SectionButtons/SectionButtons';
import Table from 'components/Table/Table';

import Transaction from 'components/ModalManager/modals/Transactions/Transaction';

import { ReactComponent as IconUploadWhite } from 'assets/icons/iconUploadWhite.svg';

import s from './Main.module.scss';
import { useModal } from 'hooks/useModal';

const mockData = {
  payer: {
    name: 'Рога и копыта ООО',
    inn: '123456789',
    kpp: '',
    bank: 'Модуль банк АО',
    bik: '123456789',
    correspondentAccount: '40702810680060657001',
    accountNumber: '40702810680060657001',
  },
  receiver: {
    name: 'Скилла Инновации ООО',
    inn: '123456789',
    kpp: '123456789',
    bank: 'Модуль банк АО',
    bik: '123456789',
    correspondentAccount: '40702810680060657001',
    accountNumber: '40702810680060657001',
  },
  amount: '12 345.60',
  transactionType: 'Входящая',
  paymentType: '-',
  description:
    'Поступил платеж от компании ООО “Агро 34” по счету лдотлоолиолимммммммммммммммммммммммммммммммммммммммммммммм',
};
const sectionButtons = [
  { id: 1, title: 'Транзакции' },
  { id: 2, title: 'Выписки' },
  { id: 3, title: 'Банковские счета' },
];

const Main = () => {
  // const {
  //   transactions,
  //   extractions,
  //   accounts,
  //   searchResult,
  //   fetchTransactions,
  //   fetchExtractions,
  //   fetchAccounts,
  //   fetchSearch,
  //   noFound,
  //   loadNextPage,
  // } = useInfiniteWorkers({
  //   paramsTransactions,
  //   paramsExtractions,
  //   paramsAccounts,
  //   paramsSearch,
  //   tableType,
  //   searchValue,
  // });

  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const [modalData, setModalData] = useState(null);

  const { showModal } = useModal();

  const openFlow = () => {
    showModal('TRANSACTION', { data: mockData });
  };

  const handleRowClick = (row) => {
    // setModalData(row);
    openFlow();
    console.log('Click');
  };

  return (
    <div className={s.root}>
      <header className={s.header}>
        <Information onClick={() => {}} open={true} />

        <div className={s.block}>
          <SectionButtons
            load={isLoading}
            list={sectionButtons}
            active={activeSection}
            setActive={setActiveSection}
          />
          <div className={s.buttons}>
            <UniButton onClick={() => {}} text={'Загрузить выписку'} icon={IconUploadWhite} />
          </div>
        </div>
      </header>
      <div className={s.container}>
        <div className={s.container}>
          <InfiniteScroll
            dataLength={1}
            next={() => console.log('Загружена следующая страница')} // вставить loadNextPage из хука
            hasMore={true}
          >
            <Table
              isFetch={isLoading}
              type={activeSection}
              list={[mockData]}
              handler={handleRowClick}
            />
          </InfiniteScroll>
        </div>
      </div>
      <section className={s.transactionSection}></section>
    </div>
  );
};

export default Main;

// const Main = ({ handleNotification }) => {
//     const { filterContactStatus, tagsFilter, sexFilter, ageRangeFilter, nationalityFilter, groupsFilter, sort } = useSelector((state) => state.filters)
//     const [anim, setAnim] = useState(false);
//     const [loadPage, setLoadPage] = useState(false)
//     const [tableType, setTableType] = useState(Number(localStorage.getItem('tableType')) || 1);
//     const [animTable, setAnimTable] = useState(true);
//     const [fetchTable, setFetchTable] = useState(false);
//     const [fetchTableConacts, setFetchTableContacts] = useState(false);
//     const [performersStatus, setPerformersStatus] = useState(1);
//     const [performersCount, setPerformersCount] = useState('');
//     const [contactsCount, setContactsCount] = useState('');
//     const [aplicationCount, setAplicationCount] = useState('');
//     const [searchValue, setSearchValue] = useState(localStorage.getItem('searcValueWorker') || '');
//     const [searchTable, setSearchTable] = useState(false);
//     const [searchResult, setSearchResult] = useState([]);
//     const [fetchSearch, setFetchSearch] = useState(false);
//     const [noFound, setNoFound] = useState(false);
//     const [noFoundPerformers, setNoFoundPerformers] = useState(false);
//     const [noFoundPerformersContact, setNoFoundPerformersContact] = useState(false);
//     const [openModalAdd, setOpenModalAdd] = useState(false);
//     const [requestedPerformer, setRequestedPerformer] = useState(null);
//     const { add } = useParams();

//     const params = {
//         'filter[status]': performersStatus,
//         'filter[app]': 1,
//         'filter[tags]': tagsFilter.join(','),
//         'filter[sex]': sexFilter == 2 ? '' : sexFilter,
//         'filter[age_min]': ageRangeFilter[0] ? ageRangeFilter[0] : '',
//         'filter[age_max]': ageRangeFilter[1] ? ageRangeFilter[1] : '',
//         'filter[nationality]': nationalityFilter.join(','),
//         'filter[groups]': groupsFilter.join(';'),
//         'sort_by': sort?.type,
//         'sort_dir': sort?.dir
//     };

//     const paramsContacts = {
//         'filter[app]': noAppStatus,
//         'filter[status]': filterContactStatus,
//         'filter[tags]': tagsFilter.join(','),
//         'filter[groups]': groupsFilter.join(';'),
//     }

//     const paramsSearch = {
//         'filter[qq]': searchValue
//     }

//     const paramsApplications = {
//         'filter[app]': [8]
//     }

//     const [allData, setAllData] = useState([]);
//     const [allDataContacts, setAllDataContacts] = useState([]);
//     const [allDataApplications, setAllDataApplications] = useState([]);
//     const { data, currentData, fetchNextPage, isLoading, isFetching, error } = useGetWorkersInfiniteQuery(params);
//     const { data: dataContacts, currentData: currentDataContacts, isFetching: isFetchingContacts, fetchNextPage: fetchNextPageContacts, isLoading: isLoadingContact } = useGetWorkersInfiniteQuery(paramsContacts);
//     const { data: searchData, currentData: currentDataSearch, fetchNextPage: fetchNextPageSearch, isFetching: isFetchingSearch } = useGetWorkersInfiniteQuery(paramsSearch);
//     const { data: dataApplications } = useGetWorkersInfiniteQuery(paramsApplications);

//     useEffect(() => {
//         if(add) {
//             setOpenModalAdd(true)
//             return
//         }
//     }, [add])

//     useEffect(() => {
//         setTimeout(() => {
//             setAnim(true)
//         }, 50)
//     }, [])

//     useEffect(() => {
//         /* const allData = data?.pages.flat() */
//         const allData = data?.pages?.map((el) => { return el.data })?.flat()
//         setPerformersCount(data?.pages?.[0]?.meta.total)
//         setAllData(allData)
//         allData?.length === 0 ? setNoFoundPerformers(true) : setNoFoundPerformers(false)
//     }, [data])

//     useEffect(() => {
//         /*    const allDataContacts = dataContacts?.pages.flat() */
//         const allDataContacts = dataContacts?.pages?.map((el) => { return el.data })?.flat()
//         setContactsCount(dataContacts?.pages?.[0]?.meta.total)
//         setAllDataContacts(allDataContacts)
//         allDataContacts?.length === 0 ? setNoFoundPerformersContact(true) : setNoFoundPerformersContact(false)
//     }, [dataContacts])

//     useEffect(() => {
//         /*  const allDataApplications = dataApplications?.pages.flat() */
//         const allDataApplications = dataApplications?.pages?.map((el) => { return el.data })?.flat()
//         setAplicationCount(dataApplications?.pages?.[0]?.meta.total)
//         setAllDataApplications(allDataApplications)
//     }, [dataApplications])

//     useEffect(() => {
//         if ((isFetching && !currentData && tableType === 1)) {
//             setFetchTable(true)
//         } else {
//             setFetchTable(false)
//         }
//     }, [isFetching, currentData, tableType])

//     useEffect(() => {
//         if ((isFetchingContacts && !currentDataContacts && tableType === 2)) {
//             setFetchTableContacts(true)
//         } else {
//             setFetchTableContacts(false)
//         }
//     }, [isFetchingContacts, currentDataContacts, tableType])

//     useEffect(() => {
//         if (isFetchingSearch && !currentDataSearch) {
//             setFetchSearch(true)
//         } else {
//             setFetchSearch(false)
//         }
//     }, [isFetchingSearch, currentDataSearch])

//     useEffect(() => {
//         if (searchValue?.length > 0 && searchData) {
//             const result = searchData?.pages.flat()
//             !isFetchingSearch && setSearchResult(result)

//             setTimeout(() => {
//                 setSearchTable(true)
//             })

//             result.length === 0 && setNoFound(true)
//         } else {
//             setSearchTable(false)
//             setNoFound(false)
//         }
//     }, [searchValue, searchData, isFetchingSearch])

//     useEffect(() => {
//         if (tableType === 3 && allDataApplications?.length === 0) {
//             setTableType(1)
//             localStorage.setItem('tableType', 1)
//         }
//     }, [allDataApplications, tableType])

//     const handleOpenAddModal = () => {
//         setOpenModalAdd(true)
//     }

//     const handleLoadNextPage = () => {
//         !searchTable && tableType === 1 && fetchNextPage()
//         !searchTable && tableType === 2 && fetchNextPageContacts()
//         searchTable && fetchNextPageSearch()
//     }

//     return (
//         <div
//             className={classNames(s.root, anim && s.root_anim)}
//         >
//             <Information
//                 setTableType={value => {
//                     localStorage.setItem('tableType', value)
//                     setTimeout(() => {
//                         setSearchValue('')
//                         setTableType(value);
//                     })

//                 }}
//                 open={allDataApplications?.length > 0 && tableType !== 3 && !isLoading}
//             />
//             <div className={s.header}>
//                 <div className={s.block}>
//                     <SectionButtons
//                         load={isLoading || isLoadingContact}
//                         noactive={searchValue.length > 0}
//                         list={sectionButtons}
//                         counters={[
//                             { id: 1, count: performersCount },
//                             { id: 2, count: contactsCount },
//                             { id: 3, count: aplicationCount }
//                         ]}
//                         active={tableType}
//                         setActive={value => {
//                             setRequestedPerformer(null)
//                             setAnimTable(false);
//                             localStorage.setItem('tableType', value)

//                             setTimeout(() => {
//                                 setSearchValue('')
//                                 setTableType(value);
//                             })
//                             setTimeout(() => {
//                                 setAnimTable(true)
//                             }, 50)
//                         }}
//                     />

//                     <p className={classNames(s.description, tableType === 3 && s.description_hidden)}>
//                         {tableType === 1 && searchValue.length === 0 && DESCRIPTION_PERFORMERS}
//                         {tableType === 2 && searchValue.length === 0 && DESCRIPTION_CONTACTS}
//                         {searchValue.length > 0 && DESCRIPTION_SEARCH}
//                     </p>
//                 </div>

//                 <div className={s.buttons}>
//                     {/* <ButtonSecond
//                         handler={handleOpenAddModal}
//                         buttonText={ADD_PERFORMERS_MAS}
//                         Icon={IconUpload}
//                         isLoading={false}
//                     /> */}

//                     <Button
//                         handler={handleOpenAddModal}
//                         buttonText={ADD_PERFORMERS}
//                         Icon={IconPlus}
//                         isLoading={false}
//                     />

//                 </div>

//             </div>

//         <div className={s.container}>
//             <div className={classNames(s.subheader, tableType === 3 && s.subheader_hidden)}>
//                 <div className={s.left}>
//                     <Search
//                         searchValue={searchValue}
//                         setSearchQuery={setSearchValue}
//                         isFetching={isFetchingSearch && !currentDataSearch && searchValue.length > 0}
//                     />
//                     <SegmentedButtons
//                         hidden={tableType > 1 || searchValue.length > 0}
//                         list={segmentButtons}
//                         active={performersStatus}
//                         setActive={setPerformersStatus}
//                     />
//                 </div>
//                 <div className={classNames(s.right, searchValue.length > 0 && s.right_hidden)}>
//                     <div className={classNames(s.sort, tableType === 2 && s.sort_hidden)}>
//                         <Sorting isFetching={isFetching} />
//                     </div>

//                     <FilterGroup isFetching={isFetching} />
//                     <Filters isFetching={tableType === 1 ? isFetching : isFetchingContacts} isPerformers={tableType === 1} />
//                 </div>

//                 <p className={classNames(s.nofound, noFound && s.nofound_vis)}>По вашему запросу ничего не найдено</p>
//                 <p className={classNames(s.nofound,
//                     searchValue.length === 0 &&
//                     ((noFoundPerformers && tableType === 1) || (noFoundPerformersContact && tableType === 2))
//                     && !isLoading
//                     && s.nofound_vis)}>Нет таких исполнителей</p>
//             </div>

//             <InfiniteScroll
//                 loader={false}
//                 scrollThreshold={0.3}
//                 dataLength={searchTable ? searchResult?.length : tableType === 1 ? allData?.length : allDataContacts?.length}
//                 next={handleLoadNextPage}
//                 hasMore={true}
//                 scrollableTarget="scrollableDiv"
//                 style={{ overflow: 'visible' }}
//                 endMessage={
//                     <p style={{ textAlign: "center" }}>

//                     </p>
//                 }
//             >
//                 <div className={s.table}>
// {!searchTable && tableType == 1 && <Table
//     isFetch={fetchTable}
//     type={1}
//     anim={animTable}
//     list={allData}
//     hidden={/* fetchSearch ||  */allData?.length === 0}
//     requestedPerformer={null}
//     handleNotification={handleNotification}
// />}

//                     {!searchTable && tableType == 2 && <Table
//                         isFetch={fetchTableConacts}
//                         type={2}
//                         anim={animTable}
//                         list={allDataContacts}
//                         hidden={/* fetchSearch ||  */allDataContacts?.length === 0}
//                         requestedPerformer={null}
//                         handleNotification={handleNotification}
//                     />}

//                     {!searchTable && tableType == 3 && <Table
//                         isFetch={false}
//                         type={3}
//                         anim={animTable}
//                         list={allDataApplications}
//                         hidden={fetchSearch || allDataApplications?.length === 0}
//                         requestedPerformer={requestedPerformer}
//                         handleNotification={handleNotification}
//                     />}

//                     {searchTable && <Table
//                         isFetch={fetchTable}
//                         type={2}
//                         anim={animTable}
//                         list={searchResult}
//                         hidden={fetchSearch || noFound}
//                         requestedPerformer={null}
//                         handleNotification={handleNotification}
//                     />}

//                     <TableSceleton
//                         isLoading={(tableType === 1 && isLoading) || (tableType === 2 && isLoadingContact)}
//                         type={tableType}
//                     />
//                 </div>
//             </InfiniteScroll>

//         </div>

//         {openModalAdd && <ModalAdd
//             setOpen={setOpenModalAdd}
//             handleNotification={handleNotification}
//             setTableType={setTableType}
//             setRequestedPerformer={setRequestedPerformer}
//         />}
//     </div>
// )
// };

// export default Main;
