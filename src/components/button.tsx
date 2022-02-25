export enum ButtonType {
  Primary,
  Secondary
}

export enum ButtonStyle {
  Flat,
  Gradient = 1
}

type ButtonDetails = {
  type?: ButtonType,
  style?: ButtonStyle,
  value: string
}
export default ({ type, value }: ButtonDetails) =>
  <a className={`inline-flex items-center justify-center ${type == ButtonType.Primary ? 'bg-purple-2 text-white hover:bg-white hover:text-purple-2' : 'bg-white text-purple-2 hover:bg-purple-2 hover:text-white'} px-5 py-3 text-base font-medium rounded-md`}>
    {value}
  </a>
