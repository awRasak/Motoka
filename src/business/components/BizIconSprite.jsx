import { ICON_SPRITE } from './iconSpriteData.js';

// The design ships one inline SVG sprite per page. Render it once in the
// layout and every <BizIcon /> can reference the same symbols.
export default function BizIconSprite() {
  return (
    <span
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      dangerouslySetInnerHTML={{ __html: ICON_SPRITE }}
    />
  );
}
