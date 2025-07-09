import { useState, useRef, useEffect } from 'react';
import s from './ReusableFilterGroup.module.scss';
import FilterButton from 'components/General/FilterButton/FilterButton';
import GroupSelect from 'components/General/GroupSelect/GroupSelect';

const ReusableFilterGroup = ({ icon: Icon, btnTitle, options, onConfirm, onReset, modalTitle }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [load, setLoad] = useState(false);
  const [done, setDone] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    if (selectedItems.length > 0) {
      setDone(true);
    } else {
      setDone(false);
    }
  }, [selectedItems]);

  const handleOpen = () => {
    setOpenModal((prev) => !prev);
  };

  const handleReset = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedItems([]);
    setLoad(false);
    setDone(false);
    setOpenModal(false);
    onReset && onReset();
  };

  const handleConfirm = () => {
    setLoad(true);
    setOpenModal(false);
    onConfirm && onConfirm(selectedItems);
  };

  return (
    <div className={s.root}>
      <FilterButton
        title={btnTitle}
        Icon={Icon}
        load={load}
        done={done}
        count={selectedItems.length}
        handleReset={handleReset}
        handleOpen={handleOpen}
        buttonRef={buttonRef}
      />

      {openModal && (
        <GroupSelect
          title={modalTitle}
          buttonRef={buttonRef}
          groups={options}
          activeGroup={selectedItems}
          setActiveGroup={setSelectedItems}
          handleReset={handleReset}
          handleConfirm={handleConfirm}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
};

export default ReusableFilterGroup;
