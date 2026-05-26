'use client'
import React, { Fragment } from 'react'

export function UpdatedByCell({ user }: { user: any }) {
  return <Fragment>{user ? `${user.name} (${user.email})` : ''}</Fragment>
}
