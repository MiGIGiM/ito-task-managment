import { FC } from "react"

type Props = {
    type: 'submit'
    isPrimary?: boolean
    text: string
} | {
    type: 'button'
    onClick: () => void
    isPrimary?: boolean
    text: string
}

const Button: FC<Props> = ({ type, isPrimary, onClick, text }) => (
  <button
    type={type}
    className={`btn btn-xs sm:btn-sm md:btn-md btn-outline ${isPrimary ? 'btn-primary' : 'btn-secondary'}`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button
