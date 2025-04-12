export default function RentalCalculator() {
  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Калькулятор аренды</h2>
      <form className="grid gap-4">
        <select className="bg-white/5 p-3 rounded-md text-white">
          <option>Выбрать авто</option>
        </select>
        <input type="date" className="bg-white/5 p-3 rounded-md text-white" />
        <input type="date" className="bg-white/5 p-3 rounded-md text-white" />
        <div className="text-xl font-semibold">Итоговая цена: 0 ₸</div>
        <button className="mt-2 px-6 py-3 bg-white text-black rounded-full font-semibold">
          Оставить заявку
        </button>
      </form>
    </section>
  )
}
