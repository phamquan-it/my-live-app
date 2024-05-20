// pages/index.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";

const Home = () => {
  const value: any = useSelector((state: RootState) => state.userSlice.users);
  console.log(value);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Value: {value}</h1>
    </div>
  );
};

export default Home;
