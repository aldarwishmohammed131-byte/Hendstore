export default function Button({ children, className = "", ...props }) {
  return (
    <button className={"px-4 py-2 rounded-xl font-extrabold transition " + className} {...props}>
      {children}
    </button>
  );
}
