import { useState } from 'react'
import { Upload, Camera, FileText, Video } from 'lucide-react'

export default function ManageCaption() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Manage Media Captions & Titles</h1>
        <p className="text-sm text-slate-500">Edit titles and descriptions for uploaded event photos and videos</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs max-w-md space-y-3">
        <input type="text" placeholder="Caption Title" className="w-full p-2 border rounded bg-slate-50" />
        <button onClick={() => alert('Caption updated!')} className="w-full bg-blue-600 text-white py-2 rounded font-medium">Save Caption</button>
      </div>
    </div>
  )
}

export function PhotoUpload() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Event Photo Gallery Upload</h1>
        <p className="text-sm text-slate-500">Upload photos from Waaz, Sabaq, and Niyaz events</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 space-y-2">
          <Camera size={36} className="mx-auto text-blue-600" />
          <p className="font-semibold">Select Event Photos</p>
          <input type="file" accept="image/*" multiple className="text-xs" />
        </div>
        <button onClick={() => alert('Photos uploaded!')} className="w-full bg-blue-600 text-white py-2 rounded font-medium">Upload Photos</button>
      </div>
    </div>
  )
}

export function DocumentUpload() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Jamaat Document Archive Upload</h1>
        <p className="text-sm text-slate-500">Upload official circulars, PDF reports, and Waqf deeds</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-4">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 space-y-2">
          <FileText size={36} className="mx-auto text-emerald-600" />
          <p className="font-semibold">Upload PDF / Document File</p>
          <input type="file" accept=".pdf, .doc, .docx" className="text-xs" />
        </div>
        <button onClick={() => alert('Document archived!')} className="w-full bg-emerald-600 text-white py-2 rounded font-medium">Archive Document</button>
      </div>
    </div>
  )
}

export function LiveEvent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Live Streaming & Event Relay</h1>
        <p className="text-sm text-slate-500">Configure broadcast links for live relay of majlis and relay feeds</p>
      </div>
      <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-3">
        <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
          <Video size={18} /> Live Broadcast Feed Config
        </div>
        <input type="text" placeholder="Live Stream URL (HLS / YouTube Live)" className="w-full p-2 border rounded bg-slate-50" />
        <button onClick={() => alert('Live broadcast URL saved!')} className="w-full bg-red-600 text-white py-2 rounded font-medium">Go Live</button>
      </div>
    </div>
  )
}

export function LiveEventPermission() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Live Stream Access Permissions</h1>
        <p className="text-sm text-slate-500">Restrict live relay access to authorized Sabil accounts</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <p className="text-emerald-700 font-medium">✓ Live stream access open for all active Jamaat Sabil holders.</p>
      </div>
    </div>
  )
}
