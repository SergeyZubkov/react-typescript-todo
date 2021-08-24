
import useFetch from './hooks/useFetch';

interface LoadProps<T> {
    url: string,
    options?: RequestInit,
    renderData: (data: T) => React.ReactNode,
    renderError: (error: Error) => React.ReactNode,
    renderLoader: React.ReactNode
}

function Load<T>(props: LoadProps<T>):any {
    const {
        url,
        options,
        renderData,
        renderError,
        renderLoader
    } = props;

    const {
        data,
        error
    } = useFetch<T>(url, options)

    
    
    if (!data) return renderLoader
    else if (error) return renderError(error)
    else return renderData(data)
}

export default Load