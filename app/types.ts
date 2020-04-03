export type User = {
  avatar: string
  githubName: string
  id: string
  name: string
}

export enum UserList {
  ACTIVE = 'activeUsers',
  INACTIVE = 'inactiveUsers'
}

export enum LanguageValue {
  SV = 'sv',
  EN = 'en'
}
