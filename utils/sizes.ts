import {Dimensions, PixelRatio} from 'react-native';

//Dimentions
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

// content look the same like on iPhone 16 native values
const baseWidth = 393;
const baseHeight = 852;

const scaleWidth = deviceWidth / baseWidth;
const scaleHeight = deviceHeight / baseHeight;

const fontScale = Math.min(scaleWidth, scaleHeight);

const heightPixelRatio = (amount: number) =>
	PixelRatio.roundToNearestPixel(deviceHeight * amount);
const widthPixelRatio = (amount: number) =>
	PixelRatio.roundToNearestPixel(deviceWidth * amount);

const convertHeightPixelsToPercent = (heightInPx: number) =>
	heightInPx / baseHeight;
const convertWidthPixelsToPercent = (widthInPx: number) =>
	widthInPx / baseWidth;

//scaleWidth
export const s = (px: number) =>
	widthPixelRatio(convertWidthPixelsToPercent(px));

//scaleWidth
export const sv = (px: number) => {
	return heightPixelRatio(convertHeightPixelsToPercent(px));
};

//moderateScale
export const ms = (px: number, factor: number = 0.5) => {
	const scaledSize = s(px);
	return px + (scaledSize - px) * factor;
};

//moderateVerticalScale
export const mvs = (px: number, factor: number = 0.5) => {
	const scaledSize = sv(px);
	return px + (scaledSize - px) * factor;
};

//calcFontSize
export const fs = (size: number) => size * fontScale;
