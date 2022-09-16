import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {getGoals} from '../features/goals/goalSlice'
import {reset} from '../features/auth/authSlice'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth)
  const {goals,isError,isloading, message} = useSelector((state)=> state.goals)

  useEffect(() =>{
    if(isError){
      console.log(message);
    }
    if(!user){
      navigate('/login')
    }
    dispatch(getGoals(user))

    return () =>{
      dispatch(reset())
    }
  },[user,navigate,dispatch])

  if(isloading){
    return <Spinner/>
  }
  return (
    <>
    <section className="heading">
      <h1>Welcome {user&& user.name}</h1>
      <p>Goals Dashboard</p>
    </section>
    <GoalForm/>
    <section className="content">
      {goals && goals.length >0 ? (<div className='goals'>
        {goals.map((goal)=>(
          <GoalItem key={goal._id} goal={goal}/>
        ))}
      </div>) : (<h3>You dont have any goals</h3>)}
    </section>
    </>
  )
}

export default Dashboard