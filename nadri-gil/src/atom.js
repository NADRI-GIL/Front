import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const isLoginedAtom = atom({
    key:"isLogined",
    default:false,
    effects_UNSTABLE: [persistAtom]
})
export const loginIdAtom = atom({
    key:"loginId",
    default:"",
    effects_UNSTABLE: [persistAtom],
})

export const currentPageAtom = atom({
    key:"currentPage",
    default:1,
    effects_UNSTABLE: [persistAtom],
})




