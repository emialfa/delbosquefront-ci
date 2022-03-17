import { useRouter } from "next/router"
import { useAppSelector } from "../../store/hooks"
import Loader from "../loader"

interface Props {
  admin?: boolean;
}

const PrivateRoutes:React.FC<Props> = ({children, admin}) => {
  const router = useRouter()
  // Fetch the user client-side
  const { user, isAdmin } = useAppSelector(state => state.userReducer)
  // Server-render loading state
  if(user === undefined) {
    router.push('/auth/login')
  }
  if (admin && !isAdmin && user){
    router.push('/')
  }
  if (!user) {
    return <Loader />
  }

  // Once the user request finishes, show the user
  return (
    <>
    {children}
    </>
  )
}

export default PrivateRoutes