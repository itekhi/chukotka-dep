import parsePhoneNumberFromString from 'libphonenumber-js'
import { getContactHref, getContactIcon } from '@/fields/contacts'
import { Contacts } from '@/payload-types'

type Props = {
  data: NonNullable<Contacts>[0]
  variant?: 'small'
}

const tryFormatValue = ({ type, value }: Props['data']) => {
  if (type === 'phone') {
    const phone = parsePhoneNumberFromString(value)
    return phone ? phone.formatInternational() : value
  }
  return value
}

export default function Contact({ data, variant = 'small' }: Props) {
  return (
    <a href={getContactHref(data)} className="flex items-center gap-1.75 group">
      {/* eslint-disable @next/next/no-img-element */}
      <img src={getContactIcon(data)} alt="" className="w-3.5 h-auto" />

      <p className="text-sm whitespace-nowrap group-hover:text-primary group-hover:ml-0.5 transition-all">
        {tryFormatValue(data)}
      </p>
    </a>
  )
}
