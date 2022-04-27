import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "./debounce";

export const useAutoSaveFields = <Values extends Record<string, unknown>>(
  initialValues: Values,
  autosaveFn: (values: Values) => void,
  deps: [] | undefined = []
) => {
  const [values, setValues] = useState(initialValues);
  const [canSave, setCanSave] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setValues((v) => ({ ...v, [name]: value }));
      setCanSave(true);
    },
    []
  );

  const handleChangeExplicit = useCallback(
    (field: { name: string; value: unknown }) => {
      const { name, value } = field;
      setValues((v) => ({ ...v, [name]: value }));
      setCanSave(true);
    },
    []
  );

  const names = Object.entries(initialValues).reduce((acc, [name]) => {
    return { ...acc, [name]: name };
  }, {} as { [k in keyof Values]: k });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const autoSaveDebounced = useMemo(() => debounce(autosaveFn, 500), [...deps]);

  useEffect(() => {
    if (canSave) {
      autoSaveDebounced(values);
      setCanSave(false);
    }
  }, [autoSaveDebounced, canSave, values]);

  return {
    names,
    values,
    handleChange,
    handleChangeExplicit,
  };
};
