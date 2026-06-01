import { brands } from '../../../data/local-db'
import { delay, makeApiResponse } from '../../client/localApiClient'

export async function getBrands() {
  await delay(120)
  return makeApiResponse(brands)
}
