import { createDirectus, rest, graphql } from '@directus/sdk';

class Client {
  static clientRest = null
  static clientGraphQl = null
  static baseUrl = 'http://localhost:8055'

  static getClientRest() {
    if (this.clientRest) return this.clientRest
    this.clientRest = createDirectus(this.baseUrl).with(rest())
    return this.clientRest
  }

  static getClientGraphQl() {
    if (clientGraphQl) return clientGraphQl
    clientGraphQl = createDirectus(baseUrl).with(graphql())
    return clientGraphQl
  }
}

export default new Client();