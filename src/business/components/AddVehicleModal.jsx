import { useState } from 'react';
import toast from 'react-hot-toast';

export default function AddVehicleModal({ open, onClose }) {
  const [plate, setPlate] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [branch, setBranch] = useState('Lagos');
  const [driver, setDriver] = useState('');

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!plate) {
      toast.error('Enter a plate number.');
      return;
    }
    toast.success(`${plate} added to the fleet (preview).`);
    setPlate('');
    setVehicle('');
    setDriver('');
    onClose();
  };

  return (
    <div className="biz-modal-backdrop" onClick={onClose}>
      <div className="biz-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Add vehicle">
        <div className="biz-modal__head">
          <h2>Add vehicle</h2>
          <button type="button" className="biz-modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <form onSubmit={submit}>
          <div className="biz-auth__field">
            <label htmlFor="av-plate">Plate number</label>
            <input id="av-plate" value={plate} onChange={(e) => setPlate(e.target.value)} placeholder="LND-482XY" />
          </div>
          <div className="biz-auth__field">
            <label htmlFor="av-vehicle">Vehicle</label>
            <input id="av-vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="Toyota Hiace · 2019" />
          </div>
          <div className="biz-auth__field">
            <label htmlFor="av-branch">Branch</label>
            <select id="av-branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
              <option>Lagos</option>
              <option>Abuja</option>
              <option>Ibadan</option>
            </select>
          </div>
          <div className="biz-auth__field">
            <label htmlFor="av-driver">Driver</label>
            <input id="av-driver" value={driver} onChange={(e) => setDriver(e.target.value)} placeholder="Kunle Adebayo" />
          </div>
          <button type="submit" className="biz-auth__btn">Add vehicle</button>
        </form>
      </div>
      <style>{`
        .biz-modal-backdrop { position: fixed; inset: 0; background: rgba(11,31,58,.55); display: flex; align-items: center; justify-content: center; z-index: 60; padding: 24px; }
        .biz-modal { width: 100%; max-width: 440px; background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 30px 60px -20px rgba(0,0,0,.45); }
        .biz-modal__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .biz-modal__head h2 { font-size: 20px; font-weight: 800; color: #0B1F3A; margin: 0; }
        .biz-modal__close { background: none; border: none; font-size: 24px; line-height: 1; cursor: pointer; color: #5F6E85; }
        .biz-modal select { height: 46px; border: 1px solid #E5EAF2; border-radius: 10px; padding: 0 14px; font-size: 15px; color: #0B1F3A; outline: none; width: 100%; font-family: inherit; }
        .biz-modal select:focus { border-color: #2389E3; box-shadow: 0 0 0 3px rgba(35,137,227,.15); }
      `}</style>
    </div>
  );
}
