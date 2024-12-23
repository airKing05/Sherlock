import ClusterIcon from '../../../../assets/icons/aws/cluster.svg';
import DynamoDbIcon from '../../../../assets/icons/aws/dynamoDb.svg';
import DynamoDbTableIcon from '../../../../assets/icons/aws/dynamoDbTable.svg';
import AuroraIcon from '../../../../assets/icons/aws/aurora.svg';
import RdsIcon from '../../../../assets/icons/aws/rds.svg';



const ImageIcon = ({ icon }) => {
    return <img
        style={{
            // marginTop: '4px',
            borderRadius: '50%',
        }}
        width={50}
        height={50}
        src={icon}
        alt='icon'
    />;
}


const IconRenderer = ({ type }) => {
    switch (type) {
        case 'rds':
            return <ImageIcon icon={RdsIcon} />;
        case 'cluster':
            return <ImageIcon icon={ClusterIcon} />;
        case 'dynamoDb':
            return <ImageIcon icon={DynamoDbIcon} />;
        case 'dynamoDb-table':
            return <ImageIcon icon={DynamoDbTableIcon} />;
        case 'aurora':
            return <ImageIcon icon={AuroraIcon} />;
        case 'kubernetes':
            return <ImageIcon icon={KubernetesIcon} />;
        default:
            return null;
    }
};

export default IconRenderer;

