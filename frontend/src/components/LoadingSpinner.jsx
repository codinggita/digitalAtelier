export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div
        className={`${sizeClasses[size]} border-gray-200 border-t-primary rounded-full animate-spin`}
      ></div>
      {text && (
        <p className="text-sm text-gray-500 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
}
