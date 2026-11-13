export default function BizPageTitle({ title, subtitle, children }) {
  return (
    <div className="title-row">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p className="sub">{subtitle}</p> : null}
      </div>
      <div className="actions">{children}</div>
    </div>
  );
}
