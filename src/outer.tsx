import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import * as antd from 'antd'
import loadable from 'react-loadable'

const errCmp = (text) => <div style={{ height: 100, lineHeight: '100px', textAlign: 'center', color: '#aaa' }} >{text}</div>

const lazyComponent = (prom: Promise<any>, option?: {
    err?: any
    loading?: any
}) => {
    let fail = (option && option.err)?option.err : ()=>errCmp('组件损坏')
    let loading = (option && option.loading)?option.loading:()=>errCmp('loading...')
    return loadable({
        loader: () => new Promise((done, notDone) => {
            // 判断_.default的理由是：_.default为空说明这个异步组件第一次加载异常(通常是组件代码最外级异常)，第二次加载从缓存中取，就是一个空对象，仍旧返回加载错误页面
            prom.then(_ => {
                // @ts-ignore
                if (_ && _.__esModule) {
                    return _.default ? done(_.default) : done(fail)
                } else {
                    return _ ? done(_) : done(fail)
                }
            }).catch(e => {
                console.info('sync component load error', e)
                done(fail)
            });
        }),
        loading: loading,
    })
}

export default {
    React, ReactDOM, moment, antd,
    loadable,
    lazyComponent
}