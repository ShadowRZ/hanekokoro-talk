export interface TalkItem {
  characterIdx: number
  charGroup?: number
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

export interface TalkGroup {
  name: string
  characterIdxs: number[]
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
  avatarUrl: 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="24" height="24" viewBox="0 0 24 24" style="background-color: %23d1d5db"%3E%3Cpath fill="%236b7280" fill-rule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10Zm-7-3a3 3 0 1 1-6 0a3 3 0 0 1 6 0Zm-3 11.5a8.46 8.46 0 0 0 4.807-1.489c.604-.415.862-1.205.51-1.848C16.59 15.83 15.09 15 12 15c-3.09 0-4.59.83-5.318 2.163c-.351.643-.093 1.433.511 1.848A8.46 8.46 0 0 0 12 20.5Z" clip-rule="evenodd"%2F%3E%3C%2Fsvg%3E',
  isNarrator: true
}
