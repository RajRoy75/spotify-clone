import { useQuery } from "react-query";
import { fetchSearchResults } from "../api/index.js";

const useSearch = (query)=>{
  const{data, isLoading, isError} = useQuery(
    ["userPlaylist",query],
    fetchSearchResults,
    {
      enabled: !!query, // Only run the query if there's a search term
      staleTime: 1000 * 60 * 5, // Cache results for 5 minutes

    }
  )
  return {data, isLoading, isError};
}
export default useSearch;
