import { useMemo } from 'react';
import toast from 'react-hot-toast';
import BizPageTitle from '../components/BizPageTitle.jsx';
import { matchesQuery, useBizSearch } from '../components/BizSearchContext.jsx';
import { RENEWAL_COLUMNS } from '../data/businessData.js';

const TOTAL = RENEWAL_COLUMNS.reduce((sum, column) => sum + column.tasks.length, 0);
const QUEUED = RENEWAL_COLUMNS[0].tasks.length;

export default function BusinessRenewals() {
  const { query } = useBizSearch();

  const columns = useMemo(
    () =>
      RENEWAL_COLUMNS.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) =>
          matchesQuery(query, [task.plate, task.detail, task.driver, task.amount]),
        ),
      })),
    [query],
  );

  return (
    <>
      <BizPageTitle title="Renewals" subtitle="Track every renewal from queued to verified" />

      <div className="page-main">
        <div className="toolbar">
          <div className="group">
            <span className="cap">
              {TOTAL} renewals this month · ₦1,284,500 total
            </span>
          </div>
          <div className="group">
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => toast('Branch filters arrive with the live fleet API.')}
            >
              Filter by branch
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => toast(`Queued ${QUEUED} renewals for submission — this preview does not submit to the agency.`)}
            >
              Submit queued ({QUEUED})
            </button>
          </div>
        </div>

        <div className="kanban">
          {columns.map((column) => (
            <section className="col" key={column.key} aria-label={column.label}>
              <div className="col-head">
                <span>{column.label}</span>
                <span className="cap">{column.tasks.length}</span>
              </div>
              {column.tasks.map((task) => (
                <div className="task" key={task.plate}>
                  <div className="task-top">
                    <span className="plate">{task.plate}</span>
                    <span className="amt">{task.amount}</span>
                  </div>
                  <div className="muted">{task.detail}</div>
                  <div className="who">
                    <span className="mini-av">{task.initials}</span>
                    {task.driver}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
