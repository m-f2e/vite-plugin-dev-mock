import type { IncomingMessage, ServerResponse } from 'http'

export interface UserOptions {
  entry?: string // 入口文件
}

export interface MockRoute {
  url: string,
  type: string,
  response: (req: IncomingMessage, res: MockServerResponse) => void
}

export interface MockHandlerRoute {
  path: string,
  method: string,
  handler: (req: IncomingMessage, res: MockServerResponse) => void
}

export interface MockServerResponse extends ServerResponse {
  send: (body: object) => void
}