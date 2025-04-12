export default function BookingForm() {
  return (
    <section className="py-20 px-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Бронирование авто</h2>
      <form className="grid gap-4">
        <input placeholder="Выберите авто" className="bg-white/5 p-3 rounded-md text-white" />
        <input type="datetime-local" className="bg-white/5 p-3 rounded-md text-white" />
        <input placeholder="ФИО" className="bg-white/5 p-3 rounded-md text-white" />
        <input placeholder="Телефон" className="bg-white/5 p-3 rounded-md text-white" />
        <button className="mt-2 px-6 py-3 bg-white text-black rounded-full font-semibold">
          Отправить заявку
        </button>
      </form>
    </section>
  )
}
