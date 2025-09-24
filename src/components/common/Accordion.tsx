import React, { useState, useRef, type ReactNode } from 'react'

interface accordionProps {
  title: String,
  children: ReactNode
}

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
  </svg>
);

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
  </svg>
);

const Accordion: React.FC<accordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left text-xl font-medium"
      >
        <span className="text-2xl text-brand-500">{title}</span>
        <div className="text-brand-500">
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </div>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="overflow-hidden transition-max-height duration-500 ease-in-out"
      >
        <div className="w-full text-gray-500 font-extralight tracking-wider ">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
