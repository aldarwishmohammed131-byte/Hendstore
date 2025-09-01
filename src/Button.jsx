// src/Button.jsx
export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={
        "px-4 py-2 rounded-xl font-extrabold transition " +
        "border border-transparent hover:opacity-90 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
