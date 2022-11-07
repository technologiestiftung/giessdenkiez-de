import { NextPage } from 'next'
import { ComponentType, ReactElement, ReactNode } from 'react'

export type Page<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: ReactElement, props?: P) => ReactNode
  layout?: ComponentType<P>
}

