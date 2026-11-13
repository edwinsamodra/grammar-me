import { createContext, useContext, useState, type ReactNode } from "react";

interface TreeSignal {
  version: number;
  open: boolean;
}

const TreeCtx = createContext<TreeSignal | null>(null);

/** Wraps a page or branch so an "Expand all / Collapse all" toolbar can drive all child TreeNodes. */
export function TreeControls({ children }: { children: (actions: { expandAll: () => void; collapseAll: () => void }) => ReactNode }) {
  const [signal, setSignal] = useState<TreeSignal | null>(null);
  const expandAll = () => setSignal((s) => ({ version: (s?.version ?? 0) + 1, open: true }));
  const collapseAll = () => setSignal((s) => ({ version: (s?.version ?? 0) + 1, open: false }));
  return <TreeCtx.Provider value={signal}>{children({ expandAll, collapseAll })}</TreeCtx.Provider>;
}

export interface TreeNodeProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  right?: ReactNode;
  depth?: 0 | 1 | 2;
  defaultOpen?: boolean;
  /** Optional controlled open state */
  open?: boolean;
  onToggle?: (next: boolean) => void;
  id?: string;
  children: ReactNode;
}

export function TreeNode({
  title,
  subtitle,
  badge,
  right,
  depth = 0,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  id,
  children,
}: TreeNodeProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const signal = useContext(TreeCtx);
  const [prevSignal, setPrevSignal] = useState(signal);

  if (signal !== prevSignal) {
    setPrevSignal(signal);
    if (signal && controlledOpen === undefined) {
      setInternalOpen(signal.open);
    }
  }

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const toggle = () => {
    const next = !isOpen;
    if (controlledOpen === undefined) setInternalOpen(next);
    onToggle?.(next);
  };

  return (
    <div className="tree-node" id={id}>
      <button
        type="button"
        className={`tree-header depth-${depth}`}
        aria-expanded={isOpen}
        onClick={toggle}
      >
        <span className={`tree-caret ${isOpen ? "open" : ""}`} aria-hidden="true">▸</span>
        <span className="tree-title">{title}</span>
        {subtitle && <span className="tree-sub">{subtitle}</span>}
        {(badge || right) && (
          <span className="tree-right" onClick={(e) => e.stopPropagation()}>
            {badge}
            {right}
          </span>
        )}
      </button>
      {isOpen && <div className="tree-children">{children}</div>}
    </div>
  );
}
