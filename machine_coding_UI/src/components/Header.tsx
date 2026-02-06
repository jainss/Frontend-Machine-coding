import './components.css';

interface HeaderProps {
  title: string;
  actionTypeName: string;
  onActionFun: () => void;
}

const Header = ({ title, actionTypeName, onActionFun }: HeaderProps) => {
  return (
    <div className="header">
      <h1>{title}</h1>
      <button className="primary-btn" onClick={onActionFun}>
        + {actionTypeName}
      </button>
    </div>
  );
};

export default Header;
