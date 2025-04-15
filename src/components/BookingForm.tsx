export default function BookingForm() {
  return (
    <section className="py-20 px-6 max-w-2xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center tracking-tight text-white">
        Бронирование авто
      </h2>

      <form className="grid gap-5 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-sm">
        <input
          placeholder="Выберите авто"
          className="bg-black border border-white/20 p-3 rounded-md text-white placeholder-white/50 focus:outline-none"
        />
        <input
          type="datetime-local"
          className="bg-black border border-white/20 p-3 rounded-md text-white focus:outline-none"
        />
        <input
          placeholder="ФИО"
          className="bg-black border border-white/20 p-3 rounded-md text-white placeholder-white/50 focus:outline-none"
        />
        <input
          placeholder="Телефон"
          className="bg-black border border-white/20 p-3 rounded-md text-white placeholder-white/50 focus:outline-none"
        />

        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#d4af37] hover:text-white transition"
        >
          Отправить заявку
        </button>
      </form>
    </section>
  )
}

