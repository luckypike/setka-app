import { useContext } from 'react'

import Current from './Current'

export default function useI18n () {
  const { I18n } = useContext(Current)

  return I18n
}
