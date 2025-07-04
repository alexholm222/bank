import { useEffect, useState } from 'react';
import classNames from 'classnames';

import s from './SectionButtons.module.scss';

const SectionButtons = ({ list, active, setActive, load }) => {
  const [loadCount, setLoadCount] = useState(false);

  useEffect(() => {
    if (load) {
      setLoadCount(true);
    } else {
      setTimeout(() => {
        setLoadCount(false);
      }, 100);
    }
  }, [load]);

  const handleActive = (e) => {
    const id = Number(e.currentTarget.id);
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
                el.id === 1 && active !== 3 && s.overlay_left,
                el.id === 2 && active === 3 && s.overlay_left,
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
