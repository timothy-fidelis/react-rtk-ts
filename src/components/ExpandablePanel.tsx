import { KeyboardEvent, ReactNode, useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

type ExpandablePanelProps = {
  header: ReactNode;
  children: ReactNode;
};

const ExpandablePanel = ({ header, children }: ExpandablePanelProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center">
        <div className="flex flex-row items-center justify-between">{header}</div>
        <div onClick={handleClick} onKeyDown={handleKeyDown} className="cursor-pointer" role="presentation">
          {expanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
};

export default ExpandablePanel;
