import './styles/style.css'

import { getText, postText } from './api'

function listen(
  selectors: string,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  document.querySelector(selectors).addEventListener(type, listener, options)
}

const keyInput = <HTMLInputElement>document.getElementById('key-input')
const textInput = <HTMLInputElement>document.getElementById('text-input')

listen('#post-btn', 'click', async () => {
  let text = textInput.value
  if(text === '') {
    textInput.value = '（请在此输入你要存入的文本）'
    return
  }

  let { res, jsonPromise } = await postText(text)
  let resJson = await jsonPromise
  if(res.ok && resJson.status === 'OK') {
    keyInput.value = resJson.key
  } else {
    alert([
      '存入失败😢\n',
      `失败信息：${ resJson.msg }`,
      `响应状态：${ res.status } ${ res.statusText }`
    ].join('\n'))
  }
})

listen('#get-btn', 'click', async () => {
  let key = keyInput.value
  if(key === '') {
    keyInput.value = '（请在此输入提取码）'
    return
  }

  let { res, jsonPromise } = await getText(key)
  let resJson = await jsonPromise
  if(res.ok && resJson.status === 'OK') {
    textInput.value = resJson.text
  } else {
    alert([
      '取出失败😢\n',
      `失败信息：${ resJson.msg }`,
      `响应状态：${ res.status } ${ res.statusText }`
    ].join('\n'))
  }
})

listen('#copy-key-btn', 'click', () => {
  keyInput.select()
  document.execCommand('copy')
})

listen('#copy-text-btn', 'click', () => {
  textInput.select()
  document.execCommand('copy')
})