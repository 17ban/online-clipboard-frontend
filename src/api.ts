export interface ResObj{
  status: string
}

export interface GetTextResObj extends ResObj {
  text?: string
}

export interface PostTextResObj extends ResObj {
  key?: string,
  exp?: number
}

export interface StatusTextResObj extends ResObj {
  maxTimeout: number,
  maxTextAmount: number,
  totalTextAmount: number,
  totalTextLength: string
}


export async function getText(key: string) {
  let res = await fetch(`/text?key=${key}`)
  return { res, jsonPromise: <Promise<GetTextResObj>>(res.json()) }
}


export async function postText(text: string, timeout?: number) {
  let res = await fetch(`/text`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      text,
      timeout
    })
  })
  return { res, jsonPromise: <Promise<PostTextResObj>>(res.json()) }
}


export async function getStatus() {
  let res = await fetch('/status')
  return { res, jsonPromise: <Promise<StatusTextResObj>>(res.json()) }
}