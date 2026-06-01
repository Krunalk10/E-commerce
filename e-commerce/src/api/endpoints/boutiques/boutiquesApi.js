import { boutiques } from '../../../data/local-db'
import { delay, makeApiResponse } from '../../client/localApiClient'

export async function getBoutiques() {
  await delay(120)
  return makeApiResponse(boutiques)
}
