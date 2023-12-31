import React, { ReactNode } from 'react'
import { toSize } from 'styles/globalStyle'
import { RootState, useAppSelector } from 'src/store'

interface Props {
  children: ReactNode
  size: number
  fontFamily: string
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  color?: string
  lineHeight?: number
  textDecoration?: string
}

const CSText = ({
  children,
  size,
  fontFamily,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  color,
  lineHeight,
  textDecoration,
}: Props) => {
  const { width, height } = useAppSelector(
    (state: RootState) => state.windowSize.windowSize
  )

  return (
    <div
      css={[
        {
          fontSize: `${toSize(width, height, size)}px`,
          fontFamily: fontFamily,
          marginTop: marginTop ? `${toSize(width, height, marginTop)}px` : 0,
          marginBottom: marginBottom
            ? `${toSize(width, height, marginBottom)}px`
            : 0,
          marginLeft: marginLeft ? `${toSize(width, height, marginLeft)}px` : 0,
          marginRight: marginRight
            ? `${toSize(width, height, marginRight)}px`
            : 0,
          color: color ? color : '#000',
          lineHeight: lineHeight ? lineHeight : 1,
          textDecoration: textDecoration ? textDecoration : 'none',
        },
      ]}
    >
      {children}
    </div>
  )
}

export default CSText
