import { useQuery } from "react-query";
import { getUserPlaylist } from "../api";

const useUserPlaylist = ()=>{
    const{data, isLoading, isError, refetch} = useQuery(
        "userPlaylist",
        ()=>getUserPlaylist(),
        {
            refetchOnWindowFocus: true,
            // onError: (error) => {
            //     console.error("React Query Error:", error);
            // },
        }
    )
    return {data, isLoading, isError, refetch};
}
export default useUserPlaylist;