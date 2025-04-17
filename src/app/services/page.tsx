'use client'

import Image from 'next/image'

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 sm:px-6">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center mb-12 text-white">
          Наши Услуги
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: '/icons/calendar.svg',
              title: 'Долгосрочная аренда',
              description:
                'Экономия до 40% при аренде от 30 дней. Подходит для бизнеса и длительных поездок.',
            },
            {
              icon: '/icons/driver.svg',
              title: 'Аренда с водителем',
              description:
                'Опытные водители, премиум сервис, конфиденциальность и максимальный комфорт.',
            },
            {
              icon: '/icons/transfer.svg',
              title: 'Аэропорт трансфер',
              description:
                'Встреча в аэропорту и комфортный трансфер до места назначения на люксовом авто.',
            },
            {
              icon: '/icons/vip.svg',
              title: 'VIP-обслуживание',
              description:
                'Отдельная VIP-линия, приоритетные бронирования, персональный менеджер.',
            },
            {
              icon: '/icons/discount.svg',
              title: 'Скидки постоянным клиентам',
              description:
                'Программа лояльности с накопительными бонусами и персональными предложениями.',
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 shadow-lg flex flex-col gap-4"
            >
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                <Image src={service.icon} alt={service.title} width={28} height={28} />
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

