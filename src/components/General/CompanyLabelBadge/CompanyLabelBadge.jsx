import s from './CompanyLabelBadge.module.scss';

const CompanyLabelBadge = ({ label }) => {
  if (typeof label !== 'string' || !label.trim()) return null;

  return (
    <div className={s.badge}>
      <span className={s.badgeText}>{label.trim()}</span>
    </div>
  );
};

export default CompanyLabelBadge;
