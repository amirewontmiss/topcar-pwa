export default function FAQ() {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center tracking-tight text-white">
        Частые вопросы
      </h2>

      {['Оплата и депозиты', 'Условия аренды', 'Возврат авто'].map((question, idx) => (
        <details
          key={idx}
          className="mb-4 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-sm group transition-all"
        >
          <summary className="cursor-pointer font-semibold text-white text-lg list-none group-open:mb-3 transition">
            {question}
          </summary>
          <p className="text-sm text-white/70 leading-relaxed">
            Здесь будет подробный ответ на ваш вопрос.
          </p>
        </details>
      ))}
    </section>
  )
}

