import React from 'react';

const ComparisonTable = () => {
  const data = [
    { file: 'Audio 1', mse: 0.00000003, original: -5.42, filtered: 12.35, imp: 17.77 },
    { file: 'Audio 2', mse: 0.00000012, original: -2.15, filtered: 15.68, imp: 17.83 },
    { file: 'Audio 3', mse: 0.00000008, original: -8.90, filtered: 10.12, imp: 19.02 },
  ];

  return (
    <div className="overflow-x-auto my-12 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-indigo-500">Audio File</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-indigo-500">MSE</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-indigo-500">Original SNR (dB)</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-indigo-500">Filtered SNR (dB)</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-indigo-500">Improvement</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors">
              <td className="px-6 py-4 font-bold">{row.file}</td>
              <td className="px-6 py-4 font-mono text-sm">{row.mse.toFixed(8)}</td>
              <td className="px-6 py-4 text-red-500">{row.original.toFixed(2)}</td>
              <td className="px-6 py-4 text-green-500">{row.filtered.toFixed(2)}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${(row.imp / 20) * 100}%` }} />
                  </div>
                  <span className="text-xs font-bold">+{row.imp.toFixed(2)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
