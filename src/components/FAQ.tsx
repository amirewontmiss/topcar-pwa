export default function FAQ() {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Частые вопросы</h2>
      {['Оплата и депозиты', 'Условия аренды', 'Возврат авто'].map((question, idx) => (
        <details key={idx} className="mb-4 bg-white/5 p-4 rounded-lg">
          <summary className="cursor-pointer font-medium">{question}</summary>
          <p className="text-sm text-white/70 mt-2">
            Здесь будет подробный ответ на ваш вопрос.
          </p>
        </details>
      ))}
    </section>
  )
}
