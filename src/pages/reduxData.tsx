// pages/index.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../redux/slices/someSlice";
import { PlusOutlined } from "@ant-design/icons";

const Home = () => {
  const value = useSelector((state: RootState) => state.someSlice.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Value: {value}</h1>
      <button
        className="btn p-3 rounded shadow"
        onClick={() => dispatch(increment())}
      >
        <PlusOutlined />
      </button>
      <button
        className="btn p-3 px-4 shadow"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
};

export default Home;
