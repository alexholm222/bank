import { useDispatch } from 'react-redux';
import { setSelectedRecognizedType } from '../../redux/filters/slice';

//styles
import classNames from 'classnames';
import s from './SectionButtons.module.scss';

const SectionButtons = ({ list, active, setActive }) => {
  const dispatch = useDispatch();
  const handleActive = (e) => {
    dispatch(setSelectedRecognizedType(''));
    const id = e.currentTarget.id;
    setActive(id);
  };

  return (
    <ul className={classNames(s.root)}>
      {list?.map((el) => {
        return (
          <li
            key={el.id}
            id={el.id}
            onClick={handleActive}
            className={classNames(s.item, el.id === active && s.item_active)}
          >
            <p>{el.title}</p>

            <div
              className={classNames(
                s.overlay,
                el.id === 'transactions' && active !== 'accounts' && s.overlay_left,
                el.id === 'extractions' && active === 'accounts' && s.overlay_left,
                el.id === active && s.overlay_hidden
              )}
            ></div>
          </li>
        );
      })}
    </ul>
  );
};

export default SectionButtons;
