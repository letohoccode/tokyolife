export type StatusType = 'UNCONFIRMED' | 'CONFIRM' | 'TRANSPORT' | 'SUCCESS'
const statusMap: Record<StatusType, string> = {
  UNCONFIRMED: 'bg-gray-400 text-white',
  CONFIRM: 'bg-yellow-400 text-white',
  TRANSPORT: 'bg-blue-500 text-white',
  SUCCESS: 'bg-green-500 text-white'
}

function StatusBadge({ status }: { status: StatusType })  {
  const statusClass = statusMap[status] || 'bg-gray-400 text-white'
  return <span className={`px-3 py-1 rounded-full text-sm font-semibold 
    ${statusClass}`}>{status}</span>
}

export default StatusBadge
