import { useQuery } from "@tanstack/react-query"
import { fetchRestaurants } from "../api/fetchRestaurants"

const useRestaurantsData = () => {
    return useQuery({
        queryKey: ['restaurants'],
        queryFn: fetchRestaurants,
    })
};

export default useRestaurantsData;