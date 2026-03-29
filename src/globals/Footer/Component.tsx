import React, { Fragment } from 'react'
import Image from 'next/image'
import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import GosuslugiWidget from '@/components/GosuslugiWidget'
import { formatPhone } from '@/fields/phone'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { cn } from '@/utilities/ui'

export async function Footer() {
  // @ts-expect-error for some reason it messes up Footer with Header...
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const {
    address,
    addressPostalCode,
    addressLocality,
    emails,
    phones,
    openingHours,
    privacyPolicyLink,
    telegramUrl,
  } = footerData

  return (
    <>
      <footer id="footer" className="mt-auto bg-primary-muted rounded-t-4xl relative">
        <div className="container flex flex-col text-white pt-4 pb-8 md:py-8 xl:py-11">
          <div className="flex flex-col items-stretch sm:flex-row w-full bg-white rounded-2.5xl">
            {/* left side */}
            <div className="shrink-0 flex flex-col items-start relative z-10 pt-8 px-8 sm:py-12 sm:pl-12 lg:py-15 lg:pl-15">
              <Image src="/assets/gosuslugi-banner.svg" alt="" width={188} height={61} />

              <p className="sm:max-w-64 md:max-w-96 h-1.5xl md:h-3xl leading-[1.1] font-medium text-primary mt-5.5">
                Подать обращение через Госуслуги
              </p>

              <p className="p-sm md:p-md text-primary mt-4 mb-5">
                Оставьте интересующий вас вопрос
              </p>

              <GosuslugiWidget className="w-full sm:w-auto" />
            </div>

            <div className="grow relative z-0 -mt-8 ml-5 sm:m-0">
              <Image
                src="/assets/gosuslugi-img.png"
                alt="Госуслуги"
                width={1274}
                height={886}
                className="size-full xl:w-auto xl:absolute right-0 object-cover object-left"
              />
            </div>
          </div>

          {/* Контейнер контактов */}
          <div className="mt-13" itemScope={true} itemType="http://schema.org/Organization">
            <h2 className="h-3xl subline after:bg-tint">Контакты</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 lg:flex [&>div]:grow mt-12">
              <Contact
                title="Адрес"
                data={{ postalCode: addressPostalCode, locality: addressLocality, address }}
                render={({ postalCode, locality, address }: any) => (
                  <address
                    itemProp="address"
                    itemScope={true}
                    itemType="http://schema.org/PostalAddress"
                  >
                    <span itemProp="postalCode">{postalCode}</span>,{' '}
                    <span itemProp="addressLocality">{locality}</span>,{' '}
                    <span itemProp="streetAddress">{address}</span>
                  </address>
                )}
              />

              <Contact
                title="Телефон"
                iter={phones.map((p) => ({ phone: p, formatted: formatPhone(p, 'E.164') }))}
                render={({ phone, formatted }: any, idx: number) => (
                  <Fragment key={idx}>
                    <a key={idx} href={`tel:${formatted}`}>
                      {phone}
                    </a>
                    <p itemProp="telephone" className="sr-only">
                      {formatted}
                    </p>
                  </Fragment>
                )}
                className="sm:pl-10 lg:pl-0"
              />

              <Contact
                title="Электронная почта"
                iter={emails}
                render={(email: string, idx: number) => (
                  <Fragment key={idx}>
                    <a key={idx} href={`mailto:${email}`}>
                      {email}
                    </a>
                    <p itemProp="email" className="sr-only">
                      {email}
                    </p>
                  </Fragment>
                )}
              />

              <Contact
                title="График работы"
                iter={openingHours}
                render={(openHours: string, idx: number) => <p key={idx}>{openHours}</p>}
                className="sm:pl-10 lg:pl-0 lg:max-w-46"
              />
            </div>
          </div>

          {/* Нижняя полоса - Политика и Телеграм */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-7 w-full mt-11">
            <CMSLink
              {...privacyPolicyLink}
              className="p-base hover:text-white/70 transition-colors"
            >
              Политика обработки персональных
              <br />
              данных и конфиденциальности сайта
            </CMSLink>

            {telegramUrl && (
              <a
                href={telegramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-2.5"
              >
                {/* prettier-ignore */}
                <svg className="size-9 group-hover:scale-110 transition-transform" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 8.955 31.045 0 20 0ZM29.27 13.6017C28.97 16.7633 27.6667 24.4383 27.005 27.98C26.725 29.48 26.1717 29.9817 25.6383 30.03C24.4767 30.1367 23.595 29.2617 22.47 28.525C20.71 27.3717 19.715 26.6533 18.0067 25.5267C16.0317 24.225 17.3117 23.51 18.4367 22.3417C18.7317 22.035 23.8483 17.38 23.9483 16.9583C23.96 16.905 23.9733 16.7083 23.855 16.605C23.7367 16.5017 23.565 16.5367 23.4417 16.565C23.265 16.605 20.4533 18.4633 15.005 22.14C14.2067 22.6883 13.4833 22.955 12.835 22.9417C12.1217 22.9267 10.7483 22.5383 9.72667 22.205C8.475 21.7983 7.47833 21.5817 7.565 20.8917C7.61 20.5317 8.105 20.1633 9.05167 19.7867C14.8817 17.2467 18.77 15.5717 20.715 14.7617C26.27 12.4517 27.4233 12.05 28.1767 12.0367C29.12 12.0233 29.3467 12.8017 29.27 13.6017Z" fill="white"/>
                </svg>
                <p className="p-sm leading-[1.1]">
                  Подписывайтесь на
                  <br />
                  наш Telegram канал
                </p>
              </a>
            )}
          </div>
        </div>
      </footer>
    </>
  )
}

const Contact = ({ title, data, iter, render, className }: any) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-3 p-md lg:p-base xl:p-md [&>a]:hover:text-white/70 [&>a]:transition-colors',
        className,
      )}
    >
      <p className="h-xl text-white/90 sm:mb-2">{title}</p>

      {iter ? iter.map(render) : render(data)}
    </div>
  )
}
