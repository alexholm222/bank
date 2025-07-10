import s from './FilterButton.module.scss';
import classNames from 'classnames';
//icons
import { ReactComponent as IconClose } from './icons/iconClose.svg';
import { ReactComponent as IconDone } from './icons/iconDone.svg';
import LoaderCircle from 'components/General/LoaderCircle/LoaderCircle';

const FilterButton = ({
  title,
  Icon,
  load = false,
  done = false,
  count,
  handleReset,
  handleOpen,
  buttonRef,
}) => {
  return (
    <div
      ref={buttonRef}
      onClick={handleOpen}
      className={classNames(s.filter, count > 0 && s.filter_active)}
    >
      <div className={s.icon}>
        <Icon className={(load || done) && s.hidden} />
        <div className={classNames(s.loader, load && s.loader_vis)}>
          <LoaderCircle />
        </div>

        <div className={classNames(s.loader, done && s.loader_vis)}>
          <IconDone />
        </div>
      </div>

      <p className={classNames(s.title, count > 0 && s.title_active)}>{title}</p>
      <div className={classNames(s.block, count > 0 && s.block_active)}>
        <div className={s.count}>{count}</div>
        <IconClose onClick={(e) => handleReset(e)} className={s.close} />
      </div>
    </div>
  );
};
export default FilterButton;
