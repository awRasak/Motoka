// Small client-side file helpers for the demo portal's Export/Download
// buttons. Real exports will come from the business API later.
function saveBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Give the browser a tick to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function escapeCell(value) {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function downloadCsv(filename, headers, rows) {
  const csv = [
    headers.map(escapeCell).join(','),
    ...rows.map((row) => row.map(escapeCell).join(',')),
  ].join('\n');
  saveBlob(filename, new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' }));
}

export function downloadText(filename, text) {
  saveBlob(filename, new Blob([text], { type: 'text/plain;charset=utf-8;' }));
}
