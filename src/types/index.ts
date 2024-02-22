/**
 * Specifies a named charactor.
 */
export interface Character {
  id: number
  name: string
  desc?: string
  avatarUrl: string
  props?: Record<string, string>
}

export interface Group {
  id: number
  name: string
  desc: string
  avatarUrl?: string
  members: number[]
  props?: Record<string, string>
}

export interface TalkItem {
  charId: number
  nameOverride?: string
  avatarUrl?: string
  narrator: boolean
  timestamp: number
  groupId?: number
  content: Content
}

export interface TalkSession {
  nameOverride?: string
  descOverride?: string
  items: TalkItem[]
}

export interface ContentText {
  type: 'text'
  content: string
}

export interface ContentImage {
  type: 'image'
  contentUrl: string
}

export interface ContentSticker {
  type: 'sticker'
  contentUrl: string
}

export type Content = ContentText | ContentImage | ContentSticker

export type ThemeOptions = 'dark' | 'light' | undefined
