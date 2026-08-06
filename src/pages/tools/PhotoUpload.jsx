import { showToast } from '../../components/ui/Toast'

export default function PhotoUpload() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mumineen Passport Photo Bulk Uploader</h1>
        <p className="text-sm text-slate-500">Upload profile photos mapped to ITS IDs</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-md text-xs space-y-4">
        <input type="file" accept="image/*" className="w-full p-2 border rounded bg-slate-50" />
        <button onClick={() => showToast('Photo uploaded successfully!')} className="w-full py-2 bg-emerald-600 text-white font-semibold rounded hover:bg-emerald-700">
          Upload Photo
        </button>
      </div>
    </div>
  )
}
