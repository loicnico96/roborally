import { ErrorComponentProps } from "./ErrorBoundary"

const PageError = ({ error }: ErrorComponentProps) => error.message

export default PageError
