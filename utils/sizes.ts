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

export const calcHeight = (px: number) => {
	return heightPixelRatio(convertHeightPixelsToPercent(px));
};
export const calcWidth = (px: number) =>
	widthPixelRatio(convertWidthPixelsToPercent(px));
export const calcSize = (px: number) =>
	deviceWidth < deviceHeight ? calcWidth(px) : calcHeight(px);

export const moderateScale = (px: number, factor: number = 0.5) => {
	const scaledSize = calcWidth(px);
	return px + (scaledSize - px) * factor;
};

export const moderateVerticalScale = (px: number, factor: number = 0.5) => {
	const scaledSize = calcHeight(px);
	return px + (scaledSize - px) * factor;
};

export const calcFontSize = (size: number) => size * fontScale;
