import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function BulkAddVehicleModal({ open, onClose }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) {
      toast.error('Paste plate numbers or upload a CSV.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${lines.length} vehicle${lines.length === 1 ? '' : 's'} queued for import (preview).`);
      setText('');
      onClose();
    }, 600);
  };

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setText(String(reader.result || ''));
      toast.success(`Loaded ${file.name}`);
    };
    reader.readAsText(file);
  };

  return (
    <div className="biz-modal-backdrop" onClick={onClose}>
      <div className="biz-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Bulk add vehicles">
        <div className="biz-modal__head">
          <h2>Bulk add vehicles</h2>
          <button type="button" className="biz-modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <form onSubmit={submit}>
          <div className="biz-auth__field">
            <label htmlFor="bv-text">Plate numbers (one per line)</label>
            <textarea
              id="bv-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder={'LND-482XY\nKJA-317AB\nBRT-094LM'}
              style={{ height: 'auto', padding: 12, resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => fileRef.current?.click()}
            >
              Upload CSV
            </button>
            <input ref={fileRef} type="file" accept=".csv,text/csv" hidden onChange={onFile} />
            <span className="muted-note" style={{ alignSelf: 'center' }}>CSV with a "plate" column</span>
          </div>
          <button type="submit" className="biz-auth__btn" disabled={loading}>
            {loading ? 'Importing…' : 'Add vehicles'}
          </button>
        </form>
      </div>
      <style>{`
        .biz-modal-backdrop { position: fixed; inset: 0; background: rgba(11,31,58,.55); display: flex; align-items: center; justify-content: center; z-index: 60; padding: 24px; }
        .biz-modal { width: 100%; max-width: 480px; background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 30px 60px -20px rgba(0,0,0,.45); }
        .biz-modal__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .biz-modal__head h2 { font-size: 20px; font-weight: 800; color: #0B1F3A; margin: 0; }
        .biz-modal__close { background: none; border: none; font-size: 24px; line-height: 1; cursor: pointer; color: #5F6E85; }
      `}</style>
    </div>
  );
}
