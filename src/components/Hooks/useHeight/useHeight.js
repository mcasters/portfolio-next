import {useState, useCallback, useEffect} from 'react';
import { getClientHeight } from '../../../tools/windowUtils';

function useHeight() {
  const [height, setHeight] = useState(0);

    const ref = useCallback(node => {
        setHeight(getClientHeight(node));
        console.log('coucou');
    }, [height]);

  return [height, ref];
}

export default useHeight;
