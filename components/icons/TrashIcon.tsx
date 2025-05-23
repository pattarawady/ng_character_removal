
import React from 'react';

// Using a more common "Trash" icon for "Remove" functionality
export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c.342.052.682.107 1.022.166m0 0L5.002 20.118A2.25 2.25 0 007.246 22.25h9.508a2.25 2.25 0 002.244-2.131L19.002 5.956M5.002 5.956V4.5a2.25 2.25 0 012.25-2.25h4.5a2.25 2.25 0 012.25 2.25v1.456" />
    </svg>
);
