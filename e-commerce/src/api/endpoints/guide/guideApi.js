import { articles } from '../../../data/local-db'
import { delay, makeApiResponse } from '../../client/localApiClient'

export async function getArticles() {
  await delay(120)
  return makeApiResponse(articles)
}
