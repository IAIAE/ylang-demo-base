import React from 'react'
import { Button } from 'antd'
import { loadChunk } from 'ylang-runtime'
const css = require('./app.less')
import outer from './outer'
let { lazyComponent } = outer

export type Props = {

}

export default class App extends React.Component<Props, any>{
    constructor(props) {
        super(props)
        this.state = {
            page1: null
        }
    }
    onclick = (e) => {
        // 加载从现网拉取组件资源并封装成一个异步组件
        let Page1 = lazyComponent(loadChunk({
            url: '/page1.chunk-1d82f9fbf8.js',
            cssurl: '/page1.sand.d03e91aa76.css',
            module: 'page1',
        }).then(_ => {
            if (_.ret == 0) return _.data
            console.info('load error ', _.data)
            return null
        }))
        this.setState({
            page1: Page1,
            page1text: '',
            basetext: '',
        })
    }
    render() {
        let Page1 = this.state.page1;
        return <div className={css.root}>
            <div className={css.title}>hello ylang</div>
            <div className={css.container}>
                <div style={{ marginBottom: 10 }}>
                    <Button type="primary" onClick={this.onclick} >点击加载外部组件</Button>
                    <span style={{ marginLeft: 30 }}>{this.state.page1text}</span>
                </div>
            </div>
            <div className={css.container}>
                {Page1 && <Page1 onClick={_ => this.setState({
                    basetext: 'hello from base',
                    page1text: _,
                })} text={this.state.basetext} />}
            </div>
        </div>
    }
}