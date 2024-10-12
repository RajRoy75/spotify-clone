import { useQuery } from "react-query";
import { getUserDetail } from "../api";


const useUser = ()=>{

    const {data,isLoading,isError,refetch} = useQuery(
        "User",
        async()=>{
            try {
                const userDetail = await getUserDetail();
                return userDetail;
            } catch (error) {
                if(!error.message.includes('not authenticated')){
                    alert("Something went wrong");
                }
            }
        },
        {refetchOnWindowFocus: "always"}
    );
    return {data,isLoading,isError,refetch};
}
export default useUser;