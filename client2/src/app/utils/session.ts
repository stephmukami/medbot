import { useSession, signOut } from 'next-auth/react'
const sessionStatus = useSession()
export default sessionStatus