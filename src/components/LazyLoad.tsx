import React, { lazy } from 'react'

export const LazyLoad = (path: string, name: string) => {
    return lazy(() => (
        import(`../pages/${path}`).then(module => {
            return { default: module[name] }
        })
    ))
}

