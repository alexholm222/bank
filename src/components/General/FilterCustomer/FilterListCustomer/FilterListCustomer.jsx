import s from './FilterListCustomer.module.scss';
import { useState, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useGetParametrsQuery } from 'redux/ordersApiActions';
import { ReactComponent as IconSearch } from 'assets/icon/iconSearch.svg';
import { ReactComponent as IconDone } from 'assets/icon/iconDone.svg';
import { ReactComponent as IconCloseBlue } from 'assets/icon/iconCloseBlue.svg';
//slice
import { setFilterCustomers } from 'redux/filtersOrders/slice';
//components
import CheckBox from 'components/Genegal/CheckBox/CheckBox';
import Button from 'components/Genegal/Button/Button';
import ButtonSecond from 'components/Genegal/ButtonSecond/ButtonSecond';
//utils
import { handleSearchCompany } from 'utils/SearchCompany';


const FilterListCustomer = memo(({ items, openModal, handleReset, setOpenModal, setLoad, load, setDone }) => {
    const { data: parameters, isLoading: isLoadingParams } = useGetParametrsQuery();
    const [searchQuery, setSearchQuery] = useState('')
    const [activeCompany, setActiveCompany] = useState(items || []);
    const [filterCompanies, setFilterCompanies] = useState(parameters?.companies || [])
    const dispatch = useDispatch()

    useEffect(() => {
        setFilterCompanies(parameters?.companies)
    }, [parameters])

    useEffect(() => {
        setActiveCompany(items)

    }, [items])

    const handleSearch = (e) => {
        const value = e.currentTarget.value;
        setSearchQuery(value)
        const result = handleSearchCompany(value, parameters?.companies)
        setFilterCompanies(result)
    }

    const handleConfirm = () => {
        setDone(false)
        setLoad(true)
        dispatch(setFilterCustomers(activeCompany))
        setOpenModal(false)
    }



    return (
        <div className={s.root}>
            <div className={s.container}>
                <div className={s.header}>
                    <p>Заказчик</p>
                </div>

                <div className={s.search}>
                    <IconSearch />
                    <input
                        onChange={handleSearch}
                        value={searchQuery || ''}
                        type='text'
                    >
                    </input>
                </div>

                <ul className={s.list}>
                    {filterCompanies?.map(el => {
                        return <Items
                            key={el.id}
                            el={el}
                            activeCompany={activeCompany}
                            setActiveCompany={setActiveCompany}
                        />
                    })}
                </ul>
            </div>

            <div className={s.buttons}>
                <ButtonSecond
                    Icon={IconCloseBlue}
                    type={'list'}
                    handler={handleReset}
                    buttonText={'Сбросить'}
                    isLoading={false}
                />

                <Button
                    Icon={IconDone}
                    type={'list'}
                    handler={handleConfirm}
                    buttonText={'Применить'}
                    isLoading={load}
                    width={true}
                />


            </div>
        </div>
    )
});

const Items = memo(({ el, activeCompany, setActiveCompany }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const result = activeCompany?.find(item => item == el.id)
        result ? setActive(true) : setActive(false)
    }, [activeCompany])

    const handleCheck = (e) => {
        const id = Number(e.currentTarget.id);
        if (!active) {
            setActiveCompany((prevState) => [...prevState, id])
        } else {
            setActiveCompany((prevState) => [...prevState.filter((el) => el !== id)])
        }
    }

    return (
        <div onClick={handleCheck} id={el.id} className={s.item}>
            <div className={s.check}>
                <CheckBox active={active} />
            </div>

            <div className={s.block}>
                <p>{el.name}</p>
                <span>ИНН: {el.inn} {el.kpp && el.kpp !== '' && `КПП: ${el.kpp}`}</span>
                <span></span>
            </div>
        </div>
    )
})

export default FilterListCustomer;