import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction } from 'react'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from './cs/CSText'
import CountControl from './CountControl'

interface TProps {
  sogogiQuantity: number
  setSogotiQuantity: Dispatch<SetStateAction<number>>
  gomtangQuantity: number
  setGotangQuantity: Dispatch<SetStateAction<number>>
}

const MenuControl = ({
  sogogiQuantity,
  setSogotiQuantity,
  gomtangQuantity,
  setGotangQuantity,
}: TProps) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  const MENU_ITEMS = ['한우소고기국밥', '한우 곰탕']
  return (
    <div css={{ marginTop: `${getSize(12)}px` }}>
      {MENU_ITEMS.map((item, index) => (
        <div
          key={index}
          css={[
            menuBox,
            {
              borderTop: `${index === 0 && 'solid 1px #ececec'}`,
              borderLeft: 'solid 1px #ececec',
              borderRight: 'solid 1px #ececec',
              borderBottom: 'solid 1px #ececec',
            },
          ]}
        >
          <div css={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <CSText
              size={14}
              fontFamily={'PretendardRegular'}
              color={'#000'}
              lineHeight={1.14}
            >
              {item}
            </CSText>
            <CountControl
              quantity={index === 0 ? sogogiQuantity : gomtangQuantity}
              setQuantity={index === 0 ? setSogotiQuantity : setGotangQuantity}
            />
          </div>
          <CSText
            size={16}
            fontFamily={'PretendardRegular'}
            color={'#000'}
            lineHeight={1.18}
          >
            10,000원
          </CSText>
        </div>
      ))}
    </div>
  )
}

const menuBox = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`
export default MenuControl
