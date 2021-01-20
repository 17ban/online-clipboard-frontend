import './styles/style.css'

import { getText, postText, getStatus } from './api'

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
  let res = await postText(textInput.value)
  keyInput.value = res.key
})

listen('#get-btn', 'click', async () => {
  let key = keyInput.value
  let res = await getText(key)
  textInput.value = res.text
})

listen('#status-btn', 'click', async () => {
  textInput.value = ''
  keyInput.value = ''
  let res = await getStatus()
  textInput.value = JSON.stringify(res, undefined, 2)
})
