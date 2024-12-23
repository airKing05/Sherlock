import React, {useState } from 'react';
import { serviceCode, serviceGraph, serviceNetwork, serviceStatus, serviceSummary, serviceTable, serviceTimeline } from '../apis/apis';
import { CHECKLIST, CODE, GRAPH_WIDGET, NETWORK, SUMMARY, TABLE, TIMELINE_WIDGET } from '../Constants/Text';

const responsesData = (questionType) => {
    switch (questionType) {
        case CHECKLIST:
            return serviceStatus();
        case SUMMARY:
            return serviceSummary();
        case CODE:
            return serviceCode();
        case GRAPH_WIDGET:
            return serviceGraph();
        case TIMELINE_WIDGET:
            return serviceTimeline();
        case TABLE:
            return serviceTable();
        case NETWORK:
            return serviceNetwork();
        default:
            return null;
    }
};

export default function usePostApiRequest(postFunction) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const executePost = async (payload) => {
        setLoading(true);
        setError(null);
        setData(null);
        try {
            const resp = await postFunction(payload); 
            if (resp){
               const responses = responsesData(payload.question)
                setData(responses.data);
                return responses.data;
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            return err.response;
        } finally {
            setLoading(false);
        }
    };

    return { executePost, loading, error, data };
};

