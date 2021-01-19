import './style.css'

import { getText, postText, getStatus } from './api'

console.log('Hello, Clip Board.')

async function main() {
  let postRes = await postText('Hello, Clip Board.')
  console.log(postRes)

  if(postRes.status === 'OK') {
    let getRes = await getText(postRes.key)
    console.log(getRes)
  }

  let status = await getStatus()
  console.log(status)
}
main()