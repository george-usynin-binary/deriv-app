import React from 'react';
import './ProgressBar.scss';

type TProps = {
    is_transition?: boolean;
    active_index: number;
    indexes: Array<number>;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ProgressBar: React.FC<TProps> = ({ is_transition = 'true', active_index, indexes, setActiveIndex }) => {
    return (
        <div className='wallets-progress-bar'>
            {indexes.map(idx => {
                const is_active = idx === active_index;

                const bar_classname = is_active ? 'wallets-progress-bar-active' : 'wallets-progress-bar-inactive';
                return (
                    <div
                        key={`progress-bar-${idx}`}
                        onClick={() => setActiveIndex(idx)}
                        className={`${bar_classname} ${is_transition ? 'wallets-progress-bar-transition' : ''}`}
                    />
                );
            })}
        </div>
    );
};

export default ProgressBar;
