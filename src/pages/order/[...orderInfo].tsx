import InputText from '@components/cs/InputText'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import nookies from 'nookies'
import PayMents from '../payments'
import MainHeader from '@components/cs/MainHeader'
import { useAppSelector, RootState } from 'src/store'
import { toSize } from 'styles/globalStyle'
import CSText from '@components/cs/CSText'
import Line from '@components/cs/Line'
import { isEmpty } from 'lodash'
import ErrorMessage from '@components/Error'
import { nameValidation, phoneValidation } from 'src/function/vaildation'
import Button from '@components/cs/Button'
import AutoSizeImage from '@components/cs/AutoSizeImage'
import PostModal from '@components/modal/PostModal'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const user = nookies.get(ctx)
    const res = await fetch(
      `https://www.koreanbeefricesoup.com/api/get-oneUserInfo?id=${user.uid}`
    )
    let data = await res.json()
    data.uid = user.uid
    return {
      props: { data },
    }
  } catch (err) {
    console.log(err)

    ctx.res.writeHead(302, { Location: '/signIn' })
    ctx.res.end()

    return { props: {} as never }
  }
}

const Order = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )
  const getSize = (input: number) => {
    return toSize(width, height, input)
  }
  const [name, setName] = useState<string>(data.items.name ?? '')
  const [phoneNumber, setPhoneNumber] = useState<string>(
    data.items.phoneNumber ?? ''
  )
  const [address, setAddress] = useState<string>(data.items.address ?? '')
  const [addressDetail, setAddressDetail] = useState<string>(
    data.items.addressDetail ?? ''
  )
  const [postCode, setPostCode] = useState<string>(data.items.postCode ?? '')
  const [carrierRequest, setCarrierRequest] = useState<string>('')

  const [selectPayMethod, setSelectPayMethod] = useState<string>('카드 결제')

  const [postVisible, setPostVisible] = useState<boolean>(false)
  const { orderInfo } = router.query

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setPostVisible(true)
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      setAddress(data.address)
      setPostCode(data.zonecode)
      setPostVisible(false)
    },
  }

  const product = [
    { title: '상품명', content: orderInfo && orderInfo[0] },
    { title: '수량', content: `${orderInfo && orderInfo[1]}개` },
    {
      title: '제품가격',
      content: `${Number(orderInfo && orderInfo[1]) * 11000}원`,
    },
    { title: '배송비', content: '3000원' },
  ]

  const payMethod = ['카드 결제', '계좌 이체', '에스크로 결제']
  return (
    <div css={container}>
      <MainHeader windowWidth={width} windowHeight={height} uid={''} />
      <div css={{ padding: `0 ${getSize(20)}px` }}>
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#000'}
          lineHeight={1.22}
          marginTop={20}
          marginBottom={5}
        >
          {'주문 상품'}
        </CSText>
        {product.map(({ title, content }, index) => {
          return (
            <div
              key={index}
              css={[orderProduct, { marginTop: `${getSize(15)}px` }]}
            >
              <CSText
                size={15}
                fontFamily={'PretendardRegular'}
                color={'#8b8b8b'}
                lineHeight={1.2}
                marginBottom={5}
              >
                {title}
              </CSText>

              <CSText
                size={15}
                fontFamily={'PretendardBold'}
                color={'#000'}
                lineHeight={1.2}
                marginBottom={5}
              >
                {content}
              </CSText>
            </div>
          )
        })}
        <div
          css={[
            totalPrice,
            {
              marginTop: `${getSize(15)}px`,
              paddingTop: `${getSize(15)}px`,
              paddingBottom: `${getSize(20)}px`,
            },
          ]}
        >
          <CSText
            size={15}
            fontFamily={'PretendardRegular'}
            color={'#8b8b8b'}
            lineHeight={1.2}
            marginBottom={5}
          >
            {'총 가격'}
          </CSText>

          <CSText
            size={15}
            fontFamily={'PretendardBold'}
            color={'#000'}
            lineHeight={1.2}
            marginBottom={5}
          >
            {Number(orderInfo && orderInfo[1]) * 11000 + 3000}원
          </CSText>
        </div>
      </div>
      <Line backgroundColor={'#f6f6f6'} />
      <div
        css={{
          padding: `0 ${getSize(20)}px`,
          marginBottom: `${getSize(51)}px`,
        }}
      >
        <CSText
          size={15}
          fontFamily={'PretendardBold'}
          color={'#000'}
          lineHeight={1.22}
          marginTop={20}
          marginBottom={5}
        >
          {'받는 사람'}
        </CSText>
        <CSText
          size={13}
          fontFamily={'PretendardRegular'}
          color={'#000'}
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'이름'}
        </CSText>
        <InputText
          name="name"
          placeholder="이름을 입력해주세요."
          setInputText={setName}
          inputText={name}
        />
        {!isEmpty(name) && !nameValidation(name) && (
          <ErrorMessage message={'2-4 글자의 이름을 입력해주세요.'} />
        )}
        <CSText
          size={13}
          fontFamily={'PretendardRegular'}
          color={'#000'}
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'휴대폰 번호'}
        </CSText>
        <InputText
          name="name"
          placeholder="이름을 입력해주세요."
          setInputText={setPhoneNumber}
          inputText={phoneNumber}
        />
        {!isEmpty(phoneNumber) && !phoneValidation(phoneNumber) && (
          <ErrorMessage message={'올바른 번호를 입력해주세요'} />
        )}
        <CSText
          size={13}
          fontFamily={'PretendardRegular'}
          color={'#000'}
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'주소'}
        </CSText>
        <div css={findAddress}>
          <InputText
            name="postCode"
            placeholder="우편 번호"
            setInputText={setPostCode}
            inputText={postCode}
            signUpCertification
          />

          <Button
            onClick={handle.clickButton}
            btnWidth={100}
            btnHeight={46}
            backgroundColor={'#fff'}
            fontColor={'#000'}
            fontSize={14}
            borderRadius={4}
          >
            {'주소 찾기'}
          </Button>
        </div>
        {!isEmpty(phoneNumber) && !phoneValidation(phoneNumber) && (
          <ErrorMessage message={'올바른 번호를 입력해주세요'} />
        )}
        <InputText
          name="address"
          placeholder=""
          setInputText={setAddress}
          inputText={address}
          marginTop={10}
        />
        <InputText
          name="addressDetail"
          placeholder="상세 주소"
          setInputText={setAddressDetail}
          inputText={addressDetail}
          marginTop={10}
        />
        <CSText
          size={13}
          fontFamily={'PretendardRegular'}
          color={'#000'}
          marginTop={30}
          marginBottom={8}
          lineHeight={1.15}
        >
          {'배송시 요청사항'}
        </CSText>
        <InputText
          name="carrierRequest"
          placeholder="배송시 요청사항을 입력해주세요."
          setInputText={setCarrierRequest}
          inputText={carrierRequest}
        />
        <CSText
          size={13}
          fontFamily={'PretendardRegular'}
          color={'#000'}
          marginTop={30}
          lineHeight={1.15}
        >
          {'결제 방식 선택'}
        </CSText>
        {payMethod.map((value, index) => {
          return (
            <div
              key={index}
              onClick={() => setSelectPayMethod(value)}
              css={[
                pay,
                {
                  marginTop: `${getSize(14)}px`,
                },
              ]}
            >
              {selectPayMethod === value ? (
                <AutoSizeImage
                  src="/images/btn_radio_on@3x.png"
                  width={getSize(18)}
                  height={getSize(18)}
                />
              ) : (
                <AutoSizeImage
                  src="/images/btn_radio_off@3x.png"
                  width={getSize(18)}
                  height={getSize(18)}
                />
              )}

              <CSText
                size={14}
                fontFamily={'PretendardRegular'}
                color={'#000'}
                lineHeight={1.14}
                marginLeft={12}
              >
                {value}
              </CSText>
            </div>
          )
        })}
      </div>
      {postVisible && (
        <PostModal
          setPostVisible={setPostVisible}
          setAddress={setAddress}
          setPostCode={setPostCode}
        />
      )}

      <PayMents
        uid={data.uid}
        menu={'한우 소고기 국밥'}
        quantity={String(orderInfo && orderInfo[1])}
        totalPrice={Number(orderInfo && orderInfo[1]) * 11000 + 3000}
        name={name}
        phoneNumber={phoneNumber}
        address={address}
        addressDetail={addressDetail}
        postCode={postCode}
      />
    </div>
  )
}

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`
const orderProduct = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const totalPrice = css`
  border-top: solid 1px #ececec;
  display: flex;
  justify-content: space-between;
`
const findAddress = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const pay = css`
  width: 100%;
  display: flex;
`

export default Order
