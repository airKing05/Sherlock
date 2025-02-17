import React from 'react'
import '../Investigation/Investigation.scss';
import useGetApiRequest from '../../Hooks/useGetApiRequest'
import serviceApis from '../../apis/apis'
import { useParams } from 'react-router-dom';
import HashLoaderComponent from '../../Common/Loader/HashLoaderComponent';
import { HomeComponentRenderer } from '../Home/Home';

export default function InvestigationDetails() {
    const { investigationId } = useParams();
    const { data: getData, loading: getLoading, error: getError, fetchData: fetchChatHistory } = useGetApiRequest(serviceApis.getChatInvestigationDetailsService, { id: investigationId })
    console.log("params", investigationId, getData)
    return (
        <div className='history__wrapper'>
            {
                getLoading ? <HashLoaderComponent loading={getLoading} /> : null
            }
            {
                getData?.data?.map((_card, index) => {
                    if (_card) {
                        return <React.Fragment key={index}>
                            <HomeComponentRenderer data={_card} />
                            <br />
                            <br />
                        </React.Fragment>
                    }
                })
            }
        </div>
    )
}
