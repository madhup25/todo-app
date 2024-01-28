export const Input = ({ label, type, id, placeholder, ...props }) => {
    return (
      <div className="flex flex-col w-full gap-2">
        <div className="flex justify-between">
          <label htmlFor={id} className="font-semibold capitalize">
            {label}
          </label>
        </div>
        <input
          id={id}
          type={type}
          
          placeholder={placeholder}
          {...props}
        />
      </div>
    )
  }