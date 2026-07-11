export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white px-6 py-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <span>
          © Developed by : <strong>Wonderful Developer</strong> (Email: wonderfuldevelopers@gmail.com)
        </span>
        <span className="flex gap-3">
          <a href="#" className="hover:text-blue-600 transition-colors">Terms & Conditions</a>
          <span>,</span>
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy & Refund Policy</a>
        </span>
      </div>
    </footer>
  )
}
