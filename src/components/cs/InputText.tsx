import React, { Dispatch, SetStateAction } from 'react'
import { css } from '@emotion/react'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import { isEmpty } from 'lodash'

interface Props {
  name: string
  inputText?: string
  setInputText: Dispatch<SetStateAction<string>>
  placeholder: string
  disabled?: boolean
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  signUpCertification?: boolean
}

const InputText = ({
  name,
  placeholder,
  inputText,
  setInputText,
  disabled = false,
  marginTop,
  signUpCertification,
}: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  return (
    <input
      css={[
        input,
        {
          width: signUpCertification ? `${getSize(214)}px` : '100%',
          height: `${getSize(46)}px`,
          paddingLeft: `${getSize(20)}px`,
          border: `solid 1px ${isEmpty(inputText) ? '#ececec' : '#000'} `,
          marginTop: marginTop ? `${getSize(marginTop)}px` : 0,
          borderRadius: `${getSize(4)}px`,
        },
      ]}
      name={name}
      value={inputText}
      placeholder={placeholder}
      onChange={(e) => setInputText(e.target.value)}
      disabled={disabled}
    />
  )
}

const input = css`
  outline: none;
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 1.14;
  &::placeholder {
    font-size: 14px;
    font-family: 'PretendardRegular';
    color: #bebebe;
  }
`

export default InputText
