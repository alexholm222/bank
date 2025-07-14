import classNames from 'classnames';
//components
import CopyTextIcon from './CopyTextIcon';
import DownloadButton from 'components/General/DownloadButton/DownloadButton';

//icons
import { ReactComponent as IconClose } from 'assets/icons/iconCloseBlue.svg';
import { ReactComponent as IconCloseRed } from 'assets/icons/iconCloseRed.svg';
//styles
import s from './Table.module.scss';

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

const TableRow = ({ row, type }) => {
  const handleDeleteTransaction = (id, e) => {
    e.stopPropagation();
    console.log('Удалить транзакцию с id:', id);
  };

  const handleDownloadExtraction = () => {
    console.log('Скачать выписку');
  };

  const renderType1Row = () => (
    <>
      <td>01.07.20</td>
      <td>123456</td>
      <td className={s.amountCell}>
        <AmountCell amount={'12233.2'} />
      </td>
      <td>{row?.payer?.name}</td>
      <td>{row?.receiver?.name}</td>
      <td className={s.shrinkable}>{row?.description}</td>
      <td>{row?.transactionType}</td>
      <td className={s.deleteCell}>
        <DeleteTransaction id={row.id} onClick={handleDeleteTransaction} />
      </td>
    </>
  );

  const renderType2Row = () => (
    <>
      <td>02.07.20 10:00</td>
      <td>{row?.payer?.name}</td>
      <td>115678</td>
      <td>
        <DownloadButton onClick={handleDownloadExtraction} />
      </td>
      <td>Менеджер Иванов</td>
      <td className={s.grayText}>Бухгалтер</td>
      <td>
        <TagLabel alert={false} inactive={false} />
      </td>
    </>
  );

  const renderType3Row = () => {
    const p = row?.payer || {};

    return (
      <>
        <td>{p.bank}</td>
        <td>{p.bik}</td>
        <td>{p.correspondentAccount}</td>
        <td>{p.accountNumber}</td>
        <td>{p.name}</td>
        <td>01.07.2025</td>
        <td className={s.agents}>123</td>
        <td>
          <TagLabel alert={false} inactive={true} />
        </td>
        <td>
          <CopyTextIcon
            textToCopy={
              `Банк: ${p.bank}\n` +
              `БИК: ${p.bik}\n` +
              `Корр. счет: ${p.correspondentAccount}\n` +
              `Расчетный счет: ${p.accountNumber}\n` +
              `Компания: ${p.name}`
            }
          />
        </td>
      </>
    );
  };

  if (type === 1) return renderType1Row();
  if (type === 2) return renderType2Row();
  if (type === 3) return renderType3Row();
  return null;
};

export default TableRow;
