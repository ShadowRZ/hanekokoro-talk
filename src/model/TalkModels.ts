import defaultAvatar from '../assets/default-user-avatar.svg?inline'

export interface TalkItem {
  characterIdx: number
  nameOverride?: string
  message: TalkContent
}

/**
 * Specifies a named charactor.
 */
export interface TalkCharacter {
  name: string
  avatarUrl: string
  isNarrator: boolean
}

export interface TalkContentText {
  type: 'text'
  content: string
}

export interface TalkContentImage {
  type: 'image'
  contentUrl: string
}

export interface TalkContentSticker {
  type: 'sticker'
  contentUrl: string
}

export type TalkContent = TalkContentText | TalkContentImage | TalkContentSticker

export const TALK_NARRATOR: TalkCharacter = {
  name: '[Narrator]',
  avatarUrl: defaultAvatar,
  isNarrator: true
}
