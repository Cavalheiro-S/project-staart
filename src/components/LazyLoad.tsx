import React, { lazy } from 'react'

export const LazyLoad = (path: string, name: string) => {
    return lazy(() => (
        import(import.meta.env.VITE_PATH_PAGES + path).then(module => {
            return { default: module[name] }
        })
    ))
}

