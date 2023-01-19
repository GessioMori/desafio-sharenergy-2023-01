export const InputError: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="text-red-400 text-sm font-medium text-right" role="alert">
      {error}
    </div>
  );
};
