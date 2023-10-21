import { JSX } from 'preact'
import { TalkCharacter } from '../../model/TalkModels'

export const CharAvatar = ({ character, ...other }: { character: TalkCharacter }): JSX.Element => {
  return (
    <img
      class='rounded-full w-12 h-12'
      title={character.name}
      alt={character.name}
      src={character.avatarUrl}
      {...other}
    />
  )
}
