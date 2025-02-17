import React, { useEffect, useState } from 'react';
import './Investigation.scss';
import CustomTable2 from '../../Components/CustomTable/CustomTable2';
import useGetApiRequest from '../../Hooks/useGetApiRequest';
import serviceApis from '../../apis/apis';
import HashLoaderComponent from '../../Common/Loader/HashLoaderComponent';
import { useNavigate } from 'react-router-dom';


export default function Investigation() {
    const navigate = useNavigate();
    const { data: getChatInvestigationData, loading: getChatInvestigationLoading, error: getChatInvestigationError } = useGetApiRequest(serviceApis.getChatInvestigationService);

    const handleOpenHistoryDetails = async (RowId) => {
        navigate(`/investigation/${RowId}`, { state: RowId })
    }



    return (
        <>
            <div className='history__wrapper'>
                {
                    getChatInvestigationLoading ? <HashLoaderComponent loading={getChatInvestigationLoading} /> : null
                }
                {
                    getChatInvestigationData ? <CustomTable2
                        data={getChatInvestigationData && getChatInvestigationData.data.answer?.data}
                        hasActionColumn={true}
                        handleOpenHistoryDetails={handleOpenHistoryDetails}
                    /> : null
                }
            </div>

        </>
    )
}
