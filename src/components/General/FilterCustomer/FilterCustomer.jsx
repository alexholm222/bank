import s from './FilterCustomer.module.scss';
import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//icons
import { ReactComponent as IconClose } from 'assets/icon/iconClose.svg'
import { ReactComponent as IconWallet } from 'assets/icon/iconWalletGrey.svg'
/* import { ReactComponent as IconDone } from '../../../assets/icons/filters/iconDone.svg' */
//slice
import { setFilterCustomers } from 'redux/filtersOrders/slice';
//components
import FilterListCustomer from './FilterListCustomer/FilterListCustomer';
import LoaderIcon from 'components/LoaderIcon/LoaderIcon';



const FilterCustomer = () => {
    const { isFetchingOrders } = useSelector((state) => state.orders);
    const { filterCustomers } = useSelector((state) => state.filtersOrders);
    const [openModal, setOpenModal] = useState(false);
    const [load, setLoad] = useState(false);
    const [done, setDone] = useState(false);
    const modalRef = useRef()
    const filterRef = useRef();
    const dispatch = useDispatch()

    useEffect(() => {
        filterCustomers.length > 0 && setDone(true)
    }, [])

    useEffect(() => {
        !isFetchingOrders && setLoad(false)
        !isFetchingOrders && filterCustomers.length > 0 && setDone(true)
    }, [isFetchingOrders])

    const handleOpenModal = () => {
        openModal ? setOpenModal(false) : setOpenModal(true)
    }

    const handleReset = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDone(false)
        dispatch(setFilterCustomers([]))
        setOpenModal(false)
    }

    useEffect(() => {
        const clickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target) && !filterRef.current.contains(e.target)) {
                setOpenModal(false);
            }
        };
        document.body.addEventListener('mousedown', clickOutside);
        return () => document.body.removeEventListener('mousedown', clickOutside);
    }, []);
    return (
        <div className={s.root}>
            <div ref={filterRef} onClick={handleOpenModal} className={classNames(s.filter, filterCustomers?.length > 0 && s.filter_active)}>
                <div className={s.icon}>
                    <LoaderIcon icon={<IconWallet />} load={load} />

                    {/*  <div className={classNames(s.loader, done && s.loader_vis)}>
                        <IconDone />
                    </div> */}

                </div>

                <p className={s.title}>Заказчик</p>
                <div className={classNames(s.block, filterCustomers?.length > 0 && s.block_active)}>
                    <div className={s.count}>{filterCustomers?.length}</div>
                    <IconClose onClick={handleReset} className={s.close} />
                </div>
            </div>

            <div ref={modalRef} className={classNames(s.modal, openModal && s.modal_open)}>
                <FilterListCustomer
                    items={filterCustomers}
                    handleReset={handleReset}
                    setOpenModal={setOpenModal}
                    load={load}
                    setLoad={setLoad}
                    setDone={setDone}
                    isFetching={isFetchingOrders}
                />
            </div>
        </div>
    )
};

export default FilterCustomer;