import { useQuery } from "react-query";

const useCurrentSong = () => {
    const { data, isLoading, isError, refetch } = useQuery(
        "currentSong",
        async() => {
            const savedSong = localStorage.getItem('currentSong');
            return savedSong ? JSON.parse(savedSong) : null;
        },
        {
            refetchOnWindowFocus: false
            // initialData: useCurrentSong(),
        }
    )
    return { data, isLoading, isError, refetch };
}
export default useCurrentSong;