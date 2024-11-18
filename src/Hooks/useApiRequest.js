import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function useApiRequest(url) {
    const [respData, setRespData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ; (
            async () => {
                try {
                    setError(null);
                    setLoading(true);
                    const resp = await axios({
                        method: 'get',
                        url: url
                    });
                    setRespData(resp.data);
                } catch (error) {
                    console.log(error);
                    setError('something went wrong');
                    setLoading(false);

                }
            }
        )()

        return () => {

        }
    }, []);
    return [respData, error, loading];
}
