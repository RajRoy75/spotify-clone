import { useQuery } from "react-query";

const useCurrentSong = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        "currentSong",
        async() => {
            const savedSong = localStorage.getItem('currentSong');
            return savedSong ? JSON.parse(savedSong) : null;
        },
        {
            staleTime: Infinity, // Prevent unnecessary refetches
            enabled: true, // Ensure query is always active
        }
        // {
        //     refetchOnWindowFocus: true,
        //     staleTime: 0,
        //     // initialData: useCurrentSong(),
        // }
    )
    return { data, isLoading, isError, refetch };
}
export default useCurrentSong;