import classNames from 'classnames';

// utils
import formatShortYear from 'utils/formatShortYear';
import formatSum from 'utils/formatSum';
import { addSpaceNumber } from 'utils/addSpaceNumber';

//hooks
import useDeleteTransaction from 'hooks/useDeleteTransaction';
import useDownloadExtraction from 'hooks/useDownloadExtraction';

// components
import CopyTextIcon from './CopyTextIcon';
import DownloadButton from 'components/General/DownloadButton/DownloadButton';
import Goal from '../Goal/Goal';
// icons
import { ReactComponent as IconClose } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconCloseRed } from 'assets/icons/iconCloseRed.svg';
import { ReactComponent as IconWarning } from 'assets/icons/iconWarning.svg';

// styles
import s from './Table.module.scss';
import CompanyLabelBadge from 'components/General/CompanyLabelBadge/CompanyLabelBadge';
import EllipsisWithTooltip from 'components/General/EllipsisWithTooltip/EllipsisWithTooltip';

const ACTOR_POSITIONS = {
  director: 'Директор',
  operator: 'Менеджер',
  accountant: 'Бухгалтер',
};

const TableRow = ({ row, type }) => {
  const handleDeleteTransaction = useDeleteTransaction();
  const handleDownloadExtraction = useDownloadExtraction();

  const renderTransactionRow = () => {
    const receiver =
      row?.type === 'income' || row?.type === 'refund_income' ? row?.partnership : row?.company;
    const payer =
      row?.type === 'income' || row?.type === 'refund_income' ? row?.company : row?.partnership;
    const isRecognized = row?.requires_action === 1;

    return (
      <div className={classNames(s.gridRow, s.transactions)}>
        <div className={s.gridCell}>{formatShortYear(row?.date)}</div>
        <div className={classNames(s.gridCell, s.right)}>{row?.number}</div>
        <div className={classNames(s.gridCell, s.right, s.amount)}>
          <AmountCell amount={formatSum(row?.type, row?.sum)} />
        </div>
        <div className={s.gridCell}>
          {isRecognized ? (
            <WarningCell />
          ) : (
            <CompanyCell name={payer} labelCondition={row.company === payer} label={row?.label} />
          )}
        </div>
        <div className={s.gridCell}>
          <CompanyCell
            name={receiver}
            labelCondition={row.company === receiver}
            label={row?.label}
          />
        </div>
        <div className={classNames(s.gridCell, s.shrinkable)}>
          <Goal text={row?.goal} />
        </div>
        <div className={s.gridCell}>{row?.kind}</div>
        <div className={classNames(s.gridCell, s.right)}>
          <DeleteTransaction id={row.id} onClick={handleDeleteTransaction} />
        </div>
      </div>
    );
  };

  const renderExtractionRow = () => {
    const getFullName = (row) => {
      const fullName =
        row?.person?.surname || row?.person?.name
          ? `${row?.person?.surname || ''} ${row?.person?.name || ''} `.trim()
          : '—';
      return fullName;
    };

    return (
      <div className={classNames(s.gridRow, s.extractions)}>
        <div className={s.gridCell}>{row?.date || ''}</div>
        <div className={s.gridCell}>{row?.partnership?.name || ''}</div>
        <div className={s.gridCell}>{row?.partnership?.rs || ''}</div>
        <div className={s.gridCell}>
          <DownloadButton onClick={() => handleDownloadExtraction(row.id)} />
        </div>
        <div className={classNames(s.gridCell, s.flexCell)}>
          <div>{row?.email ? row?.email : getFullName(row)}</div>

          <div className={s.gray}>{!row?.email && ACTOR_POSITIONS[row?.person?.position]}</div>
        </div>
        <div className={classNames(s.gridCell, s.right)}>
          {row?.status !== 1 && <TagLabel alert={true} inactive={false} />}
        </div>
      </div>
    );
  };

  const renderAccountRow = () => {
    return (
      <div className={classNames(s.gridRow, s.accounts)}>
        <div className={s.gridCell}>
          <EllipsisWithTooltip text={row.bank || ''} />
        </div>
        <div className={s.gridCell}>{row.bik || ''}</div>
        <div className={s.gridCell}>{row.rs || ''}</div>
        <div className={s.gridCell}>{row.ks || ''}</div>
        <div className={s.gridCell}>
          <EllipsisWithTooltip text={row.partnership.name || ''} />
        </div>
        <div className={s.gridCell}>{row.data || ''}</div>
        <div className={(s.gridCell, s.agents)}>{row.counterparties_count || ''}</div>
        <div className={s.gridCell}>
          {row.status === 'noactive' && <TagLabel inactive={true} />}
          {Boolean(row.is_main) && <TagLabel alert={false} inactive={false} />}
        </div>
        <div className={classNames(s.gridCell, s.copyCell, s.right)}>
          <CopyTextIcon
            textToCopy={
              `Банк: ${row.bank}\n` +
              `БИК: ${row.bik}\n` +
              `Корр. счет: ${row.rs}\n` +
              `Расчетный счет: ${row.ks}\n` +
              `Компания: ${row.partnership.name}`
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
        {addSpaceNumber(intPart)}
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

const DeleteTransaction = ({ onClick, id }) => {
  return (
    <div className={s.deleteWrapper}>
      <button className={s.deleteIconButton} aria-label="Удалить" onClick={(e) => onClick(id, e)}>
        <IconClose className={s.deleteIcon} />
        <IconCloseRed className={s.deleteIconRed} />
      </button>
    </div>
  );
};

const WarningCell = () => (
  <span className={s.warningCell}>
    <IconWarning />
    <span>Не распознан</span>
  </span>
);
const CompanyCell = ({ name, labelCondition, label }) => {
  const displayLabel = labelCondition ? label : null;

  return (
    <div className={s.withLabel}>
      <span className={s.companyText}>{name}</span>
      <CompanyLabelBadge label={displayLabel} />
    </div>
  );
};
