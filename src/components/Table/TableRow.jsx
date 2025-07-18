import classNames from 'classnames';

// utils
import formatShortYear from 'utils/formatShortYear';
import formatSum from 'utils/formatSum';

// components
import CopyTextIcon from './CopyTextIcon';
import DownloadButton from 'components/General/DownloadButton/DownloadButton';

// icons
import { ReactComponent as IconClose } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconCloseRed } from 'assets/icons/iconCloseRed.svg';
import { ReactComponent as IconWarning } from 'assets/icons/iconWarning.svg';

// styles
import s from './Table.module.scss';

const TableRow = ({ row, type }) => {
  const handleDeleteTransaction = (id, e) => {
    e.stopPropagation();
    console.log('Удалить транзакцию с id:', id);
  };

  const handleDownloadExtraction = () => {
    console.log('Скачать выписку');
  };

  const renderTransactionRow = () => (
    <div className={classNames(s.gridRow, s.transactions)}>
      <div className={s.gridCell}>{formatShortYear(row?.date)}</div>
      <div className={classNames(s.gridCell, s.center)}>{row?.number}</div>
      <div className={classNames(s.gridCell, s.right, s.amount)}>
        <AmountCell amount={formatSum(row?.type, row?.sum)} />
      </div>
      <div className={s.gridCell}>{row.requires_action !== 1 ? row?.company : <WarningCell />}</div>
      <div className={s.gridCell}>{row?.partnership}</div>
      <div className={classNames(s.gridCell, s.shrinkable)}>{row?.goal}</div>
      <div className={s.gridCell}>{row?.kind}</div>
      <div className={classNames(s.gridCell, s.right)}>
        <DeleteTransaction id={row.id} onClick={handleDeleteTransaction} />
      </div>
    </div>
  );

  const renderExtractionRow = () => (
    <div className={classNames(s.gridRow, s.extractions)}>
      <div className={s.gridCell}>02.07.20 10:00</div>
      <div className={s.gridCell}>{row?.payer?.name}</div>
      <div className={s.gridCell}>115678</div>
      <div className={s.gridCell}>
        <DownloadButton onClick={handleDownloadExtraction} />
      </div>
      <div className={s.gridCell}>Менеджер Иванов</div>
      <div className={classNames(s.gridCell, s.gray)}>Бухгалтер</div>
      <div className={s.gridCell}>
        <TagLabel alert={false} inactive={false} />
      </div>
    </div>
  );

  const renderAccountRow = () => {
    const p = row?.payer || {};
    return (
      <div className={classNames(s.gridRow, s.accounts)}>
        <div className={s.gridCell}>{p.bank}</div>
        <div className={s.gridCell}>{p.bik}</div>
        <div className={s.gridCell}>{p.correspondentAccount}</div>
        <div className={s.gridCell}>{p.accountNumber}</div>
        <div className={s.gridCell}>{p.name}</div>
        <div className={s.gridCell}>01.07.2025</div>
        <div className={(s.gridCell, s.agents)}>123</div>
        <div className={s.gridCell}>
          <TagLabel alert={false} inactive={true} />
        </div>
        <div className={classNames(s.gridCell, s.copyCell)}>
          <CopyTextIcon
            textToCopy={
              `Банк: ${p.bank}\n` +
              `БИК: ${p.bik}\n` +
              `Корр. счет: ${p.correspondentAccount}\n` +
              `Расчетный счет: ${p.accountNumber}\n` +
              `Компания: ${p.name}`
            }
          />
        </div>
      </div>
    );
  };

  if (type === 'transactions') return renderTransactionRow();
  if (type === 'extractions') return renderExtractionRow();
  if (type === 'accounts') return renderAccountRow();
  return null;
};

export default TableRow;
const AmountCell = ({ amount }) => {
  const isNegative = amount.startsWith('-');
  const cleaned = amount.replace('+', '').replace('-', '');
  const [intPart, decimalPart] = cleaned.split('.');

  return (
    <span>
      <span style={{ color: isNegative ? '#000' : 'green' }}>
        {isNegative ? '-' : '+'}
        {intPart}
      </span>
      <span style={{ color: '#71869d' }}>.{decimalPart}</span>
    </span>
  );
};

const TagLabel = ({ alert, inactive }) => (
  <div className={classNames(s.tag, alert && s.tag_red, inactive && s.tag_grey)}>
    {inactive ? 'Неактивен' : alert ? 'Не распознана' : 'Основной'}
  </div>
);

const DeleteTransaction = ({ onClick, id }) => (
  <div className={s.deleteWrapper}>
    <button className={s.deleteIconButton} aria-label="Удалить" onClick={(e) => onClick(id, e)}>
      <IconClose className={s.deleteIcon} />
      <IconCloseRed className={s.deleteIconRed} />
    </button>
  </div>
);

const WarningCell = () => (
  <span className={s.warningCell}>
    <IconWarning />
    <span>Не распознан</span>
  </span>
);
