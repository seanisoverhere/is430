import React, { memo, useRef } from "react";
import usePrevious from "@/hooks/usePrevious";
import useIsomorphicEffect from "@/hooks/useIsomorphicEffect";

type SingleInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  focus?: boolean;
};

const SingleInputComponent = ({
  focus,
  autoFocus,
  ...rest
}: SingleInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);

  useIsomorphicEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <input ref={inputRef} {...rest} />;
};

const SingleInput = memo(SingleInputComponent);
export default SingleInput;
