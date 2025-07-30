import classNames from 'classnames';
import s from './Tooltip2.module.scss';

const Tooltip2 = ({ open, text, maxWidth, left, bottom }) => {

    return (
        <div
            style={{
                maxWidth: `${maxWidth}px`,
                left: `${left}px`,
                bottom: bottom ? `${bottom}px` : ''
            }}
            className={classNames(s.root, !left && s.root_center, open && s.root_open)}
        >
            <p>{text}</p>
        </div>
    )
};

export default Tooltip2;