import { Hint } from "../dashboard/Hint"
import { Input } from "../ui/input"

function InputField({ label, type, placeholder="", value, onChange, optional=false, name="", disabled=false, hint="", className="" }) {
  return (
    <div className={className}>
        <div className="flex items-center gap-2">
          <p className="pl-[10px] text-gray-500">{label}</p>
          {optional && (<p className="text-gray-300 text-sm">(optional)</p>)}
          {hint && (<Hint description={hint}/>)}
        </div>
        <div className="flex">
          {type === "phone" && <p className="border border-gray-300 p-2 rounded-md">+2519</p>}
          <Input disabled={disabled} className="w-full" type={type === "phone" ? "number" : type} value={value} name={name} onChange={onChange} minLength={type === "phone" ? 8 : undefined} maxLength={type === "phone" ? 8 : undefined} placeholder={placeholder} />
        </div>
    </div>
  )
}

export default InputField