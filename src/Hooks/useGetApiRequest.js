import React, { useEffect, useState } from 'react'

export default function useGetApiRequest(fetchFunction, dependencies = [], autoFetch = true, params = null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchData = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction(params?.id || id);
            setData(result);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, dependencies);

    return { data, loading, error, fetchData };
}
