import Button from '@components/cs/Button'
import { css } from '@emotion/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import IconX from '/public/X.svg'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'
import InputText from '@components/cs/InputText'

interface Props {
  setUserModalVisible: Dispatch<SetStateAction<boolean>>
}

const UserModal = ({ setUserModalVisible }: Props) => {
  const [name, setName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  const handleOrder = () => {
    setUserModalVisible(false)
  }

  return (
    <div css={overlay}>
      <div
        css={[
          container,
          {
            padding: `${getSize(50)}px ${getSize(20)}px ${getSize(20)}px`,
            width: `${getSize(300)}px`,
            height: `${getSize(222)}px`,
            borderRadius: `${getSize(12)}px`,
          },
        ]}
      >
        <div
          css={{
            position: 'absolute',
            top: `${getSize(20)}px`,
            right: `${getSize(20)}px`,
          }}
        >
          <IconX onClick={() => setUserModalVisible(false)} />
        </div>
        <div
          css={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <InputText
            name="name"
            placeholder="이름을 입력해주세요."
            setInputText={setName}
            inputText={name}
          />
          <InputText
            name="phoneNumber"
            placeholder="핸드폰 번호를 입력해주세요."
            setInputText={setPhoneNumber}
            inputText={phoneNumber}
          />
        </div>

        <div
          css={[
            btnWrapper,
            {
              width: `calc(100% - ${getSize(40)}px)`,
              marginBottom: `${getSize(20)}px`,
            },
          ]}
        >
          <Button
            onClick={handleOrder}
            btnHeight={46}
            backgroundColor={'#000'}
            fontColor={'#fff'}
            fontSize={14}
            borderRadius={4}
          >
            {'주문하기'}
          </Button>
        </div>
      </div>
    </div>
  )
}

const overlay = css`
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 검은 배경 */
  z-index: 9999; /* 다른 요소들보다 위에 나타나도록 높은 값 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
`
const container = css`
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const btnWrapper = css`
  display: flex;
  position: absolute;
  justify-content: space-between;
  bottom: 0;
`
export default UserModal
