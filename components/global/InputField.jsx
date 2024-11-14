
function InputField({ label, type, placeholder="", value, onChange }) {
  return (
    <div>
        <p className="pl-[10px] text-gray-500">{label}</p>
        <div className="flex">
          {type === "phone" && <p className="border border-gray-300 p-2 rounded-md">+2519</p>}
          <input type={type === "phone" ? "number" : type} value={value} onChange={onChange} minLength={type === "phone" ? 8 : undefined} maxLength={type === "phone" ? 8 : undefined} className="w-full border border-gray-300 rounded-md p-2" placeholder={placeholder} />
        </div>
    </div>
  )
}

export default InputField