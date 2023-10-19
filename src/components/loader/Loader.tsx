import { Loader2 } from 'lucide-react';
import './Loader.scss';
import clsx from 'clsx';

export interface LoaderProps {}

function Loader(props?: LoaderProps) {
    return (
        <div className={clsx('loader')}>
            <Loader2 />
        </div>
        
    )
}

export default Loader;