export default function BizIcon({ name, className = 'i', style }) {
  return (
    <svg className={className} style={style} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}
