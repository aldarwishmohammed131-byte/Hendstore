export default function Button({ className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={
        "px-4 py-2 rounded-xl transition active:scale-[.98] " +
        "focus:outline-none focus:ring focus:ring-yellow-500/30 " +
        className
      }
    >
      {children}
    </button>
  );
}
