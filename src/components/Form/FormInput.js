import { forwardRef } from 'react';

function FormInput({ type, placeholder, name, ...props }, ref) {
    return <input ref={ref} type={type} placeholder={placeholder} name={name} {...props} />;
}

export default forwardRef(FormInput);
