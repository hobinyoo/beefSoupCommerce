import CSSpan from '@components/cs/CSSpan'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const NotationsSection = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const list = [
    '한우소고기',
    '고추가루',
    '우거지',
    '무',
    '양파',
    '대파',
    '사골',
  ]
  return (
    <div
      css={[
        container,
        {
          marginTop: `${getSize(29)}px`,
          padding: `0 ${getSize(20)}px`,
        },
      ]}
    >
      <CSText
        size={16}
        fontFamily={'PretendardBold'}
        color={'#3e3737'}
        lineHeight={1.25}
      >
        {'제품표기사항 '}
        <CSSpan
          size={16}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.25}
        >
          {'(식재료원산지)'}
        </CSSpan>
      </CSText>
      <table css={[table, { margin: `${getSize(21)}px 0 ${getSize(30)}px 0` }]}>
        <tbody>
          {list.map((value, index) => (
            <tr key={index}>
              <td
                css={{
                  width: `${getSize(140)}px`,
                  padding: `${getSize(15)}px`,
                }}
              >
                <CSText
                  size={13}
                  fontFamily={'PretendardBold'}
                  color={'#3e3737'}
                  lineHeight={1.54}
                >
                  {value}
                </CSText>
              </td>
              <td
                css={{
                  padding: `${getSize(15)}px`,
                }}
              >
                <CSText
                  size={13}
                  fontFamily={'PretendardRegular'}
                  color={'#9e9795'}
                  lineHeight={1.54}
                >
                  {'국내산'}
                </CSText>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const container = css`
  width: 100%;
`

const table = css`
  width: 100%;
  border-collapse: collapse;

  td {
    border-right: none;
    border-bottom: 1px solid #dfd6c7;
    background-color: #f2eadd;
  }

  tr:first-of-type td {
    border-top: 1px solid #dfd6c7;
  }

  tr td:last-of-type {
    border-right: none;
    background-color: #fffcf7;
  }
`
export default NotationsSection
