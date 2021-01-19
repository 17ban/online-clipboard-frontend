interface ResObj{
  status: string
}

interface GetTextResObj extends ResObj {
  text?: string
}

interface PostTextResObj extends ResObj {
  key?: string,
  exp?: number
}

interface StatusTextResObj extends ResObj {
  maxTimeout: number,
  maxTextAmount: number,
  totalTextAmount: number,
  totalTextLength: string
}


export async function getText(key: string) {
  let res = await fetch(`/text?key=${key}`)
  return <Promise<GetTextResObj>>(res.json())
}


export async function postText(text: string, timeout?: number) {
  let res = await fetch(`/text`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      text,
      timeout
    })
  })
  return <Promise<PostTextResObj>>(res.json())
}


export async function getStatus() {
  let res = await fetch('/status')
  return <Promise<StatusTextResObj>>(res.json())
}