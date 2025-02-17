import React, { useEffect, useState } from 'react';
import './History.scss';
import CustomTable from '../../Components/CustomTable/CustomTable';
import CustomTable2 from '../../Components/CustomTable/CustomTable2';
import TableActionPopup from '../../Components/CustomTable/TableActionPopup';
import useGetApiRequest from '../../Hooks/useGetApiRequest';
import serviceApis from '../../apis/apis';
import { HomeComponentRenderer } from '../Home/Home';
import Portal from '../../Layouts/Portal/Portal';

const customData = {
  rows: [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "phone": "1-770-736-8031",
      "website": "hildegard.org",
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "phone": "010-692-6593",
      "website": "anastasia.net",
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "username": "Samantha",
      "email": "Nathan@yesenia.net",
      "phone": "1-463-1234447",
      "website": "ramiro.info",
    },
  ],
  cols: [
    {
      field: 'id',
      title: 'Id'
    },
    {
      field: 'name',
      title: 'Name'
    },
    {
      field: 'username',
      title: 'User Name'
    },
    {
      field: 'email',
      title: 'Email Id'
    },
    {
      field: 'phone',
      title: 'Contact'
    },
    {
      field: 'website',
      title: 'Bio'
    }
  ]
}
export default function History() {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const { data: getData, loading: getLoading, error: getError, fetchData: fetchChatHistory } = useGetApiRequest(serviceApis.getChatInvestigationDetailsService, [], false)

  const handleOpenHistoryDetails = async(RowId) => {
    await fetchChatHistory(RowId); 
  }

  useEffect(() => {
    if (getData?.message === 'success'){
      setIsOpenDetails(true);
    }else if(getError){
      setIsOpenDetails(false);
    }
  }, [getError, getData])
  
  return (
    <>
      <div className='history__wrapper'>
        <CustomTable2
          data={customData}
          hasActionColumn={true}
          handleOpenHistoryDetails={handleOpenHistoryDetails}
        />

        <Portal
          isOpen={isOpenDetails}
          onClose={() => setIsOpenDetails(false)}
        >
          <div className='history__details'>
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
        </Portal>

      </div>

    </>
  )
}
