import fetch, { RequestInit } from 'node-fetch'
import { githubClientId, githubClientSecret, githubTokenEndpoint } from '../common/variables'


export const refreshAccessToken = async (refreshToken: string): Promise<{accessToken: string, refreshToken: string}> => {
  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', refreshToken)
  params.append('client_id', githubClientId)
  params.append('client_secret', githubClientSecret)

  const refreshOptions: RequestInit = {
    method: 'POST', body: params
  }

  const response = await fetch(githubTokenEndpoint, refreshOptions)

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message)
  }

  const {access_token, refresh_token} = await response.json()

  return {
    accessToken: access_token, refreshToken: refresh_token
  }
}
