import s from './CompanyFilter.module.scss';
import { ReactComponent as IconHome } from '../../assets/img/orders/iconHome.svg';
import { ReactComponent as IconClose } from '../../assets/icon/iconClose.svg';
import { ReactComponent as IconDoneWhite } from '../../assets/icon/iconDoneWhite.svg';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useGetParametrsQuery } from 'redux/ordersApiActions';
import { RootState } from 'redux/store';
//components
import CheckBox from 'components/CheckBox';
import LoaderIcon from 'components/LoaderIcon/LoaderIcon';
//slice
import { setFilterCompanys } from 'redux/filtersOrders/slice';


type ItemProps = {
    data: any
    setActiveCompany: any
    activeCompany: string[]
};


const Item: FC<ItemProps> = ({ data, activeCompany, setActiveCompany }) => {
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        const result = activeCompany?.find((el: any) => el == data.id)
        result ? setActive(true) : setActive(false)
    }, [activeCompany])

    const handleCheck = (e: any) => {
        const id = Number(e.currentTarget.id);
        if (!active) {
            setActiveCompany((prevState: any) => [...prevState, id])
        } else {
            setActiveCompany((prevState: any) => [...prevState.filter((el: any) => el !== id)])
        }
    }

    return (
        <div onClick={handleCheck} id={data.id} className={s.item}>
            <div className={s.check}>
                <CheckBox active={active} />
            </div>

            <div className={s.block}>
                <p>{data.name}</p>
                <span>ИНН: {data.inn} {data.kpp !== '' && `КПП: ${data.kpp}`}</span>
                <span></span>
            </div>
        </div>
    )
}

export const CompanyFilter: FC<any> = () => {
    const { data } = useGetParametrsQuery({});
    const { isFetchingOrders } = useSelector((state: RootState) => state.orders);
    const { filterCompanys } = useSelector((state: RootState) => state.filtersOrders);
    const [activeCompany, setActiveCompany] = useState(filterCompanys || []);
    const [open, setOpen] = useState<boolean>(false);
    const [loadFilter, setLoadFilter] = useState<boolean>(false)
    const saveData = localStorage.getItem('filterCompanys')
    const dispatch = useDispatch();

    const cites = data?.partnerships.reduce((accumulator: any, current: any) => {
        if (accumulator.findIndex((object: any) => object.city === current.city) === -1) {
            accumulator.push(current);
        }
        return accumulator;
    }, []).map((el: any) => { return el.city });

    useEffect(() => {
        if (saveData) {
            const data = JSON.parse(saveData)
            setActiveCompany(data)
            dispatch(setFilterCompanys(data))
        }
    }, [saveData])

    useEffect(() => {
        !isFetchingOrders && setLoadFilter(false)
    }, [isFetchingOrders]);

    const handleConfirm = () => {
        activeCompany?.length > 0 && setLoadFilter(true)
        dispatch(setFilterCompanys(activeCompany))
        localStorage.setItem('filterCompanys', JSON.stringify(activeCompany))
        setOpen(false)
    }

    const handleReset = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setActiveCompany([])
        dispatch(setFilterCompanys([]))
        localStorage.removeItem('filterCompanys')
    }

    const handleOpenModal = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            {data?.partnerships?.length > 1 ?
                <div onKeyDown={(e) => {
                    if (e.key === 'Enter') handleConfirm();
                }} className={s.container}>
                    <div onMouseDown={handleClose} className={classNames(s.overlay, open && s.overlay_anim)}></div>
                    <button onClick={handleOpenModal} className={classNames(s.button_filter, filterCompanys.length !== 0 && s.button_active)}>
                        <LoaderIcon icon={<IconHome />} load={loadFilter} />

                        <p>Компания</p>

                        <div className={classNames(s.result, filterCompanys.length !== 0 && s.result_vis)}>
                            <div className={classNames(s.count, filterCompanys.length == 0 && s.count_hidden)}>
                                <p>{filterCompanys.length == 0 ? '' : filterCompanys.length}</p>
                            </div>
                            <button onClick={handleReset} className={s.reset}>
                                <IconClose />
                            </button>
                        </div>
                    </button>

                    <div className={classNames(s.modal, open && s.modal_open)}>
                        {/*   <div className={s.header}>
                    <p>Мои компании</p>
                </div> */}

                        {/*    <div onClick={handleChoseAll} id={data.id} className={s.item}>

                    <CheckBox active={activeCompany?.length == data?.partnerships?.length} />

                    <div className={s.block}>
                        <p>Все</p>
                    </div>
                </div> */}

                        {cites?.map((el: string) => {
                            const items = data.partnerships.filter((item: any) => item.city == el)
                            return <div className={s.list}>
                                <span>{el}</span>
                                {items?.map((el: any) => {
                                    return <Item key={el.id} data={el} setActiveCompany={setActiveCompany} activeCompany={activeCompany} />
                                })}

                            </div>

                        })}

                        <div className={s.buttons}>
                            <button onClick={handleReset} className={classNames(s.button, s.button_second)}>Сбросить <IconClose /></button>
                            <button onClick={handleConfirm} className={s.button}>Применить <IconDoneWhite /></button>
                        </div>
                    </div>
                </div>

                : null
            }
        </>

    )
}

