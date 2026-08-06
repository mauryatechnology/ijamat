import { useData } from '../../context/DataContext'

export default function EditUser() {
  const { userPermissions } = useData()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">User Account Management</h1>
        <p className="text-sm text-slate-500">Manage admin, collector, and masool user login credentials</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 border-b">
              <th className="p-3">User ID</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {userPermissions.users.map(u => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-semibold text-blue-600">{u.userId}</td>
                <td className="p-3 font-medium text-slate-800">{u.name}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">{u.category}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
