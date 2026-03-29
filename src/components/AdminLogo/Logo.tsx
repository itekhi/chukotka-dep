import React from 'react'

export default function Logo() {
  return (
    /* eslint-disable @next/next/no-img-element */
    <div className="">
      <img
        alt=""
        width={418}
        height={72}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="admin-logo light"
        src="/logo-light.png"
      />
      <img
        alt=""
        width={418}
        height={72}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="admin-logo dark"
        src="/logo.png"
      />
    </div>
  )
}
