import { useState } from "react";
import List from "./List";

interface SelectableListProps<T> {
    data: T[]|undefined,
    renderItem: (data: T, index: number) => React.ReactNode
}

function SelectableList<T>({
    data,
    renderItem
}: SelectableListProps<T>) {
    const [selectedItemIdx, setSelectedItemIdx] = useState<number|null>(null)

    return <List 
        data={data} 
        renderItem={
            (data, i) => (
                <div
                    key={i} 
                    style={{
                        background: selectedItemIdx === i ? '#efefef' : ''
                    }}
                    onClick={() => setSelectedItemIdx(i)}
                >
                    {renderItem(data, i)}
                </div>
            )
        }
    />
}

export default SelectableList