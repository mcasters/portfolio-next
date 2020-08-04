import { useEffect, useState } from 'react';
import { canUseDom } from '../../../tools/windowUtils';

function useOnSrr() {
  const [onSsr, setOnSsr] = useState(true);

  useEffect(() => {
    if (canUseDom()) setOnSsr(false);
  }, [onSsr]);

  // Second tab arg make effect act only if this arg has changed
  // if empty tab, effect will happen only once

  return onSsr;
}

export default useOnSrr;
