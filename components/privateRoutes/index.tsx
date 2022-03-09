import { useRouter } from "next/router"
import { useAppSelector } from "../../store/hooks"
import Loader from "../loader"

const PrivateRoutes:React.FC = ({children}) => {
  const router = useRouter()
  // Fetch the user client-side
  const { user } = useAppSelector(state => state.userReducer)
  console.log(user)
  // Server-render loading state
  if(user === undefined) {
    router.push('/auth/login')
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