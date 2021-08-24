interface ListProps<T> {
    renderItem: (item: T, i:number) => React.ReactNode,
    data: Array<T>|undefined
}

function List<T>(props: ListProps<T>):React.ReactElement {
    return (
        <div style={{
            padding: "10px 15px",
            textAlign: 'left'
        }}>
            { props.data?.map(
                (item, i) => props.renderItem(item, i)
            )}
        </div>
    )
}

export default List