export default function LiveEvent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Live Broadcast & Majlis Relay Channel</h1>
        <p className="text-sm text-slate-500">Manage audio/video broadcast relay links for home streaming</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs space-y-3">
        <p className="font-semibold text-slate-800">Current Stream Status: <span className="text-emerald-600 font-bold">ONLINE</span></p>
        <p className="text-slate-600 font-mono">HLS Stream URL: https://relay.jamaat.org/hls/live.m3u8</p>
      </div>
    </div>
  )
}
