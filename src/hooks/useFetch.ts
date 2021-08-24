import { useReducer, useEffect, useRef } from 'react';

interface State<T> {
    data: T|undefined,
    error: Error|undefined
}

type Cache<T> = {
    [url: string]: T
}

type Action<T> =
    | { type: 'loading' }
    | { type: 'fetched', payload: T }
    | { type: 'error', payload: Error }

function useFetch<T = unknown>(url: string, options?: RequestInit): State<T> {
    const cache = useRef<Cache<T>>({})

    const cancelRequest = useRef<boolean>(false)

    const initialState: State<T> = {
        data: undefined,
        error: undefined
    }

    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
            case 'loading':
                return {...initialState}
            case 'fetched':
                return {...initialState, data: action.payload}
            case 'error':
                return {...initialState, error: action.payload}
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        cancelRequest.current = false;

        if (cache.current[url]) {
            dispatch({
                type: 'fetched',
                payload: cache.current[url]
            })
            return
        }
        const fetchData = async () => {
            dispatch({
                type: 'loading'
            })

            try {
                const res = await fetch(url, options)

                if (!res.ok) {
                    throw new Error(res.statusText)
                }

                const data = await res.json() as T

                if (cancelRequest.current) return

                cache.current[url] = data

                dispatch({
                    type: 'fetched',
                    payload: data
                })
            }
            catch (e) {
                dispatch({
                    type: 'error',
                    payload: e as Error
                })
            }

        }

        void fetchData()

        return () => {
            cancelRequest.current = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    return state
}

export default useFetch