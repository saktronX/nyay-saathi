import { Download, FileText, Calendar, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const STATUS_STYLES = {
  'Active': 'bg-blue-50 text-blue-700 border-blue-200',
  'Resolved': 'bg-green-50 text-green-700 border-green-200',
  'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
  'Under Review': 'bg-purple-50 text-purple-700 border-purple-200',
  'Notice Sent': 'bg-orange-50 text-orange-700 border-orange-200',
};

const STATUS_HI = {
  'Active': 'सक्रिय',
  'Resolved': 'हल हुआ',
  'Pending': 'लंबित',
  'Under Review': 'समीक्षाधीन',
  'Notice Sent': 'नोटिस भेजा',
};

export default function CaseHistoryCard({ caseItem }) {
  const {
    id, title, titleHi, date, status, category, categoryHi,
    caseNumber, documents = [], lastUpdate,
  } = caseItem;

  const statusStyle = STATUS_STYLES[status] || 'bg-gray-50 text-gray-600 border-gray-200';

  return (
    <div className="card p-5 hover:border-navy-200 transition-all duration-200" id={`case-${id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          {/* Icon */}
          <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <FileText className="w-5 h-5 text-navy-600" />
          </div>

          {/* Title & Meta */}
          <div className="min-w-0">
            <h3 className="font-semibold text-navy-700 text-sm truncate">{title}</h3>
            <p className="text-xs text-gray-400 font-hindi mt-0.5">{titleHi}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
              <span className="text-[10px] bg-navy-50 text-navy-600 px-2 py-0.5 rounded-full border border-navy-100">
                {category}
                <span className="font-hindi ml-1 text-gray-400">/ {categoryHi}</span>
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
              {caseNumber && (
                <span className="text-[10px] text-gray-400 font-mono">#{caseNumber}</span>
              )}
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span className={clsx('status-badge border', statusStyle)}>
            {status}
            <span className="font-hindi font-normal ml-1 opacity-70">/ {STATUS_HI[status]}</span>
          </span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
        </div>
      </div>

      {/* Last update */}
      {lastUpdate && (
        <p className="text-[11px] text-gray-400 mt-3 ml-13 pl-13">
          Last updated: {lastUpdate}
        </p>
      )}

      {/* Documents */}
      {documents.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-50 flex flex-wrap gap-2">
          {documents.map((doc) => (
            <button
              key={doc.name}
              className="flex items-center gap-1.5 text-xs text-navy-600 bg-navy-50 hover:bg-navy-100 border border-navy-100 px-3 py-1.5 rounded-lg transition-colors"
              aria-label={`Download ${doc.name}`}
            >
              <Download className="w-3.5 h-3.5" />
              {doc.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
