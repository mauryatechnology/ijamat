export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white px-6 py-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <span>
          © <strong>Jamaat Cloud</strong> - <em>Simplifying Operations</em> (Developed by Fakhri IT Services)
        </span>
        <span className="flex gap-3 text-slate-400">
          <a href="#" className="hover:text-blue-600 transition-colors">Terms & Conditions</a>
          <span>•</span>
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
        </span>
      </div>
    </footer>
  )
}
