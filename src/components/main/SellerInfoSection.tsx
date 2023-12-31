import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import React from 'react'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'

const SellerInfoSection = () => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const list = [
    { title: '상호', content: '공릉동 한우소고기 국밥' },
    { title: '매장주소', content: '서울 노원구 동일로192길 42' },
    { title: '전화번호', content: '070-5421-5644' },
    { title: '사업자등록 번호', content: '000-0000-000000' },
    { title: '통신판매업등록 번호', content: '000-0000-000000' },
    { title: '즉석판매제조가공업\n등록번호', content: '000-0000-000000' },
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
        {'판매자정보'}
      </CSText>
      <table css={[table, { margin: `${getSize(21)}px 0 ${getSize(30)}px 0` }]}>
        <tbody>
          {list.map(({ title, content }, index) => (
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
                  {title}
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
                  {content}
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
export default SellerInfoSection
