export default function DishCategory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dish Categories Master</h1>
        <p className="text-sm text-slate-500">Manage dish classifications (Rice, Curry, Sweet, Roti)</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-xs">
        <ul className="list-disc pl-5 space-y-1 font-medium text-slate-700">
          <li>Rice Items (Biryani, Pulao, Khichdi)</li>
          <li>Sweets (Kheer, Halwa, Jalebi)</li>
          <li>Curry / Salan (Dal, Meat Curry, Veg Gravy)</li>
        </ul>
      </div>
    </div>
  )
}
