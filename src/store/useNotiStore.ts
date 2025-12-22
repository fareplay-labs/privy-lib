import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

type NotiType = 'success' | 'error'

interface INoti {
  id?: string
  type: NotiType
  msg: string
  image?: string
}

type NotiState = {
  appNotis: INoti[]
  gameNotis: INoti[]
}

type NotiStoreActions = {
  addAppNoti: (appNoti: INoti) => void
  addGameNoti: (gameNoti: INoti) => void
  removeAppNoti: (id?: string) => void
  removeGameNoti: (id?: string) => void
}

const initialNotiState: NotiState = {
  appNotis: [],
  gameNotis: [],
}

type NotiStore = NotiState & NotiStoreActions

const useNotiStore = create<NotiStore>(set => ({
  ...initialNotiState,
  addAppNoti: appNoti =>
    set(state => {
      appNoti.id = uuid()
      return {
        appNotis: [...state.appNotis, appNoti],
      }
    }),
  addGameNoti: gameNoti =>
    set(state => {
      gameNoti.id = uuid()
      return {
        gameNotis: [...state.gameNotis, gameNoti],
      }
    }),
  removeAppNoti: id =>
    set(state => ({
      appNotis: id ? state.appNotis.filter(noti => noti.id !== id) : state.appNotis.slice(1),
    })),
  removeGameNoti: id =>
    set(state => ({
      gameNotis: id ? state.gameNotis.filter(noti => noti.id !== id) : state.gameNotis.slice(1),
    })),
}))

export const addAppNoti = useNotiStore.getState().addAppNoti

export default useNotiStore
