// Классы семейства шрифтов 'fontFamilyClasses'
export const fontFamilyClasses = [
	'kumbh-sans',
	'roboto',
	'inter',
] as const;

export type FontFamiliesClasses = (typeof fontFamilyClasses)[number];

//Тип опции 'OptionType'
export type OptionType = {
	title: string;    //то что видит человек
	value: string;    //значение то что вставляем
	className: string;  // класс scss
	optionClassName?: string; //Имя класса опции
};

//Опции семейства шрифтов 'fontFamilyOptions'

export const fontFamilyOptions: OptionType[] & {
	optionClassName?: FontFamiliesClasses;
} = [
	{ title: 'Kumbh Sans', 
    value: 'Kumbh Sans', 
    className: fontFamilyClasses[0] },

	{ title: 'Roboto',
     value: 'Roboto', 
     className: fontFamilyClasses[1] },
	{
		title: 'Inter',
		value: 'Inter',
		className: fontFamilyClasses[2],
	},
];

//Цвета шрифтов
export const fontColors: OptionType[] = [
	{
		title: 'Черный',
		value: '#000000',
		className: 'font-black',
		optionClassName: 'option-black',
	},
	{
		title: 'Фиолетовый',
		value: '#70587aff',
		className: 'dusty-purple',
		optionClassName: 'option-purple',
	},
	{
		title: 'Оливковый',
		value: '#3f4d36',
		className: 'dark-olive-green',
		optionClassName: 'option-olive',
	},
	{
		title: 'Зелёно-серый',
		value: '#283224',
		className: 'green-grey',
		optionClassName: 'option-green-grey',
	},
];

//цвет фона

export const backgroundColors: OptionType[] = [
	{
		title: 'Белый',
		value: '#FFFFFF',
		className: 'bg-white',
		optionClassName: 'option-white',
	},
	{
		title: 'Бледный оливковый',
		value: '#c9cea5ff',
		className: 'pale-olive',
		optionClassName: 'option-pale-olive',
	},
	{
		title: 'Мятный кремовый',
		value: '#c8f1e4',
		className: 'mint-cream',
		optionClassName: 'option-mint-cream',
	},
	{
		title: 'Пастельно-лавандовый',
		value: '#d7c3d7',
		className: 'pastel-lavender',
		optionClassName: 'option-pastel-lavender',
	},
];

//hover акцентный при наведении
export const backgroundColorsHover: OptionType[] = [
	{
		title: 'Ярко-лимонный',
		value: '#f8db48ff',
		className: 'bright-lemon',
		optionClassName: 'option-bright-lemon',
	},
];

//ширина экрана
// Desktop (широкий экран): 1200–1440px
// Tablet (средний): 768–1024px
// Mobile (узкий): до 390–600px
export const contentWidthArr: OptionType[] = [
  {
    title: 'Широкий',
    value: '1394px',
    className: 'width-wide',
    optionClassName: 'option-wide',
  },
  {
    title: 'Средний',
    value: '1140px',
    className: 'width-medium',
    optionClassName: 'option-medium',
  },
  {
    title: 'Узкий',
    value: '948px',
    className: 'width-narrow',
    optionClassName: 'option-narrow',
  },
  {
    title: 'Мобильный',
    value: '100%', // на мобильных лучше растягивать на всю ширину
    className: 'width-mobile',
    optionClassName: 'option-mobile',
  },
];

//размер шрифта
export const fontSizeOptions: OptionType[] = [
	{ title: '14px', value: '14px', className: 'font-size-14' },
	{ title: '16px', value: '16px', className: 'font-size-16' },
	{ title: '20px', value: '20px', className: 'font-size-20' },
	{ title: '23px', value: '23px', className: 'font-size-23' },
	{ title: '32px', value: '32px', className: 'font-size-32' },
];


//начально состояние
export const defaultArticleState = {
  fontFamilyOption: fontFamilyOptions[0], // шрифт: берём первый вариант из массива fontFamilyOptions (например Open Sans)
  fontColor: fontColors[0],               // цвет текста: первый элемент из fontColors (например чёрный)
  backgroundColor: backgroundColors[0],   // фон: первый элемент из backgroundColors (например белый)
  contentWidth: contentWidthArr[0],       // ширина: первый элемент из contentWidthArr (например широкий контейнер)
  fontSizeOption: fontSizeOptions[0],     // размер шрифта: первый элемент из fontSizeOptions (например 18px)
};


// Тип состояния статьи: автоматически выводится на основе объекта defaultArticleState
export type ArticleStateType = typeof defaultArticleState;
