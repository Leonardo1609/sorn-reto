import { FormEvent, useState, ChangeEvent, useEffect } from "react";


export const useForm = ( initialValues = {}, fnValidation: Function, fnSubmit: Function  ) => {

    const [ formValues, setFormValues ] = useState( initialValues );
    const [ errors, setErrors ]         = useState<any>({});
    const [ submit, setSubmit ]         = useState<boolean>( false );

    useEffect(() => {
        if( Object.keys( errors ).length === 0 && submit ){
            fnSubmit();
        }
        // eslint-disable-next-line
    }, [ errors, submit ])

    const reset = ( newFormValues = {} ) => {
        setFormValues( newFormValues );
    }

    const handleChange = ( { target }: ChangeEvent<HTMLInputElement> ) => {
        setFormValues( ( state: any ) => ({ 
            ...state,
            [ target.name ]:  target.value
        }));
    }

    const handleSubmit = ( e: FormEvent ) => {
        e.preventDefault();
        setErrors( fnValidation( formValues ) );
        setSubmit( true );
    }

    return { 
        formValues,
        errors,
        handleChange,
        handleSubmit,
        reset
    };
}
