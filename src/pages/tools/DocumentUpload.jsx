import { showToast } from '../../components/ui/Toast'

export default function DocumentUpload() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Jamaat Document & Attachment Manager</h1>
        <p className="text-sm text-slate-500">Upload PDF forms, circulars, and official letters</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-md text-xs space-y-4">
        <input type="file" accept=".pdf,.doc,.docx" className="w-full p-2 border rounded bg-slate-50" />
        <button onClick={() => showToast('Document attached successfully!')} className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          Upload Attachment
        </button>
      </div>
    </div>
  )
}
