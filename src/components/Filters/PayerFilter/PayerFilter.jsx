// import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import classNames from 'classnames';

// // Redux
// import { setSelectedPayers } from '../../../redux/filters/slice';

// // Components
// import FilterButton from 'components/Filters/COMPONENTS/FilterButton/FilterButton';
// import PayersList from 'components/Filters/PayerFilter/PayersList/PayersList';

// // Icons
// import { ReactComponent as IconWallet } from 'assets/icons/iconWallet.svg';

// // Styles
// import s from './PayerFilter.module.scss';

// const PayerFilter = ({ data, isFetching, setActiveFilter, clearActiveFilter, name }) => {
//   const dispatch = useDispatch();
//   const selectedPayers = useSelector((state) => state.filters.selectedPayers);

//   const [localSelected, setLocalSelected] = useState(selectedPayers);
//   const [isOpen, setIsOpen] = useState(false);
//   const [load, setLoad] = useState(false);
//   const [done, setDone] = useState(false);

//   const modalRef = useRef(null);
//   const buttonRef = useRef(null);

//   const handleOpen = () => {
//     setActiveFilter(name);
//     setIsOpen(true);
//   };

//   const handleConfirm = () => {
//     dispatch(setSelectedPayers(localSelected));
//     setIsOpen(false);
//   };

//   const handleReset = (e) => {
//     e?.stopPropagation();
//     setLocalSelected([]);
//     dispatch(setSelectedPayers([]));
//     setIsOpen(false);
//     clearActiveFilter();
//   };

//   const handleChange = (updated) => {
//     setLocalSelected(updated);
//   };

//   useEffect(() => {
//     setLoad(isFetching);

//     const hasSelected = selectedPayers?.length > 0;
//     setDone(!isFetching && hasSelected);
//   }, [isFetching, selectedPayers]);
//   useEffect(() => {
//     setLocalSelected(selectedPayers);
//   }, [selectedPayers]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         modalRef.current &&
//         !modalRef.current.contains(e.target) &&
//         !buttonRef.current.contains(e.target)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className={s.root}>
//       <FilterButton
//         title="Плательщик"
//         Icon={IconWallet}
//         count={selectedPayers.length}
//         handleReset={handleReset}
//         handleOpen={handleOpen}
//         buttonRef={buttonRef}
//         load={load}
//         done={done}
//       />

//       <div ref={modalRef} className={classNames(s.modal, { [s.modal_open]: isOpen })}>
//         <PayersList
//           items={data}
//           selected={localSelected}
//           onChange={handleChange}
//           onConfirm={handleConfirm}
//           onReset={handleReset}
//         />
//       </div>
//     </div>
//   );
// };

// export default PayerFilter;
