import axios from 'axios'
import { useMemo } from 'react'
import { useAppChainConfigStore } from "../store/useAppChainConfigStore"
import { type IUserData } from "../store/useUserDataStore"
import { useToken } from '@privy-io/react-auth'
import * as Sentry from '@sentry/react'

const isLocal = import.meta.env.VITE_DEPLOYMENT_ENV === 'local'

export const usePrivyService = () => {
  const httpUrl = useAppChainConfigStore(state => state.appChainConfig.httpUrl)
  const { getAccessToken } = useToken()

  const privyFareLogout = async () => {
    const url = `${httpUrl}/privy/logout`

    const { data } = await axios({
      method: 'POST',
      url,
      withCredentials: true,
    })

    Sentry.setUser(null)

    return data as { hasLoggedOut: boolean }
  }

  const verifyIdToken = async (
    publicAddress: string,
    privyUserId: string,
    shouldSyncSocials = false
  ) => {
    const url = `${httpUrl}/privy/verify/initial`
    const data = {
      publicAddress: publicAddress.toLowerCase(),
      pId: privyUserId,
      shouldSyncSocials,
    } as any

    if (isLocal) {
      data.privyBodyIdToken = await getAccessToken()
    }

    const { data: resData } = await axios({
      method: 'POST',
      url,
      data,
      withCredentials: true,
    })

    return resData as { userData: IUserData }
  }

  const switchSessionAddress = async (publicAddress: string) => {
    const url = `${httpUrl}/privy/verify/switch`

    const { data } = await axios({
      method: 'GET',
      url,
      params: {
        publicAddress: publicAddress.toLowerCase(),
      },
      withCredentials: true,
    })

    return data
  }

  const upsertGameConfig = async (gameConfig: any) => {
    const url = `${httpUrl}/game/upsert-game-config`

    const data = {
      gameConfig,
    } as any

    if (isLocal) {
      data.privyBodyIdToken = await getAccessToken()
    }

    const { data: resData } = await axios({
      method: 'POST',
      url,
      data,
      withCredentials: true,
    })

    return resData
  }

  return useMemo(
    () => ({
      verifyIdToken,
      switchSessionAddress,
      upsertGameConfig,
      privyFareLogout,
    }),
    [httpUrl]
  )
}
