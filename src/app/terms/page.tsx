// src/app/terms/page.tsx
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20 max-w-5xl mx-auto font-sans">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 tracking-tight">
        Условия аренды
      </h1>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg space-y-8 text-white/80 leading-relaxed text-sm sm:text-base">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Общие положения</h2>
          <p>
            Аренда осуществляется только при наличии действующего водительского удостоверения. Возраст арендатора — от 21 года.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Срок аренды</h2>
          <p>
            Минимальный срок аренды — 1 сутки. Возврат автомобиля осуществляется строго в указанный в договоре срок.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Залог и оплата</h2>
          <p>
            Залог вносится перед началом аренды и возвращается после проверки автомобиля. Оплата возможна наличными, картой или переводом.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Страховка и ответственность</h2>
          <p>
            Все автомобили застрахованы. В случае ДТП арендатора обязаны незамедлительно уведомить арендодателя и органы полиции.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Пробег и топливо</h2>
          <p>
            Арендатор обязан вернуть автомобиль с тем же уровнем топлива, с которым он был получен. Пробег включён в стоимость аренды — до 300 км/сутки.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Дополнительные услуги</h2>
          <p>
            Доступны услуги трансфера, аренды с водителем, установки детского кресла и др. Все услуги можно заказать заранее.
          </p>
        </section>
      </div>
    </main>
  )
}

