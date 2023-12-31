import Button from '@components/cs/Button'
import React from 'react'
import Divider from '@mui/material/Divider'
import { useRouter } from 'next/router'
import { auth } from 'src/firebase/initFirebase'
import { signOut } from 'firebase/auth'
import { isEmpty } from 'lodash'
import { RootState, useAppSelector } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import { css } from '@emotion/react'
import AutoSizeImage from '@components/cs/AutoSizeImage'

interface Props {
  uid: string
  name: string
}

const DrawerList = ({ uid, name }: Props) => {
  const router = useRouter()

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }

  const handleLogout = () => {
    signOut(auth)
    window.location.replace('/')
  }

  const handleMyOrder = () => {
    router.push(`/orderDetail?uid=${uid}`)
  }

  return (
    <div
      css={{
        width: `${getSize(240)}px`,
      }}
    >
      <div
        css={[
          content,
          {
            height: `${getSize(71)}px`,
            padding: `0 ${getSize(20)}px`,
          },
        ]}
      >
        <div css={{ marginTop: `${getSize(30)}px` }}>
          <AutoSizeImage
            src={'/images/ico_my@3x.png'}
            width={getSize(20)}
            height={getSize(20)}
          />
        </div>
        <div onClick={() => router.push('/signIn')}>
          <CSText
            size={15}
            fontFamily={'PretendardRegular'}
            color={'#3e3737'}
            lineHeight={1.25}
            marginTop={32}
            marginLeft={10}
            marginRight={26}
          >
            {isEmpty(name) ? '로그인 하기' : name}
          </CSText>
        </div>

        {isEmpty(name) && (
          <div css={{ marginTop: `${getSize(26)}px` }}>
            <Button
              onClick={() => router.push('/signUp')}
              btnWidth={80}
              btnHeight={30}
              backgroundColor={'#000'}
              fontColor={'#fff'}
              fontSize={13}
              borderRadius={4}
            >
              <CSText
                size={13}
                fontFamily={'PretendardRegular'}
                color={'#fff'}
                lineHeight={1.54}
              >
                {'회원가입'}
              </CSText>
            </Button>
          </div>
        )}
      </div>

      <Divider />
      <div
        onClick={handleMyOrder}
        css={[
          content,
          {
            height: `${getSize(58)}px`,
            padding: `0 ${getSize(20)}px`,
          },
        ]}
      >
        <div css={{ marginTop: `${getSize(20)}px` }}>
          <AutoSizeImage
            src={'/images/ico_list@3x.png'}
            width={getSize(18)}
            height={getSize(20)}
          />
        </div>

        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.25}
          marginTop={20}
          marginLeft={10}
          marginRight={26}
        >
          {'주문 내역'}
        </CSText>
      </div>
      <Divider />

      <div
        onClick={() => router.push('/admin')}
        css={[
          content,
          {
            height: `${getSize(58)}px`,
            padding: `0 ${getSize(20)}px`,
          },
        ]}
      >
        <div css={{ marginTop: `${getSize(20)}px` }}>
          <AutoSizeImage
            src={'/images/ico_setting@3x.png'}
            width={getSize(19)}
            height={getSize(20)}
          />
        </div>

        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.25}
          marginTop={20}
          marginLeft={10}
          marginRight={26}
        >
          {'관리자'}
        </CSText>
      </div>
      <Divider />
      <div
        css={{
          width: '100%',
          justifyContent: 'center',
          display: 'flex',
          position: 'absolute',
          bottom: `${getSize(30)}px`,
        }}
        onClick={handleLogout}
      >
        <CSText
          size={15}
          fontFamily={'PretendardRegular'}
          color={'#3e3737'}
          lineHeight={1.33}
          textDecoration={'underline'}
        >
          {'로그아웃'}
        </CSText>
      </div>
    </div>
  )
}

const content = css`
  width: 100%;
  display: flex;
`

export default DrawerList
