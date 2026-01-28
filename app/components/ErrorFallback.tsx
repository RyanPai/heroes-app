export interface ErrorFallbackProps {
  message: string;
}

const ErrorFallback = ({ message}: ErrorFallbackProps) => (
  <div className="flex flex-col items-center gap-3 text-center">
    <p>{message}</p>
  </div>
);

export default ErrorFallback;