import React, { useCallback } from "react";

type Props<Values> = {
  initialValues: Values;
  onSubmit: (values: Values, clearValues: () => void) => void;
};

export const useForm = <Values>(props: Props<Values>) => {
  const { initialValues, onSubmit } = props;

  const [values, setValues] = React.useState<Values>(initialValues);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
    },
    [values]
  );

  const clearValues = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit(values, clearValues);
    },
    [clearValues, onSubmit, values]
  );

  return {
    handleChange,
    handleSubmit,
    values,
  };
};
