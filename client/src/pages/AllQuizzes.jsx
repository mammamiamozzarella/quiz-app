import { toast } from "react-toastify";
import { QuizzesContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get("/quiz", { params });
    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllQuizzesContext = createContext({ data: { quizzes: [] } });

const AllQuizzes = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllQuizzesContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <QuizzesContainer />
    </AllQuizzesContext.Provider>
  );
};

export const useAllQuizzesContext = () => useContext(AllQuizzesContext);

export default AllQuizzes;
