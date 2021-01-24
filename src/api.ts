interface BaseRes {
  status: string,
  msg: string
}
interface SuccessRes extends BaseRes {
  status: 'OK'
}
export interface FailRes extends BaseRes {
  status: 'FAIL' | 'ERROR' | 'REJECT'
}


interface SuccessGetTextRes extends SuccessRes {
  text: string
}
interface FailGetTextRes extends FailRes {
}
type GetTextRes = SuccessGetTextRes | FailGetTextRes


interface SuccessPostTextRes extends SuccessRes {
  key: string,
  exp: number
}
interface FailPostTextRes extends FailRes {
}
type PostTextRes = SuccessPostTextRes | FailPostTextRes


type DeleteTextRes = SuccessRes | FailRes


interface GetStatusRes extends SuccessRes {
  maxTimeout: number,
  maxTextAmount: number,
  totalTextAmount: number,
  totalTextLength: number
}



export async function getText(key: string) {
  let res = await fetch(`/api/text?key=${key}`)
  return { res, jsonPromise: <Promise<GetTextRes>>(res.json()) }
}

export async function deleteText(key: string) {
  let res = await fetch(`/api/text?key=${key}`, {
    method: 'DELETE'
  })
  return { res, jsonPromise: <Promise<DeleteTextRes>>(res.json()) }
}

export async function postText(text: string, timeout?: number) {
  let res = await fetch(`/api/text`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      text,
      timeout
    })
  })
  return { res, jsonPromise: <Promise<PostTextRes>>(res.json()) }
}


export async function getStatus() {
  let res = await fetch('/api/status')
  return { res, jsonPromise: <Promise<GetStatusRes>>(res.json()) }
}
