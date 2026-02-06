import './components.css';

interface HeaderProps {
  title: string;
  actionLabel: string;
  onAction: () => void;
}

const Header = ({ title, actionLabel, onAction }: HeaderProps) => {
  return (
    <div className="header">
      <h1>{title}</h1>
      <button className="primary-btn" onClick={onAction}>
        + {actionLabel}
      </button>
    </div>
  );
};

export default Header;
