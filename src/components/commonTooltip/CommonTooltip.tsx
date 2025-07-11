import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { ICommonTooltip } from './commonTooltip.model';

const CommonTooltip = (props: ICommonTooltip) => {
    const { attribute, tooltipContent, position } = props;
    const elementRef = React.useRef<any>(null);

    return (
        <React.Fragment>
            <label htmlFor={attribute}>{attribute}</label> {''}
            (<i ref={elementRef} className="pi pi-info text-black-500" />)
            <Tooltip className="w-25rem" target={elementRef?.current} content={tooltipContent} position={position ?? 'top'} />
        </React.Fragment>
    );
};

export default CommonTooltip;
