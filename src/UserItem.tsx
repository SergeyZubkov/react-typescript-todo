import { User } from './types'

interface UserItemProps {
    data: User,
    onClick?: (id: string) => void
}

function UserItem(props: UserItemProps):React.ReactElement {
    const { data, onClick } = props;
    const { id, name } = data;
    return (
        <div style={{
            cursor: 'pointer'
        }}
            onClick={() => onClick?.(id)}
        >
            {id + ". " + name}
        </div>
    )
}

export default UserItem;