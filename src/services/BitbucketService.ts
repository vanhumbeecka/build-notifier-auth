import base64 from 'base-64'
import { bitbucketClientId, bitbucketClientSecret, bitbucketTokenEndpoint } from '../common/variables'
import fetch, {RequestInit} from 'node-fetch'

export const refreshAccessToken = async (refreshToken: string): Promise<{accessToken: string, refreshToken: string}> => {

  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', refreshToken)

  const refreshOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${base64.encode(bitbucketClientId + ':' + bitbucketClientSecret)}`
    },
    body: params
  }

  const response = await fetch(bitbucketTokenEndpoint, refreshOptions)

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message)
  }

  const {access_token, refresh_token} = await response.json()

  return {
    accessToken: access_token,
    refreshToken: refresh_token
  }
}
